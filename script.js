document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     THE AICRAFTIFY — PORTFOLIO CORE
     + AI BUSINESS BLUEPRINT ENGINE
  ========================================================= */


  /* =========================================================
     1. MOBILE NAVIGATION
  ========================================================= */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* =========================================================
     2. HERO TERMINAL TYPING
  ========================================================= */

  const terminalText = document.getElementById("terminalText");

  if (terminalText) {
    const messages = [
      "learning JavaScript...",
      "building responsive layouts...",
      "shipping real projects...",
      "building AI-powered tools...",
      "turning ideas into business blueprints...",
      "documenting the journey..."
    ];

    let messageIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const typingSpeed = 65;
    const deletingSpeed = 35;
    const pauseAfterTyping = 1700;
    const pauseAfterDeleting = 500;

    function typeTerminalMessage() {
      const currentMessage = messages[messageIndex];

      if (!deleting) {
        characterIndex++;

        terminalText.textContent =
          currentMessage.substring(0, characterIndex);

        if (characterIndex >= currentMessage.length) {
          deleting = true;

          setTimeout(
            typeTerminalMessage,
            pauseAfterTyping
          );

          return;
        }

        setTimeout(
          typeTerminalMessage,
          typingSpeed
        );

      } else {
        characterIndex--;

        terminalText.textContent =
          currentMessage.substring(0, characterIndex);

        if (characterIndex <= 0) {
          deleting = false;

          messageIndex =
            (messageIndex + 1) % messages.length;

          setTimeout(
            typeTerminalMessage,
            pauseAfterDeleting
          );

          return;
        }

        setTimeout(
          typeTerminalMessage,
          deletingSpeed
        );
      }
    }

    typeTerminalMessage();
  }


  /* =========================================================
     3. 90-DAY ROADMAP
  ========================================================= */

  const TOTAL_DAYS = 90;

  const dayCurrent =
    document.getElementById("dayCurrent");

  const dayMinus =
    document.getElementById("dayMinus");

  const dayPlus =
    document.getElementById("dayPlus");

  const progressFill =
    document.getElementById("progressFill");

  const DAY_STORAGE_KEY =
    "theaicraftify_current_day";

  const TASK_STORAGE_KEY =
    "theaicraftify_completed_tasks";

  let currentDay =
    parseInt(
      localStorage.getItem(DAY_STORAGE_KEY) || "1",
      10
    );

  if (
    Number.isNaN(currentDay) ||
    currentDay < 1 ||
    currentDay > TOTAL_DAYS
  ) {
    currentDay = 1;
  }


  function updateDayUI() {
    if (dayCurrent) {
      dayCurrent.textContent = currentDay;
    }

    if (progressFill) {
      const percentage =
        (currentDay / TOTAL_DAYS) * 100;

      progressFill.style.width =
        `${percentage}%`;
    }

    localStorage.setItem(
      DAY_STORAGE_KEY,
      String(currentDay)
    );
  }


  if (dayMinus) {
    dayMinus.addEventListener("click", () => {
      if (currentDay > 1) {
        currentDay--;
        updateDayUI();
      }
    });
  }


  if (dayPlus) {
    dayPlus.addEventListener("click", ()
