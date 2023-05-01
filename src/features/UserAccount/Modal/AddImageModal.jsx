import React, { useEffect, useRef, useState } from "react";
import Icons from "../../../assets/icon/icon";
import { Fab } from "@mui/material";
import { Blur, ContentWrapper, Section, Profile, Button, ButtonFab, Image } from './Styles'
import { useDispatch } from "react-redux";

const AddImageModal = ({
  isAddModal,
  setIsAddModal,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [image, setImage] = useState('');
  // const { loggedInfo, presignedUrl } =
  //   useSelector((state) => state.loggedUser);

  useEffect(() => {
    setImage(imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const imageHandler = () => {
    const file = imageRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result)
     }
  }

  const submitHandler = () => {
    // dispatch()
    // const url = `${presignedUrl}/${image}`
  };

  return (
    <>
      <Blur></Blur>
      <ContentWrapper>
        <Section height="47.5px">
          <div>
            <h1>프로필 사진 등록</h1>
          </div>
          <span style={{ width: '20px', height: '20px'}}>
            <Icons.MdOutlineClose style={{ postiion: 'absolute', width: '100%', height: '100%', cursor: 'pointer', marginTop: '2.5px', color: '#9B9B9B'}} onClick={() => setIsAddModal
            (false)} />
          </span>
        </Section>
        <hr />
        <Section height="361.5px">
          <h1>프로필 사진을 등록해 주세요.</h1>
          <Profile>
            {image ? <Image src={image} alt="프로필 이미지"/> : ''}
          </Profile>
          <div>
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                id="imageUpload"
                style={{ display: "none"}}
                onChange={imageHandler}
                ref={imageRef}
              />
              <label htmlFor="imageUpload">
                <Fab component="div" style={{ width: '115px', height: '36px', borderRadius: '10px', boxShadow: 'none' }}>
                  <ButtonFab><span style={{ fontSize: '1.3rem'}}>사진 업로드</span></ButtonFab>
                </Fab>
              </label>
            </div>
            <Button backgroundColor="#fff">사진 지우기</Button>
          </div>
          <div>
              <p>프로필 사진은 여행 역할 사이트에 표시됩니다.</p>
              <p>jpg, jpeg, png 파일만 업로드 가능합니다.</p>
          </div>
          <Button backgroundColor="#3884FD" style={{ marginTop: '-18px', marginBottom: '24px', color: 'white' }} onClick={submitHandler}>등록 완료</Button>
        </Section>
      </ContentWrapper>
    </>
  );
};

export default AddImageModal;
