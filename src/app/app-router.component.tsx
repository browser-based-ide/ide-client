import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app.component";

import { Editor } from "./editor";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}


export default AppRouter;