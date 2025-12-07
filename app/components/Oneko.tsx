"use client";

import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/oneko.js";
    script.async = true;
    script.dataset.cat = "/oneko.gif";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const nekoEl = document.getElementById("oneko");
      if (nekoEl) {
        nekoEl.remove();
      }
    };
  }, []);

  return null;
}
