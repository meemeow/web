"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import logo from "../assets/images/logotext.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLeaveTimer = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current as unknown as number);
      leaveTimer.current = null;
    }
  };

  const scheduleCollapse = () => {
    clearLeaveTimer();
    leaveTimer.current = setTimeout(() => setLinkHover(false), 140);
  };

  return (
    <header className={`navbar ${linkHover ? "expanded" : ""}`}>
      <div
        className="navbar-inner"
        onMouseEnter={() => {
          clearLeaveTimer();
          setLinkHover(true);
        }}
        onMouseLeave={() => {
          scheduleCollapse();
        }}
      >
        <div className="brand">
          <Image src={logo} alt="Meemeow logo" className="brand-logo" height={64} />
        </div>

        <button
          className="navbar-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>

        <nav className={`navbar-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
          <a
            href="#home"
            onMouseEnter={() => {
              clearLeaveTimer();
              setLinkHover(true);
            }}
            onMouseLeave={() => scheduleCollapse()}
          >
            Home
          </a>
          <a
            href="#about"
            onMouseEnter={() => {
              clearLeaveTimer();
              setLinkHover(true);
            }}
            onMouseLeave={() => scheduleCollapse()}
          >
            About
          </a>
          <a
            href="#projects"
            onMouseEnter={() => {
              clearLeaveTimer();
              setLinkHover(true);
            }}
            onMouseLeave={() => scheduleCollapse()}
          >
            Projects
          </a>
          <a
            href="#contact"
            onMouseEnter={() => {
              clearLeaveTimer();
              setLinkHover(true);
            }}
            onMouseLeave={() => scheduleCollapse()}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
