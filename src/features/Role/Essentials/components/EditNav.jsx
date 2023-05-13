import { useDispatch } from "react-redux";
import Icons from "../../../../assets/icon/icon";
import { Divider, EditContent, EssentialsSpan } from "../Styles";
import { deleteEssentials } from "../EssentialsSlice";
import { useState } from "react";
import AddEssentialsModal from "./AddEssentialsModal/AddEssentialsModal";

const EditNav = ({
  data,
  clicked,
  setClicked,
  page,
  setPage,
  defaultPages,
  deleteList
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  const deleteHandler = () => {
    dispatch(deleteEssentials([window.location.href.split('/')[3], deleteList]))
  };

  return (
    <>
      {isOpen && <AddEssentialsModal setIsOpen={setIsOpen} />}
      <EditContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EssentialsSpan
            fontSize="2.4rem"
            fontWeight="600"
            color="#333333"
          >
            카테고리
          </EssentialsSpan>
          <EssentialsSpan
            color="#707070"
            fontWeight="600"
            fontSize="2rem"
            style={{ marginLeft: "4px" }}
          >
            ({Object.keys(data).length})
          </EssentialsSpan>
        </div>
        <div style={{ display: "flex" }}>
          {clicked === "add" && (
            <EssentialsSpan
              color="#8490a4"
              fontSize="1.8rem"
              fontWeight="500"
              style={{ textDecorationLine: "underline", cursor: "pointer" }}
              onClick={() => setClicked("remove")}
            >
              삭제하기
            </EssentialsSpan>
          )}
          {clicked === "remove" ? (
            <>
              <EssentialsSpan
                color="#8490a4"
                fontSize="1.8rem"
                fontWeight="500"
                style={{ textDecorationLine: "underline", cursor: "pointer" }}
                onClick={() => setClicked("add")}
              >
                선택취소
              </EssentialsSpan>
              <EssentialsSpan
                color="#8490a4"
                fontSize="1.8rem"
                fontWeight="500"
                style={{
                  textDecorationLine: "underline",
                  marginLeft: "30px",
                  cursor: "pointer"
                }}
                onClick={() => deleteHandler()}
              >
                선택 삭제
              </EssentialsSpan>
            </>
          ) : (
            <EssentialsSpan
              color="#8490a4"
              fontSize="1.8rem"
              fontWeight="500"
              style={{
                textDecorationLine: "underline",
                marginLeft: "30px",
                cursor: "pointer"
              }}
              onClick={() => {
                setClicked("add");
                setIsOpen(true);
              }}
            >
              추가하기
            </EssentialsSpan>
          )}
          <Divider style={{ marginLeft: "20px", marginRight: "20px" }} />
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Icons.TfiAngleLeft
              size="14"
              color="#8490A4"
              style={{ strokeWidth: "1", cursor: "pointer" }}
              onClick={page > 0 ? () => setPage(page - 1) : () => setPage(0)}
            />
            <Icons.TfiAngleRight
              size="14"
              color="#8490A4"
              style={{
                strokeWidth: "1",
                marginLeft: "12px",
                cursor: "pointer"
              }}
              onClick={
                page <= Object.keys(data).length - defaultPages
                  ? () => setPage(page + 1)
                  : () => console.log("stopped")
              }
            />
          </div>
        </div>
      </EditContent>
    </>
  );
};

export default EditNav;
