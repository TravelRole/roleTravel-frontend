import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import Icons from "../../../assets/icon/icon";
import { toast } from "react-toastify";
import SearchBlankPanel from "./layout/SearchBlankPanel";
import ScheduleBox from "./layout/ScheduleContainer";
import { addWantPlace, delWantPlace, getWantPlace } from "./wantPlaceSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import AddScheduleModal from "./layout/AddScheduleModal";

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

  input {
    appearance: none;
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-image: url("data:image/svg+xml, %3Csvg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.05313 9.18027C0.0958258 6.54023 0.748262 2.58017 4.01044 1.26015C7.27263 -0.0598677 9.22993 2.58017 9.88237 3.90019C10.5348 2.58017 13.1446 -0.0598677 16.4067 1.26015C19.6689 2.58017 19.6689 6.54023 17.7116 9.18027C15.7543 11.8203 9.88237 17.1004 9.88237 17.1004C9.88237 17.1004 4.01044 11.8203 2.05313 9.18027Z' stroke='%23A7A7A7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");

    width: 2rem;
    height: 1.8rem;
    cursor: pointer;

    &:checked {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='18' viewBox='0 0 20 18' fill='none'%3E%3Cpath d='M2.05313 9.18027C0.0958258 6.54023 0.748262 2.58017 4.01044 1.26015C7.27263 -0.0598677 9.22993 2.58017 9.88237 3.90019C10.5348 2.58017 13.1446 -0.0598677 16.4067 1.26015C19.6689 2.58017 19.6689 6.54023 17.7116 9.18027C15.7543 11.8203 9.88237 17.1004 9.88237 17.1004C9.88237 17.1004 4.01044 11.8203 2.05313 9.18027Z' fill='%23FF6D6D' stroke='%23FF6D6D' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
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

/** 스케쥴 컨테이너 */
const ScheduleContainer = styled.div`
  padding-top: 1.5rem;
  height: fit-content;
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

  const { roomId } = useParams();

  const dispatch = useDispatch();

  /** 찜장소 추가+삭제하기 */

  const handleWantPlace = (e, place, isExist) => {
    const { place_name, road_address_name, address_name, phone, y, x, id } =
      place;
    const wantPlaceData = {
      roomId: roomId,
      placeName: place_name,
      placeAddress: road_address_name,
      phoneNumber: phone,
      latitude: y,
      longitude: x,
      category: "그냥 일단 빈값처리",
      lotNumberAddress: address_name,
      mapPlaceId: id,
    };

    const delpayload = {
      roomId: roomId,
      placeId: isExist[0]?.placeId,
    };
    const isChecked = e.target.checked;

    if (isChecked) {
      //추가 로직
      dispatch(addWantPlace(wantPlaceData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getWantPlace(roomId));
          return;
        }
      });
    } else {
      //삭제로직
      dispatch(delWantPlace(delpayload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getWantPlace(roomId));
          return;
        }
      });
    }
  };

  /** 찜장소 추가+삭제하기 */

  /** 찜장소 가져오기 */
  useEffect(() => {
    dispatch(getWantPlace(roomId));
  }, [roomId, dispatch]);

  const { wantPlaceList } = useSelector((state) => state.wantPlace);

  /** 찜장소 가져오기 */

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
  const [isOpenModal, setIsOpenModal] = useState(true);
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
                  {info &&
                    (marker.id === info.id ||
                      marker.id === String(info.mapPlaceId)) && (
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
                      {searchPlaceList.map((place) => {
                        const isExist = wantPlaceList.wantPlaces.filter(
                          (placeInfo) => {
                            return placeInfo.placeName === place.place_name;
                          }
                        );

                        return (
                          <li key={`${place.x} + ${place.place_name}`}>
                            <StyledPlaceCard
                              selected={String(info?.id) === String(place.id)}
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
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  handleWantPlace(e, place, isExist)
                                }
                                checked={isExist.length}
                              />
                              <button>일정에 추가</button>
                            </StyledPlaceCard>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <SearchBlankPanel filter={"search"} />
                  )}
                </SearchResultContainer>
              </StyledTabPanel>
              <StyledTabPanel value={"wish"}>
                <SearchResultContainer>
                  {true ? (
                    <ul>
                      {wantPlaceList?.wantPlaces?.map((place) => {
                        const isExist = wantPlaceList.wantPlaces.filter(
                          (placeInfo) => {
                            return placeInfo.placeName === place.placeName;
                          }
                        );

                        return (
                          <li key={`${place.latitude} + ${place.placeName}`}>
                            <StyledPlaceCard
                              selected={
                                String(info?.id) === String(place.mapPlaceId)
                              }
                              onClick={() => {
                                const newPlace = {
                                  ...place,
                                  id: String(place.mapPlaceId),
                                };
                                setInfo(newPlace);
                                setlat(place.latitude);
                                setlng(place.longitude);
                              }}
                            >
                              <header>{place.placeName}</header>
                              <p>{place.placeAddress}</p>
                              <p>{place.lotNumberAddress}</p>
                              <span>
                                {place.phoneNumber
                                  ? place.phoneNumber
                                  : "전화번호 없음"}
                              </span>
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  handleWantPlace(e, place, isExist)
                                }
                                checked={true}
                              />
                              <button>일정에 추가</button>
                            </StyledPlaceCard>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <SearchBlankPanel filter={"want"} />
                  )}
                </SearchResultContainer>
              </StyledTabPanel>
            </StyledTabContext>
          </SearchAndWantBox>
        </MapWrapper>

        <ScheduleContainer>
          <ScheduleBox />
        </ScheduleContainer>
        {isOpenModal ? (
        <Modal width="52rem" setIsOpenModal={setIsOpenModal}>
          <AddScheduleModal setIsOpenModal={setIsOpenModal} />
        </Modal>
      ) : null}
      </Wrapper>
    </>
  );
}

export default Schedule;
