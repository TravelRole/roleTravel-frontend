import { useDispatch } from "react-redux";
import Icons from "../../../../assets/icon/icon";
import { Divider, EditContent, EssentialsSpan } from "../Styles";
import { deleteEssentials } from "../EssentialsSlice";
import { useParams } from "react-router-dom";

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
  
  const deleteHandler = () => {
    dispatch(deleteEssentials([window.location.href.split('/')[3], deleteList]))
  };

  return (
    <>
      <EditContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EssentialsSpan
            fontSize="24px"
            fontWeight="600"
            color="#333333"
          >
            카테고리
          </EssentialsSpan>
          <EssentialsSpan
            color="#707070"
            fontWeight="600"
            fontSize="20px"
            style={{ marginLeft: "4px" }}
          >
            ({Object.keys(data).length})
          </EssentialsSpan>
        </div>
        <div style={{ display: "flex" }}>
          {clicked === "add" && (
            <EssentialsSpan
              color="#8490a4"
              fontSize="18px"
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
                fontSize="18px"
                fontWeight="500"
                style={{ textDecorationLine: "underline", cursor: "pointer" }}
                onClick={() => setClicked("")}
              >
                선택취소
              </EssentialsSpan>
              <EssentialsSpan
                color="#8490a4"
                fontSize="18px"
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
              fontSize="18px"
              fontWeight="500"
              style={{
                textDecorationLine: "underline",
                marginLeft: "30px",
                cursor: "pointer"
              }}
              onClick={() => {
                setClicked("add");
              }}
            >
              추가하기
            </EssentialsSpan>
          )}
          <Divider style={{ marginLeft: "20px", marginRight: "20px" }} />
          <div>
            <Icons.TfiAngleLeft
              size="17"
              color="#8490A4"
              style={{ strokeWidth: "1", cursor: "pointer" }}
              onClick={page > 0 ? () => setPage(page - 1) : () => setPage(0)}
            />
            <Icons.TfiAngleRight
              size="17"
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
