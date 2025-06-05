import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(<App />);
