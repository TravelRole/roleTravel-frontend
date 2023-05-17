import React, { useEffect, useRef, useState } from "react";
import Icons from "../../../assets/icon/icon";
import {
  Blur,
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
import { changeProfileImage, deleteProfileImage } from "../LoggedUserSlice";
import defaultImage from "../../../assets/images/random1.png";

const AddImageModal = ({ setIsOpen, image, setImage }) => {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [imageName, setImageName] = useState("");
  const { loggedInfo } = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    setImage(loggedInfo.profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInfo]);

  const imageHandler = () => {
    const file = imageRef.current.files[0];
    setImageName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const submitHandler = async () => {
    let header;
    if (imageRef.current.files[0] !== undefined) header = imageRef.current.files[0].type;
    else header = 'image/*'

    try {
      await tokenApi.get("api/users/image/presigned-url").then((res) => {
        const address = res.data;
        axios
          .put(address, imageRef.current.files[0], {
            headers: { "Content-Type": `${header}` }
          })
          .then((res) => {
            console.log("Success", res.data);
            dispatch(changeProfileImage());
            setIsOpen(false);
          })
          .catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImageHandler = () => {
    dispatch(deleteProfileImage);
    setImageName("");
    setImage("");
  };

  return (
    <>
      <Blur></Blur>
      <ContentWrapper>
        <Section height="72px">
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
        <Section height="342px">
          <h1>프로필 사진을 등록해 주세요.</h1>
          <Image
            src={image ? image : defaultImage}
            alt="프로필 이미지"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "15px"
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
                      marginRight: "13px",
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
                  marginRight: "13px",
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
        <Section height="85px">
          <Button
            backgroundColor="#c4c4c4"
            style={{ color: 'white', fontSize: "16px", fontWeight: '600', width: '107px'}}
            onClick={submitHandler}
          >
            등록 완료
          </Button>
        </Section>
      </ContentWrapper>
    </>
  );
};

export default AddImageModal;
