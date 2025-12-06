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
    { label: "Role:", value: "Wanderer" },
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
    { label: "", value: "" },
    { label: "GitHub:", value: "https://github.com/santoshxshrestha", highlight: true, url: "https://github.com/santoshxshrestha" },
    { label: "Website:", value: "well", highlight: true },
    { label: "Email:", value: "username [at] gmail.com", highlight: true },
    { label: "Discord:", value: "santoshxshrestha", highlight: true },
    { label: "", value: "" },
    { label: "About:", value: "" },
    { label: "", value: "I'm a systems programmer driven by curiosity for how things work under the hood. I enjoy building CLI tools in Rust, scripting in Bash, and shaping efficient workflows through a fully customized Linux environment. Currently pursuing BSc in CSIT, I spend much of my time learning through hands-on experimentation—configuring Linux with Hyprland, maintaining a minimal yet powerful setup with Neovim, Zsh, and tmux. When I'm not programming, you'll find me obsessively ricing my setup, tweaking configurations, and tinkering with my system to squeeze out every millisecond of performance." },
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
          <span> </span>
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
              style={info.label === "" && info.value !== "" ? { 
                textAlign: 'left', 
                display: 'block',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                textIndent: '2rem'
              } : {}}
            >
              {info.label === "" && info.value !== "" ? (
                <span className="value">{info.value}</span>
              ) : (
                <>
                  <span className="label">{info.label}</span>{" "}
                  {info.url ? (
                    <a 
                      href={info.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`value ${info.highlight ? "highlight" : ""}`}
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className={`value ${info.highlight ? "highlight" : ""}`}>
                      {info.value}
                    </span>
                  )}
                </>
              )}
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
          <span className="dollar">$</span>
          <span> </span>
          <span className="cursor"></span>
        </div>
      </div>
    </div>
  );
}
