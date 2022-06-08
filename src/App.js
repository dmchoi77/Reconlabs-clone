import GlobalStyle from "./common/GlobalStyle";
import Header from "./common/Header";
import MainContent from "./components/MainContent";
import Footer from "./common/Footer";
import SubContent from "./components/SubContent";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainContent />
      <SubContent />
      <Footer />
    </>
  );
}

export default App;
