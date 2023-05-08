import { useState } from "react";
import Icons from "../../../../assets/icon/icon";
import {
  Content,
  Dot,
  EssentialsItem,
  EssentialsSpan,
  Section
} from "../Styles";
import Checkbox from "./CheckBox";

const Sections = ({ data, page, defaultPages }) => {
  return (
    <Content>
      {Object.entries(data)
        .splice(page, defaultPages)
        .map((el, index) => (
          <Section key={index}>
            <EssentialsSpan
              color="#8490a4"
              fontSize="18px"
              fontWeight="600"
            >
              {el[0]}
            </EssentialsSpan>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #cfcfcf",
                marginTop: "16px"
              }}
            />

            {el[1].length === 0 ? (
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
                  fontSize="18px"
                  fontWeight="600"
                  style={{ marginLeft: "6px" }}
                >
                  항목이 비어있어요!
                </EssentialsSpan>
              </div>
            ) : (
              el[1].map((item, index) => <Checkbox key={index} item={item} />)
            )}
          </Section>
        ))}
    </Content>
  );
};

export default Sections;
