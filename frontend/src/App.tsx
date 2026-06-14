import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DashBoard from "./Pages/DashBoard";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import SharedBrain from "./Pages/SharedBrain";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-900 dark:text-white">
      <BrowserRouter>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/signin" replace />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/dashboard" element={<DashBoard />} />

          <Route path="/share/:shareLink" element={<SharedBrain />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
