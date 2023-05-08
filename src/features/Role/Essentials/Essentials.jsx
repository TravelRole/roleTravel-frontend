import { useEffect, useState } from "react";
import { Container } from "./Styles";
import Sections from "./components/Sections";
import EditNav from "./components/EditNav";
import TitleContent from './components/TitleContent'

function Essentials() {
  const [clicked, setClicked] = useState("");
  const [page, setPage] = useState(0);
  const [defaultPages, setDefaultPages] = useState(7);
  const [resize, setResize] = useState(window.innerWidth);
  const [data, setData] = useState({
    "필수 준비물": ["asdf", "fff"],
    의류: [],
    "세면 용품": [],
    상비약: [],
    "계절 용품": [],
    "조리 용품": [],
    "기타 용품": []
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setResize(window.innerWidth);

    if (resize <= 1200) setDefaultPages(4);
    else if (resize <= 1460) setDefaultPages(5);
    else if (resize <= 1730) setDefaultPages(6);
    else setDefaultPages(7);
  };

  return (
    <>
      <Container>
        <TitleContent />
        <EditNav
          data={data}
          clicked={clicked}
          setClicked={setClicked}
          page={page}
          setPage={setPage}
          defaultPages={defaultPages}
        />
        <Sections
          data={data}
          page={page}
          defaultPages={defaultPages}
        />
      </Container>
    </>
  );
}

export default Essentials;
