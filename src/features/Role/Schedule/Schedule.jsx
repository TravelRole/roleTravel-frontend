import { useState } from "react";

// AIzaSyBXXkjAR0duRfDCQN3Lil459ky2Ws1V248
function Owner() {
  return (
    <>
      <div>Owner page</div>
    </>
  );
}

function Guest() {
  return (
    <>
      <div>Guest page</div>
    </>
  );
}

function Schedule() {
  const [Mode, setMode] = useState(true);

  return (
    <>
      <div>Schedule page</div>
      <button onClick={() => setMode((item) => !item)}>버튼</button>
      {
        {
          true: <Owner />,
          false: <Guest />,
        }[Mode]
      }
    </>
  );
}

export default Schedule;
