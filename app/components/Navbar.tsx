"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeHover, setActiveHover] = useState<
    "home" | "about" | "projects" | "contact" | null
  >(null);
  const [lastHover, setLastHover] = useState<
    "home" | "about" | "projects" | "contact" | null
  >(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (activeHover) setLastHover(activeHover);
  }, [activeHover]);

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

  const clearHoverLeaveTimer = () => {
    if (hoverLeaveTimer.current) {
      clearTimeout(hoverLeaveTimer.current as unknown as number);
      hoverLeaveTimer.current = null;
    }
  };

  const scheduleHoverCollapse = () => {
    clearHoverLeaveTimer();
    hoverLeaveTimer.current = setTimeout(() => setActiveHover(null), 140);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (activeHover) {
      const src = `/assets/others/${activeHover}_hover.mp4`;
      // set source and play
      try {
        v.pause();
      } catch {}
      if (v.getAttribute("src") !== src) v.setAttribute("src", src);
      try {
        v.currentTime = 0;
      } catch {}
      v.load();
      v.play().catch(() => {});
    } else {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {}
    }
  }, [activeHover]);

  return (
    <header className={`navbar ${linkHover ? "expanded" : ""}`}>
      <video
        ref={videoRef}
        className={`hover-video ${activeHover ? "visible " : ""}${lastHover ? "hover-" + lastHover : ""}`}
        loop
        muted
        playsInline
        preload="auto"
      />
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
          <Link
            href="/"
            className="brand-link"
            onMouseEnter={(e) => {
              e.stopPropagation();
              clearLeaveTimer();
              setLinkHover(false);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
            }}
            onClick={() => {
              setLinkHover(false);
              setOpen(false);
            }}
          >
            <Image
              src="/assets/images/logotext.png"
              alt="Meemeow logo"
              className="brand-logo"
              width={200}
              height={64}
            />
          </Link>
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
            className="nav-link home"
            href="#home"
            onMouseEnter={() => {
              clearLeaveTimer();
              clearHoverLeaveTimer();
              setLinkHover(true);
              setActiveHover("home");
            }}
            onMouseLeave={() => {
              scheduleHoverCollapse();
              scheduleCollapse();
            }}
          >
            Home
          </a>
          <a
            className="nav-link about"
            href="#about"
            onMouseEnter={() => {
              clearLeaveTimer();
              clearHoverLeaveTimer();
              setLinkHover(true);
              setActiveHover("about");
            }}
            onMouseLeave={() => {
              scheduleHoverCollapse();
              scheduleCollapse();
            }}
          >
            About
          </a>
          <a
            className="nav-link projects"
            href="#projects"
            onMouseEnter={() => {
              clearLeaveTimer();
              clearHoverLeaveTimer();
              setLinkHover(true);
              setActiveHover("projects");
            }}
            onMouseLeave={() => {
              scheduleHoverCollapse();
              scheduleCollapse();
            }}
          >
            Projects
          </a>
          <a
            className="nav-link contact"
            href="#contact"
            onMouseEnter={() => {
              clearLeaveTimer();
              clearHoverLeaveTimer();
              setLinkHover(true);
              setActiveHover("contact");
            }}
            onMouseLeave={() => {
              scheduleHoverCollapse();
              scheduleCollapse();
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
