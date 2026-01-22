import { useState } from "react";
import Auth from "./pages/Auth";
import Upload from "./pages/Upload";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return loggedIn ? <Upload /> : <Auth onAuth={() => setLoggedIn(true)} />;
}

export default App;
