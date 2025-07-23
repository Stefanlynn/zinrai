import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n";
import i18n from "./i18n";

// Wait for i18n initialization before rendering
i18n.init().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
