import Icons from "../../../../assets/icon/icon";
import { Divider, EditContent, EssentialsSpan } from "../Styles";
import { useState } from "react";
import AddEssentialsModal from "./AddEssentialsModal/AddEssentialsModal";
import CheckDeleteModal from "./CheckDeleteModal/CheckDeleteModal";
import { useSelector } from "react-redux";

const EditNav = ({
  condition,
  setCondition,
  page,
  setPage,
  defaultPages,
  deleteList,
  setDeleteList,
  setDeleted,
  data,
  setData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  return (
    <>
      {deleteIsOpen && (
        <CheckDeleteModal
          setIsOpen={setDeleteIsOpen}
          deleteList={deleteList}
          setDeleteList={setDeleteList}
          setDeleted={setDeleted}
          setData={setData}
        />
      )}
      {isOpen && <AddEssentialsModal setIsOpen={setIsOpen} setData={setData} />}
      <EditContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EssentialsSpan fontSize="2.4rem" fontWeight="600" color="#333333">
            카테고리
          </EssentialsSpan>
          <EssentialsSpan
            color="#707070"
            fontWeight="600"
            fontSize="2rem"
            style={{ marginLeft: "0.4rem" }}
          >
            ({Object.keys(data).length})
          </EssentialsSpan>
        </div>
        <div style={{ display: "flex" }}>
          {condition === "remove" ? (
            <>
              <EssentialsSpan
                color="#8490a4"
                fontSize="1.8rem"
                fontWeight="500"
                style={{ textDecorationLine: "underline", cursor: "pointer" }}
                onClick={() => setCondition("")}
              >
                선택취소
              </EssentialsSpan>
              <EssentialsSpan
                color="#8490a4"
                fontSize="1.8rem"
                fontWeight="500"
                style={{
                  textDecorationLine: "underline",
                  marginLeft: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => setDeleteIsOpen(true)}
              >
                선택 삭제
              </EssentialsSpan>
            </>
          ) : (
            <>
              <EssentialsSpan
                color="#8490a4"
                fontSize="1.8rem"
                fontWeight="500"
                style={{ textDecorationLine: "underline", cursor: "pointer" }}
                onClick={() => setCondition("remove")}
              >
                삭제하기
              </EssentialsSpan>
              <EssentialsSpan
                color="#8490a4"
                fontSize="1.8rem"
                fontWeight="500"
                style={{
                  textDecorationLine: "underline",
                  marginLeft: "3rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCondition("add");
                  setIsOpen(true);
                }}
              >
                추가하기
              </EssentialsSpan>
            </>
          )}
          <Divider style={{ marginLeft: "2rem", marginRight: "2rem" }} />
          <div style={{ display: "flex", alignItems: "center" }}>
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
                marginLeft: "1.2rem",
                cursor: "pointer",
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
