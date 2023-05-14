import { Content, Dot, EssentialsSpan, Section } from "../Styles";
import Checkbox from "./CheckBox";
import DeleteCheckBox from "./DeleteCheckBox";

const Sections = ({
  data,
  page,
  defaultPages,
  resize,
  condition,
  deleteList,
  setDeleteList
}) => {
  return (
    <Content width={resize - 150}>
      {Object.keys(data)
        .splice(page, defaultPages)
        .map((el, index) => (
          <Section key={index}>
            <EssentialsSpan
              color="#8490a4"
              fontSize="1.8rem"
              fontWeight="600"
              style={{ height: "24px" }}
            >
              {el}
              {data[el].length > 0 && (
                <EssentialsSpan
                  color="#505050"
                  fontSize="1.4rem"
                  fontWeight="500"
                  style={{
                    background: "#fff",
                    width: "32px",
                    border: "1px solid #dadada",
                    padding: "3px 10px",
                    borderRadius: "99px",
                    marginLeft: "8px",
                    textAlign: "center"
                  }}
                >
                  {data[el].length}
                </EssentialsSpan>
              )}
            </EssentialsSpan>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #cfcfcf",
                marginTop: "16px"
              }}
            />

            {data[el].length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "flex-start",
                  paddingTop: "3px",
                  marginTop: "16px",
                  width: "228px",
                  height: "46px"
                }}
              >
                <Dot />
                <EssentialsSpan
                  color="#c5ccd6"
                  fontSize="1.8rem"
                  fontWeight="600"
                  style={{ marginLeft: "6px" }}
                >
                  항목이 비어있어요!
                </EssentialsSpan>
              </div>
            ) : condition === "remove" ? (
              data[el].map((dat, index) => (
                <DeleteCheckBox
                  key={index}
                  item={dat}
                  deleteList={deleteList}
                  setDeleteList={setDeleteList}
                />
              ))
            ) : (
              data[el].map((dat, index) => (
                <Checkbox
                  key={index}
                  item={dat}
                />
              ))
            )}
          </Section>
        ))}
    </Content>
  );
};

export default Sections;
