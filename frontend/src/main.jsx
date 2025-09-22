import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider, { ShopContext } from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <div className="dark:bg-slate-900 dark:text-white">
        <App />
      </div>
    </ShopContextProvider>
  </BrowserRouter>
);
