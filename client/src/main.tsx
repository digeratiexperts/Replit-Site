import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/store-jelly.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
