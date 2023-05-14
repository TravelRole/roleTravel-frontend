import { useEffect, useState } from "react";
import { Container } from "./Styles";
import Sections from "./components/Sections";
import EditNav from "./components/EditNav";
import TitleContent from "./components/TitleContent";
import { useDispatch, useSelector } from "react-redux";
import { getEssentials } from "./EssentialsSlice";

function Essentials() {
  const dispatch = useDispatch();
  const { essentials, isLoading } = useSelector((state) => state.essentials);
  const [condition, setCondition] = useState("");
  const [page, setPage] = useState(0);
  const [defaultPages, setDefaultPages] = useState(7);
  const [resize, setResize] = useState(window.innerWidth);
  const [deleteList, setDeleteList] = useState([]);
  const [data, setData] = useState({
    "필수 준비물": [],
    의류: [],
    "세면 용품": [],
    상비약: [],
    계절용품: [],
    "조리 용품": [],
    "기타 용품": []
  });

  useEffect(() => {
    dispatch(getEssentials(window.location.href.split('/')[3]));
    console.log(essentials)
  }, []);

  if (!isLoading && essentials) {
    Object.keys(essentials).map((el) => {
      switch (el) {
        case 'ESSENTIAL':
          return (data["필수 준비물"] = essentials[el]);
        case 'ETC':
          return (data["기타 용품"] = essentials[el]);
        default: return "";
      }
    });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  useEffect(() => {
    if (resize <= 1180) setDefaultPages(3);
    else if (resize <= 1460) setDefaultPages(4);
    else if (resize <= 1730) setDefaultPages(5);
    else if (resize <= 1980) setDefaultPages(6);
    else setDefaultPages(7);
  }, [resize]);

  return (
    <>
      <Container style={{ width: resize - 300 }}>
        <TitleContent />
        <EditNav
          data={data}
          condition={condition}
          setCondition={setCondition}
          page={page}
          setPage={setPage}
          defaultPages={defaultPages}
          setData={setData}
          deleteList={deleteList}
        />
        <Sections
          data={data}
          page={page}
          defaultPages={defaultPages}
          resize={resize}
          condition={condition}
          setDeleteList={setDeleteList}
          deleteList={deleteList}
        />
      </Container>
    </>
  );
}

export default Essentials;
