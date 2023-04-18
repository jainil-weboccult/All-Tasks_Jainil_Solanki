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
  const [light, setLight] = useState("white");
  const [dark, setDark] = useState("white");
  const [primary, setPrimary] = useState("black");

  const [cname, setCname] = useState("WebOccult Technologies");
  const [clogo, setClogo] = useState("fa fa-coffee");
  const [cwb, setCwb] = useState("https://www.weboccult.com");
  const [cfn, setCfn] = useState("Jainil Solanki");
  const [cdsn, setCdsn] = useState("Frontend Trainee");
  const [cn, setCn] = useState(9998417543);
  const [email, setCmail] = useState("jainil.solanki@weboccult.com");
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
              <Route
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
              />
              <Route
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
              />
              <Route
                path="personalization"
                element={
                  <Personal
                    cname={cname}
                    setCname={setCname}
                    clogo={clogo}
                    setClogo={setClogo}
                    cwb={cwb}
                    setCwb={setCwb}
                    cfn={cfn}
                    setCfn={setCfn}
                    cdsn={cdsn}
                    setCdsn={setCdsn}
                    cn={cn}
                    setCn={setCn}
                    email={email}
                    setCmail={setCmail}
                  />
                }
              />
            </Routes>
          </div>

          <div className="display-area">
            {theme === "Clean" ? (
              <Clean
                primary={primary}
                setPrimary={setPrimary}
                light={light}
                setLight={setLight}
                dark={dark}
                setDark={setDark}
                cname={cname}
                setCname={setCname}
                clogo={clogo}
                setClogo={setClogo}
                cwb={cwb}
                setCwb={setCwb}
                cfn={cfn}
                setCfn={setCfn}
                cdsn={cdsn}
                setCdsn={setCdsn}
                cn={cn}
                setCn={setCn}
                email={email}
                setCmail={setCmail}
              />
            ) : (
              <Standard
                primary={primary}
                setPrimary={setPrimary}
                light={light}
                setLight={setLight}
                dark={dark}
                setDark={setDark}
                cname={cname}
                setCname={setCname}
                clogo={clogo}
                setClogo={setClogo}
                cwb={cwb}
                setCwb={setCwb}
                cfn={cfn}
                setCfn={setCfn}
                cdsn={cdsn}
                setCdsn={setCdsn}
                cn={cn}
                setCn={setCn}
                email={email}
                setCmail={setCmail}
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
