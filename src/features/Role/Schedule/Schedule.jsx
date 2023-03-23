import { useState } from "react";
import Owner from "./Owner/Owner";
import Guest from "./Guest/Guest";



function Schedule() {
  const [Mode, setMode] = useState(true);

  return (
    <>
      {/* {
        {
          true: <Owner />,
          false: <Guest />,
        }[Mode]
      } */}
      <Owner />
    </>
  );
}

export default Schedule;
