import styled from "styled-components";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
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
import ScheduleContainer from "./layout/ScheduleContainer";
import { addWantPlace, delWantPlace, getWantPlace } from "./wantPlaceSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import AddScheduleModal from "./layout/AddScheduleModal";
import SearchPlaceCard from "./components/SearchPlaceCard";
import WantPlaceCard from "./components/WantPlaceCard";
import { getTravelDay } from "./travelDaySlice";
import Heart from "../../../assets/images/heart.svg";
import { getSchedule } from "./scheduleSlice";

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

/** 스케쥴 컨테이너 */
const ScheduleSection = styled.div`
  padding-top: 1.5rem;
  height: fit-content;
`;

const InfoWindow = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 10rem;
  height: 2.5rem;

  color: #3884fd;
  font-family: "Pretendard";
  border: solid 1.5px #3884fd;
  border-radius: 0.5rem;
  font-size: 1.6rem;

  padding: 0.3rem 0.5rem;
  position: relative;

  z-index: ${(props) => (props.selected ? 5 : 0)};
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &::after {
    border-color: white transparent;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    content: "";
    display: block;
    left: 10px;
    position: absolute;
    top: 2.2rem;
    width: 0;
    z-index: 1;
  }
  &::before {
    border-color: #7689fd transparent;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    content: "";
    display: block;
    left: 10px;
    position: absolute;
    top: 2.4rem;
    width: 0;
    z-index: 0;
  }
`;

const LoveInfoWindow = styled(InfoWindow)`
  width: 12.4rem;
  img {
    width: 1.8rem;
    margin-right: 0.2rem;
  }
`;

const ScheduleInfoWindow = styled(InfoWindow)`
  width: 10rem;
  background-color: #3884fd;
  color: white;

  &::after {
    border-color: #3884fd transparent;
    border-style: solid;
    border-width: 8px 8px 0 8px;
    content: "";
    display: block;
    left: 10px;
    position: absolute;
    top: 2.2rem;
    width: 0;
    z-index: 1;
  }
`;

function Schedule() {
  //카카오 맵 초기등록하기
  const [map, setMap] = useState();

  //지도 초기 중앙 값 및 검색 후 해당 장소로 이동하는 useState
  const [lat, setlat] = useState(37.4953064);
  const [lng, setlng] = useState(126.9551549);

  const [filter, setFilter] = useState("search");

  const handleChange = (event, newValue) => {
    setFilter(newValue);
    setInfo(undefined);
  };

  const { roomId } = useParams();

  const dispatch = useDispatch();

  /** 찜장소 추가+삭제하기 */

  const handleWantPlace = (e, place, isExist) => {
    const {
      place_name,
      road_address_name,
      address_name,
      phone,
      y,
      x,
      id,
      place_url,
    } = place;
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
      link: place_url,
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
    dispatch(getTravelDay(roomId));
  }, [roomId, dispatch]);

  const { wantPlaceList } = useSelector((state) => state.wantPlace);
  const { travelDayList } = useSelector((state) => state.travelDay);

  const isScheduler = wantPlaceList.isScheduler;

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const firstDay = travelDayList[0]?.date;
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(firstDay);
  }, [firstDay]);

  useEffect(() => {
    if (date) dispatch(getSchedule({ roomId, date }));
  }, [dispatch, date, roomId]);

  const { scheduleList } = useSelector((state) => state.schedule);


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
                <CustomOverlayMap
                  key={`marker-${position}-${position.lat},${position.lng}`}
                  position={position}
                  onClick={() => setInfo(marker)}
                >
                  {/* 커스텀 오버레이에 표시할 내용입니다 */}
                  <InfoWindow
                    selected={
                      info &&
                      (marker.id === String(info.id) ||
                        marker.id === String(info.mapPlaceId))
                        ? true
                        : false
                    }
                    onClick={() => setInfo(marker)}
                  >
                    <span>{marker.place_name}</span>
                  </InfoWindow>
                </CustomOverlayMap>
              );
            })}
            {filter === "wish" && info && (
              <CustomOverlayMap
                key={`marker`}
                position={{ lat: info?.latitude, lng: info?.longitude }}
              >
                {/* 커스텀 오버레이에 표시할 내용입니다 */}
                <LoveInfoWindow>
                  <img src={Heart} alt="heart" />
                  <span>{info?.placeName}</span>
                </LoveInfoWindow>
              </CustomOverlayMap>
            )}

            {scheduleList &&
              scheduleList.map((marker) => {
                const position = {
                  lat: Number(marker.latitude),
                  lng: Number(marker.longitude),
                };
                return (
                  <CustomOverlayMap
                    key={`marker-${position}-${position.lat},${position.lng}`}
                    position={position}
                    onClick={() => setInfo(marker)}
                  >
                    {/* 커스텀 오버레이에 표시할 내용입니다 */}
                    <ScheduleInfoWindow onClick={() => setInfo(marker)}>
                      <span>{marker.placeName}</span>
                    </ScheduleInfoWindow>
                  </CustomOverlayMap>
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
                  { searchPlaceList.length ? (
                    <ul>
                      {searchPlaceList.map((place) => {
                        const isExist = wantPlaceList.wantPlaces.filter(
                          (placeInfo) => {
                            return placeInfo.placeName === place.place_name;
                          }
                        );
                        return (
                          <SearchPlaceCard
                            key={place.id}
                            place={place}
                            isExist={isExist}
                            handleWantPlace={handleWantPlace}
                            locationFn={{ setlat, setlng }}
                            Info={{ setInfo, info }}
                            setIsOpenModal={setIsOpenModal}
                            setModalData={setModalData}
                            isScheduler={isScheduler}
                          />
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
                  {wantPlaceList?.wantPlaces?.length ? (
                    <ul>
                      {wantPlaceList?.wantPlaces?.map((place) => {
                        const isExist = wantPlaceList.wantPlaces.filter(
                          (placeInfo) => {
                            return placeInfo.placeName === place.placeName;
                          }
                        );

                        return (
                          <WantPlaceCard
                            key={place.mapPlaceId}
                            place={place}
                            isExist={isExist}
                            handleWantPlace={handleWantPlace}
                            locationFn={{ setlat, setlng }}
                            Info={{ setInfo, info }}
                            setIsOpenModal={setIsOpenModal}
                            setModalData={setModalData}
                            isScheduler={isScheduler}
                          />
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

        <ScheduleSection>
          <ScheduleContainer
            travelDayList={travelDayList}
            firstDayDate={travelDayList && travelDayList[0]?.date}
            date={date}
            setDate={setDate}
          />
        </ScheduleSection>
        {isOpenModal ? (
          <Modal width="52rem" setIsOpenModal={setIsOpenModal}>
            <AddScheduleModal
              setIsOpenModal={setIsOpenModal}
              modalData={modalData}
              travelDayList={travelDayList}
              date={date}
            />
          </Modal>
        ) : null}
      </Wrapper>
    </>
  );
}

export default Schedule;
