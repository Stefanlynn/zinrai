import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import i18n from "./i18n";

// Render immediately - i18n will initialize on its own
createRoot(document.getElementById("root")!).render(<App />);
