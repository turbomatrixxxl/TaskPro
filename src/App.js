import Footer from "./components/Footer/Footer";
import Welcome from "./components/Welcome/Welcome.jsx";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="sharedLayout">
        <Welcome />
      </div>
      <Footer />
    </div>
  );
}

export default App;
