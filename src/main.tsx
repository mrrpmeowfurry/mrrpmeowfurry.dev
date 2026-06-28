import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@material/web/button/filled-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/text-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/fab/fab.js";
import "@material/web/icon/icon.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/divider/divider.js";
import "@material/web/elevation/elevation.js";
import "@material/web/ripple/ripple.js";
import "@material/web/list/list.js";
import "@material/web/list/list-item.js";

import { styles as typescaleStyles } from "@material/web/typography/md-typescale-styles.js";

import { applyTheme } from "./theme.ts";
import "./index.css";
import App from "./App.tsx";

document.adoptedStyleSheets.push(typescaleStyles.styleSheet!);

// set the theme once before react mounts so there's no flash of the wrong colours
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
applyTheme(prefersDark ?? false);
document.documentElement.dataset.theme = prefersDark ? "dark" : "light";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
