import { Content, Dot, EssentialsSpan, Section } from "../Styles";
import Checkbox from "./CheckBox";
import DeleteCheckBox from "./DeleteCheckBox";

const Sections = ({
  page,
  defaultPages,
  resize,
  condition,
  deleteList,
  setDeleteList,
  data,
  setData
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
              style={{ height: "2.4rem" }}
            >
              {el}
              {data[el].length > 0 && (
                <EssentialsSpan
                  color="#505050"
                  fontSize="1.4rem"
                  fontWeight="500"
                  style={{
                    background: "#fff",
                    width: "3.2rem",
                    border: "0.1rem solid #dadada",
                    padding: "0.3rem 1rem",
                    borderRadius: "9.9rem",
                    marginLeft: "0.8rem",
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
                borderTop: "0.1rem solid #cfcfcf",
                marginTop: "1.6rem"
              }}
            />
            {data[el].length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "flex-start",
                  paddingTop: "0.3rem",
                  marginTop: "1.6rem",
                  width: "22.8rem",
                  height: "4.6rem"
                }}
              >
                <Dot />
                <EssentialsSpan
                  color="#c5ccd6"
                  fontSize="1.8rem"
                  fontWeight="600"
                  style={{ marginLeft: "0.6rem" }}
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
                  setData={setData}
                />
              ))
            ) : (
              <div key={index} style={{ marginTop: "1.6rem"}}>
                {data[el].map((dat) => (
                  <Checkbox
                    item={dat}
                    setData={setData}
                  />
                ))}
              </div>
            )}
          </Section>
        ))}
    </Content>
  );
};

export default Sections;