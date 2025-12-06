"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function About() {
  const [commandText, setCommandText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  const infoData = [
    { label: "Name:", value: "Santosh Shrestha" },
    { label: "Role:", value: "wonderer" },
    { label: "Location:", value: "Butwal, Nepal" },
    {
      label: "Languages:",
      value: "JavaScript, Rust, C, C++, Bash, Lua, Python",
    },
    { label: "Frontend:", value: "HTML/CSS, Tailwind, Askama, Htmx" },
    { label: "Backend:", value: "Rust, Actix-web, PostgreSQL" },
    { label: "DevOps:", value: "CI/CD, Docker, AWS, Linux, Git, Nix" },
    {
      label: "Interests:",
      value: "Open Source, System Design, little bit of web",
    },
    { label: "GitHub:", value: "github.com/santoshxshrestha", highlight: true },
    { label: "Website:", value: "well", highlight: true },
    { label: "Email:", value: "username [at] gmail.com", highlight: true },
    { label: "Discord:", value: "santoshxshrestha", highlight: true },
    { label: "Reddit:", value: "santoshxshrestha", highlight: true },
  ];

  useEffect(() => {
    const command = "mefetch";
    let currentIndex = 0;

    // Start typing after 2 seconds
    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(
        () => {
          if (currentIndex < command.length) {
            setCommandText(command.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            // Hide cursor after typing
            setTimeout(() => {
              setShowCursor(false);
              // Show output after cursor hides
              setTimeout(() => {
                setShowOutput(true);
                // Show lines one by one
                let lineIndex = 0;
                const lineInterval = setInterval(() => {
                  if (lineIndex < infoData.length) {
                    setVisibleLines((prev) => [...prev, lineIndex]);
                    lineIndex++;
                  } else {
                    clearInterval(lineInterval);
                    // Show final prompt
                    setTimeout(() => {
                      setShowFinalPrompt(true);
                    }, 500);
                  }
                }, 100);
              }, 200);
            }, 500);
          }
        },
        100 + Math.random() * 100,
      );

      return () => clearInterval(typingInterval);
    }, 2000);

    return () => clearTimeout(initialDelay);
  }, [infoData.length]);

  return (
    <div className="container about-page">
      <div className="terminal-buttons">
        <Link href="/" className="btn close" style={{ textDecoration: "none" }}>
          <i className="fa-solid fa-xmark"></i>
        </Link>
      </div>
      <h1 className="name">About</h1>
      <div className="header"></div>

      <div className="terminal-content">
        <div className="prompt-line">
          <span className="user">[santosh</span>
          <span className="at">@</span>
          <span className="host">nixos</span>
          <span className="path">~]</span>
          <span className="dollar">$</span>
          <span className="command" id="command-text">
            {commandText}
          </span>
          {showCursor && <span className="cursor" id="cursor"></span>}
        </div>

        <div className={`output-hidden ${showOutput ? "" : "hidden"}`}>
          {infoData.map((info, index) => (
            <div
              key={index}
              className={`info-line ${visibleLines.includes(index) ? "" : "hidden"}`}
            >
              <span className="label">{info.label}</span>{" "}
              <span className={`value ${info.highlight ? "highlight" : ""}`}>
                {info.value}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`prompt-line ${showFinalPrompt ? "" : "hidden"}`}
          id="final-prompt"
        >
          <span className="user">[santosh</span>
          <span className="at">@</span>
          <span className="host">nixos</span>
          <span className="path">~]</span>
          <span className="dollar"> $</span>
          <span className="cursor"></span>
        </div>
      </div>
    </div>
  );
}
