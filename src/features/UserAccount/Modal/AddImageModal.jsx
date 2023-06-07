import React, { useEffect, useRef, useState } from "react";
import Icons from "../../../assets/icon/icon";
import {
  ContentWrapper,
  Section,
  Button,
  ButtonFab,
  Image,
  Title,
  Explanation
} from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import tokenApi from "../../../lib/customAPI";
import {
  changeProfileImage,
  deleteProfileImage,
  getLoggedInfo
} from "../LoggedUserSlice";
import userProfile from "../../../assets/images/userProfile.png";
import Modal from "../../../components/Modal";
import { getUserInfo } from "../../Landing/userSlice";

const AddImageModal = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [profile, setProfile] = useState(null);
  const [condition, setCondition] = useState("");
  const { loggedInfo } = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    setProfile(loggedInfo?.profile || userProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInfo?.profile]);

  const imageHandler = () => {
    const file = imageRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfile(reader.result, file);
      setCondition("newFile");
    };
  };

  const submitHandler = async () => {
    if (condition === "delete") {
      dispatch(deleteProfileImage()).then((res) => {
        dispatch(getLoggedInfo());
        setIsOpen(false);
      });
    } else {
      let header;
      if (imageRef.current.files[0] !== undefined)
        header = imageRef.current.files[0].type;
      else header = "image/*";

      dispatch(deleteProfileImage()).then((res) => {
        tokenApi.get("api/users/image/presigned-url").then((res) => {
          const address = res.data;
          axios
            .put(address, imageRef.current.files[0], {
              headers: { "Content-Type": `${header}` }
            })
            .then((res) => {
              dispatch(changeProfileImage())
                .then((res) => {
                  dispatch(getLoggedInfo()).then((res) =>
                    dispatch(getUserInfo())
                  );
                  setIsOpen(false);
                  window.location.reload();
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.log(err));
        });
      });
    }
    setCondition("");
  };

  const deleteImageHandler = () => {
    setProfile(userProfile);
    setCondition("delete");
  };

  return (
    <Modal
      setIsOpenModal={setIsOpen}
      width="35.8rem"
    >
      <ContentWrapper>
        <Section height="7.2rem">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title>PROFILE</Title>
            <Icons.MdOutlineClose
              size="20"
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <h1>프로필 사진 등록</h1>
        </Section>
        <Section height="34.2rem">
          <h1>프로필 사진을 등록해 주세요.</h1>
          <Image
            src={profile}
            alt="프로필 이미지"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1.5rem"
            }}
          >
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                id="imageUpload"
                style={{ display: "none" }}
                onChange={imageHandler}
                ref={imageRef}
              />
              <label htmlFor="imageUpload">
                <ButtonFab>
                  <Icons.HiUpload
                    size="20"
                    style={{
                      marginRight: "1.3rem",
                      color: "black"
                    }}
                  />
                  사진 업로드
                </ButtonFab>
              </label>
            </div>
            <ButtonFab
              backgroundColor="#fff"
              onClick={deleteImageHandler}
            >
              <Icons.TbTrash
                size="19"
                style={{
                  marginRight: "1.3rem",
                  color: "#ff4a4a"
                }}
              />
              사진 지우기
            </ButtonFab>
          </div>
          <Explanation>
            <p>* 프로필 사진은 여행 역할 사이트에 표시됩니다.</p>
            <p>* jpg, jpeg, png 파일만 업로드 가능합니다.</p>
          </Explanation>
        </Section>
        <Section height="8.5rem">
          <Button
            backgroundColor="#c4c4c4"
            style={{
              color: "white",
              fontSize: "1.6rem",
              fontWeight: "600",
              width: "10.7rem"
            }}
            onClick={submitHandler}
          >
            등록 완료
          </Button>
        </Section>
      </ContentWrapper>
    </Modal>
  );
};

export default AddImageModal;
