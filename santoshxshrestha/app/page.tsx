'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getRandomContentPair } from './lib/randomContent';

export default function Home() {
  const [commandText, setCommandText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);
  const [randomContent, setRandomContent] = useState({ title: '', bio: '' });

  useEffect(() => {
    // Get random content on component mount
    setRandomContent(getRandomContentPair());
  }, []);

  useEffect(() => {
    const command = randomContent.title;
    let currentIndex = 0;
    
    // Start typing after 2 seconds
    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
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
              // Show final prompt after output
              setTimeout(() => {
                setShowFinalPrompt(true);
              }, 500);
            }, 200);
          }, 500);
        }
      }, 100 + Math.random() * 100);

      return () => clearInterval(typingInterval);
    }, 2000);

    return () => clearTimeout(initialDelay);
  }, [randomContent]);

  return (
    <div className="container">
      <div className="header">
        <div className="profile-photo">
          <Image src="/santosh.jpg" alt="Santosh Shrestha" width={120} height={120} />
        </div>
        <h1 className="name">Santosh Shrestha (@santoshxshrestha)</h1>
      </div>

      <div className="term-container">
        <div className="terminal-content">
          <div className="prompt-line">
            <span className="user">[santosh</span>
            <span className="at">@</span>
            <span className="host">nixos</span>
            <span className="path">~]</span>
            <span className="dollar">$</span>
            <span className="command" id="command-text">{commandText}</span>
            {showCursor && <span className="cursor" id="cursor"></span>}
          </div>

          <div className={`output-hidden ${showOutput ? '' : 'hidden'}`}>
            <div className={`info-line ${showOutput ? '' : 'hidden'}`}>
              <span className="bio">{randomContent.bio}</span>
            </div>
          </div>

          <div className={`prompt-line ${showFinalPrompt ? '' : 'hidden'}`} id="final-prompt">
            <span className="user">[santosh</span>
            <span className="at">@</span>
            <span className="host">nixos</span>
            <span className="path">~]</span>
            <span className="dollar"> $</span>
            <span className="cursor"></span>
          </div>
        </div>
      </div>

      <nav className="nav">
        <Link href="/projects">Projects</Link>
        <Link href="/about">About me</Link>
      </nav>

      <div className="quick-links">
        <a href="https://github.com/santoshxshrestha" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
          GitHub
        </a>
        <a href="https://www.reddit.com/user/santoshxshrestha/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-reddit-alien"></i>
          reddit
        </a>
      </div>

      <ul className="pointless webring">
        <li>
          <a href="https://nixwebr.ing/prev/santoshxshrestha">&#x25D6;&nbsp;prev</a>
        </li>
        <li>
          <a href="https://nixwebr.ing">Nix Webring</a>
        </li>
        <li>
          <Image id="nix" src="/nix.svg" alt="Nix logo" width={15} height={15} />
        </li>
        <li>
          <a href="https://nixwebr.ing/rand">Random</a>
        </li>
        <li>
          <a href="https://nixwebr.ing/next/santoshxshrestha">next&nbsp;&#x25D7;</a>
        </li>
      </ul>
    </div>
  );
}
