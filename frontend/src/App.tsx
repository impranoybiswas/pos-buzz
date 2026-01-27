import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
