import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Clean from "./Components/Clean/Clean";
import Notfound from "./Components/Notfound";
import Personal from "./Components/Personal";
import Standard from "./Components/Standard/Standard";
import Theme from "./Components/Clean/Theme";
import ThemeforS from "./Components/Standard/ThemeforS";
import WizardHome from "./Components/WizardHome";

function App() {
  const [theme, setTheme] = useState("Clean");
  const [scheme, setColorScheme] = useState({
    light: "white",
    dark: "white",
    primary: "black",
  });

  const [details, setCardDetails] = useState({
    cname: "WebOccult Technologies",
    clogo: "fa fa-coffee",
    cwb: "https://www.weboccult.com",
    cfn: "Jainil Solanki",
    cdsn: "Frontend Trainee",
    cn: 1234567890,
    email: "jainil.solanki@weboccult.com",
  });

  return (
    <div className="App">
      <h1>Card Maker</h1>
      <div className="wrapperc">
        <div className="container">
          <div className="wizard-area">
            <Routes>
              <Route
                path="/"
                element={<WizardHome theme={theme} setTheme={setTheme} />}
              />
              <Route path="*" element={<Notfound />} />
              {/* <Route
                path="themes"
                element={
                  <Theme
                    primary={primary}
                    setPrimary={setPrimary}
                    light={light}
                    setLight={setLight}
                    dark={dark}
                    setDark={setDark}
                  />
                }
              /> */}
              {/* <Route
                path="themesforstandard"
                element={
                  <ThemeforS
                    primary={primary}
                    setPrimary={setPrimary}
                    light={light}
                    setLight={setLight}
                    dark={dark}
                    setDark={setDark}
                  />
                }
              /> */}
              <Route
                path="personalization"
                element={
                  <Personal scheme={scheme} setColorScheme={setColorScheme} />
                }
              />
            </Routes>
          </div>

          <div className="display-area">
            {theme === "Clean" ? (
              <Clean
                scheme={scheme}
                setColorScheme={setColorScheme}
                details={details}
                setCardDetails={setCardDetails}
              />
            ) : (
              <Standard
                scheme={scheme}
                setColorScheme={setColorScheme}
                details={details}
                setCardDetails={setCardDetails}
                theme={theme}
                setTheme={setTheme}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
