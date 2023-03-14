import { useEffect } from "react";
import { useNavigate } from "react-router";

function SpaceList({ Auth }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth) {
      console.log(Auth);
      navigate(`/login`);
      return;
    }
  }, []);

  return <>SpaceList</>;
}

export default SpaceList;
