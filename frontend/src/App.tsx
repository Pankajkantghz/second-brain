import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const DashBoard = lazy(() => import("./Pages/DashBoard"));
const Signin = lazy(() => import("./Pages/Signin"));
const Signup = lazy(() => import("./Pages/Signup"));
const SharedBrain = lazy(() => import("./Pages/SharedBrain"));

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-900 dark:text-white">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-slate-500 dark:text-slate-300">
              Loading...
            </div>
          }
        >
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
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
