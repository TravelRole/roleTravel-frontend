import { useState } from "react";
import Owner from "./Owner/Owner";


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
