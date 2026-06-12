import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashBoard from "./Pages/DashBoard";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import SharedBrain from "./Pages/SharedBrain";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Signin />} />

        <Route path="/dashboard" element={<DashBoard />} />

        <Route path="/share/:shareLink" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
