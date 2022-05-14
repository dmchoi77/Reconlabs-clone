import styled from "@emotion/styled";
import HeaderWrapper from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import SubContent from "./components/SubContent";

function App() {
  return (
    <GlobalStyle>
      <HeaderWrapper />
      <MainContent />
      <SubContent />
      <Footer />
    </GlobalStyle>
  );
}

export default App;

const GlobalStyle = styled.div`
  max-width: 1920px;
  max-height: 1280px;
  min-width: 768px;
  min-height: 1024px;
`;
