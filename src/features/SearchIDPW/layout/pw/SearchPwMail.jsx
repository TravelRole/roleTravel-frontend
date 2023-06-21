import MailImage from "../../../../assets/images/Mail.png";

// https://www.nylas.com/blog/how-to-build-email-templates-with-react/ 를 참고하여 작업하였습니다.
export const SearchPwLetter = ({ username='test', newPassword='test' }) => (
  <html>
    <head />
    <preview>비밀번호 변경 확인 메일</preview>
    <body style={{ width: "100%" }}>
      <section
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={MailImage} alt="Mail" />
        <text
          style={{ fontSize: "1.6rem", fontWeight: "600", marginTop: "2.7rem" }}
        >
          [여행역할] 비밀번호 재설정
        </text>
        <p
          style={{
            fontSize: "1.6rem",
            marginTop: "3rem",
            marginBottom: '1.2rem',
            lineHeight: "2.8rem",
            textAlign: "center",
          }}
        >
          {username}님 안녕하세요,
          <br />
          요청하신 재설정된 비밀번호는 다음과 같습니다.
        </p>
        <span style={{ fontSize: "1.8rem" }}>
          비밀번호 :{" "}
          <span style={{ fontSize: "1.8rem", color: "#3884FD" }}>
            {newPassword}
          </span>
        </span>
        <p
          style={{
            fontSize: "1.6rem",
            lineHeight: "2.8rem",
            marginTop: '1.2rem'
          }}
        >
          로그인 후에 비밀번호를 변경해주세요. 감사합니다.
        </p>
        <p
          style={{
            fontSize: "1.6rem",
            lineHeight: "2.8rem",
          }}
        >
          본 이메일은 발신전용 이메일입니다.
        </p>
      </section>
    </body>
  </html>
);
export default SearchPwLetter;
