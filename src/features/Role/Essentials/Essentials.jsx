import { useEffect, useState } from "react";
import { Container } from "./Styles";
import Sections from "./components/Sections";
import EditNav from "./components/EditNav";
import TitleContent from "./components/TitleContent";
import { useDispatch, useSelector } from "react-redux";
import { getEssentials } from "./EssentialsSlice";

function Essentials() {
  const dispatch = useDispatch();
  const { essentials } = useSelector((state) => state.essentials);
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
    "계절 용품": [],
    "조리 용품": [],
    "기타 용품": [],
  });

  useEffect(() => {
    dispatch(getEssentials(window.location.href.split("/")[3]))
  }, [dispatch]);

  useEffect(() => {
    setData(essentials)
  }, [essentials])

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
      <Container style={{ width: resize - 100 }}>
        <TitleContent setData={setData} />
        <EditNav
          condition={condition}
          setCondition={setCondition}
          page={page}
          setPage={setPage}
          defaultPages={defaultPages}
          deleteList={deleteList}
          setDeleteList={setDeleteList}
          data={data}
          setData={setData}
        />
        <Sections
          page={page}
          defaultPages={defaultPages}
          resize={resize}
          condition={condition}
          setDeleteList={setDeleteList}
          deleteList={deleteList}
          data={data}
          setData={setData}
        />
      </Container>
    </>
  );
}

export default Essentials;
