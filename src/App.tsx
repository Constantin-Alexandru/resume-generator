import { useEffect, useState } from "react";
import { Toggle } from "./components/Toggle";
import { capitalize } from "./utilities/string";

function App() {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? "light";


    setTheme(theme);
  }, []);

  useEffect(() => {
    if (theme === undefined) return;
    localStorage.setItem("theme", theme);
  }, [theme])


  return (
    <div className="content-container" data-theme={theme}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingInline: "20px", height: "50px" }}>
        <div className="empty"></div>
        <div className="toggle" style={{ display: "flex", alignItems: "center", gap: "5px", height: "50px" }}>
          <h4>{capitalize(theme ?? '')}</h4>
          <Toggle value={theme} setValue={setTheme} checkedValue="dark" uncheckedValue="light" />
        </div>
      </header>

    </div>
  )
}

export default App;
