import { useState } from "react";
import Owner from "./Owner/Owner";
import Guest from "./Guest/Guest";



function Schedule({setReserveList}) {
  const [Mode, setMode] = useState(true);

  return (
    <>
      <Owner setReserveList={setReserveList} />
    </>
  );
}

export default Schedule;
