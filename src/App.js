import React, { useEffect } from "react";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./features/Landing/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getTravelList } from "./features/SpaceList/travelSlice";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video,input {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  box-sizing: border-box;
  text-decoration-line: none;
  font-size: 62.5%;
  letter-spacing: -0.02rem;
  font-smooth: always;
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}

body {
  line-height: 1;
  font-family: 'Pretendard Variable';
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.App{
  width:100%;
  height:100vh;
}
`;

// mui custom css 설정

const theme = createTheme({
  palette: {
    error: {
      main: "#FF334C",
    },
    primary: {
      main: "#3884fd",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.8rem",
        },
        input: {
          fontSize: "1.5rem",
          borderRadius: "0.8rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "1.3rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            background: "transparent",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        input: {
          fontSize: "1.5rem",
        },
      },
    },
  },
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: "1.6rem" }}
        theme="light"
      />
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
