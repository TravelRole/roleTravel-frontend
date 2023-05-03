import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import SearchAndWant from "./layout/SearchAndWant";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import tokenApi from "../../../lib/customAPI";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Icons from "../../../assets/icon/icon";
import { toast } from "react-toastify";
import SearchBlankPanel from "./layout/SearchBlankPanel";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #f4f6fb;

  font-size: 1.6rem;
  overflow: ${(props) =>
    props.isAddModal ? "hidden hidden" : "hidden scroll"};

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
`;

const PageHeader = styled.header`
  padding: 8.5rem 0 2.5rem 6rem;
  font-size: 3rem;
  font-weight: 600;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 52rem;
  padding: 0 4rem 0 6rem;
`;

const SearchAndWantBox = styled.div`
  //원래 32rem인데 임의적으로 변경함
  width: 30%;
  padding-left: 2rem;
`;

const StyledTabContext = styled(TabContext)``;

const StyledTabs = styled(TabList)`
  position: relative;
  top: -2.5rem;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;

  .MuiButtonBase-root {
    text-align: left;
    justify-content: flex-end;
    margin-bottom: 0.6rem;
    padding: 0;
  }
  .MuiTabs-indicator {
    height: 0.2rem;
    width: 100%;
    border-radius: 1rem;
    background-image: ${({ indicatorColor }) => indicatorColor};
  }
`;
const StyleTab = styled(Tab)`
  margin-right: 2.6rem !important;
`;

const StyleinnerTabBox = styled.div`
  width: 100%;
  text-align: left;
  color: #3884fd;
  p {
    width: 10rem;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 2rem;
    &.active {
      &::after {
        content: "";
        position: absolute;
        margin-left: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        background-color: #ffc759;
        border-radius: 50%;
      }
    }
  }
`;

const StyledTabPanel = styled(TabPanel)`
  height: 52rem;
  padding: 0 !important;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 4.6rem;
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    right: 0.8rem;
    transform: translateY(-50%);
    color: gray;
  }
`;

const SearchBox = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 2rem;
  position: absolute;
  font-size: 1.6rem;
  background: #ffffff;
  border-radius: 0.8rem;
  border: none;
`;

const SearchResultContainer = styled.div`
  height: 82.5%;
  padding-top: 0.6rem;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const StyledPlaceCard = styled.article`
  position: relative;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 13rem;

  padding: 2rem;
  background: ${(props) => (props.selected ? "#EEF1F8" : "#ffffff")};
  border-radius: 0.8rem;

  header {
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.7rem;
    color: #333333;
  }
  p:nth-child(2) {
    margin-bottom: 0.4rem;
    font-weight: 500;
    font-size: 1.4rem;
    color: #707070;
  }
  p:nth-child(3) {
    margin-bottom: 0.8rem;
    font-weight: 400;
    font-size: 1.4rem;
    color: #c4c4c4;
  }
  span {
    font-weight: 400;
    font-size: 1.4rem;
    color: #3884fd;
  }
  button {
    height: 2.6rem;
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    padding: 0.2rem 1rem;
    font-size: 1.2rem;
    color: ${(props) => (props.selected ? " #3884FD;" : "#8B8B8B")};
    border: none;
    background: #fafafa;
    border: ${(props) =>
      props.selected ? "1px solid #3884FD" : "1px solid #DADADA"};
    border-radius: 0.8rem;
  }
`;

function Schedule({ setReserveList }) {
  // 구현해놓은 모킹 페이지
  // <Owner setReserveList={setReserveList} />

  //카카오 맵 초기등록하기
  const [map, setMap] = useState();

  //지도 초기 중앙 값 및 검색 후 해당 장소로 이동하는 useState
  const [lat, setlat] = useState(37.4953064);
  const [lng, setlng] = useState(126.9551549);

  const [filter, setFilter] = useState("search");

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { roomId } = useParams();

  // useEffect(() => {
  //   tokenApi
  //     .get(`${baseUrl}api/want-place?roomId=${roomId}`)
  //     .then((Response) => {
  //       console.log(Response);
  //     })
  //     .catch((Error) => {
  //       console.log(Error);
  //     });
  // }, [baseUrl, roomId]);

  const [searchPlaceList, setSearchPlaceList] = useState([]);

  const { kakao } = window;
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addSearchResult(inputRef.current.value);
    }
  };

  const addSearchResult = (keyWord) => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyWord, (data, status, _pagination) => {
      try {
        if (status === "ZERO_RESULT")
          return toast.error("검색어 관련 장소가 없습니다.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            setSearchPlaceList(data);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      } catch (error) {
        console.log("카카오 작동 안함");
      }
    });
  };

  const [info, setInfo] = useState();

  return (
    <>
      <Wrapper>
        <PageHeader>일정</PageHeader>
        <MapWrapper>
          <Map
            center={{ lat: lat, lng: lng }}
            style={{ width: "70%", height: "100%" }}
            onCreate={setMap}
          >
            {searchPlaceList.map((marker) => {
              const position = {
                lat: Number(marker.y),
                lng: Number(marker.x),
              };
              return (
                <MapMarker
                  key={`marker-${position}-${position.lat},${position.lng}`}
                  position={position}
                  onClick={() => setInfo(marker)}
                >
                  {info && info.place_name === marker.place_name && (
                    <div style={{ color: "#000" }}>{marker.place_name}</div>
                  )}
                </MapMarker>
              );
            })}
          </Map>
          <SearchAndWantBox>
            <StyledTabContext value={filter}>
              <Box sx={{ mb: -1 }}>
                <StyledTabs
                  indicatorColor="linear-gradient(270deg, #3884fd 0%, #9fa9ff 100%)"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <StyleTab
                    label={
                      <StyleinnerTabBox>
                        <p className={filter === "search" ? "active" : ""}>
                          검색하기
                        </p>
                      </StyleinnerTabBox>
                    }
                    value={"search"}
                  />
                  <StyleTab
                    label={
                      <StyleinnerTabBox>
                        <p className={filter === "wish" ? "active" : ""}>
                          찜한여행지
                        </p>
                      </StyleinnerTabBox>
                    }
                    value={"wish"}
                  />
                </StyledTabs>
              </Box>
              <StyledTabPanel value={"search"}>
                <SearchContainer>
                  <SearchBox
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    placeholder={`[지역] + [맛집] 을 검색해보세요.`}
                  />
                  <Icons.RxMagnifyingGlass size={25} />
                </SearchContainer>
                <SearchResultContainer>
                  {searchPlaceList.length ? (
                    <ul>
                      {searchPlaceList.map((place, i) => {
                        return (
                          <li key={i}>
                            <StyledPlaceCard
                              selected={
                                info && info.address_name === place.address_name
                              }
                              onClick={() => {
                                setInfo(place);
                                setlat(place.y);
                                setlng(place.x);
                              }}
                            >
                              <header>{place.place_name}</header>
                              <p>{place.road_address_name}</p>
                              <p>{place.address_name}</p>
                              <span>
                                {place.phone ? place.phone : "전화번호 없음"}
                              </span>
                              <button>일정에 추가</button>
                            </StyledPlaceCard>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <SearchBlankPanel />
                  )}
                </SearchResultContainer>
              </StyledTabPanel>
              <StyledTabPanel value={"wish"}>찜목록</StyledTabPanel>
            </StyledTabContext>
          </SearchAndWantBox>
        </MapWrapper>
      </Wrapper>
    </>
  );
}

export default Schedule;
