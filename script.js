/* =====================================================================
   THEAICRAFTIFY — SCRIPT
   Plain JavaScript, no build tools, no libraries.
   Everything here is grouped into small, labeled sections so you can
   find and edit the part you need even if you're new to JS.
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------
     1. MOBILE MENU
     Opens/closes the nav links on small screens when the burger
     icon is tapped, and closes automatically when a link is clicked.
  ------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });


  /* -------------------------------------------------------------------
     2. HERO TERMINAL TYPING EFFECT
     Types out each message in TERMINAL_MESSAGES one character at a
     time, pauses, deletes it, then moves to the next message.
     Edit TERMINAL_MESSAGES below to change what it says.
  ------------------------------------------------------------------- */
  const TERMINAL_MESSAGES = [
    'learning JavaScript...',
    'building responsive layouts...',
    'shipping real projects...',
    'documenting the journey...'
  ];

  const terminalEl = document.getElementById('terminalText');

  if (terminalEl) {
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentMessage = TERMINAL_MESSAGES[messageIndex];

      if (!isDeleting) {
        charIndex++;
        terminalEl.textContent = currentMessage.slice(0, charIndex);

        if (charIndex === currentMessage.length) {
          // Full word typed: pause, then start deleting
          isDeleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        terminalEl.textContent = currentMessage.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          messageIndex = (messageIndex + 1) % TERMINAL_MESSAGES.length;
        }
      }

      const typingSpeed = isDeleting ? 30 : 55;
      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }


  /* -------------------------------------------------------------------
     3. 90-DAY ROADMAP: DAY COUNTER + TASK CHECKLIST
     Saves progress in the browser's localStorage, so it stays even
     after closing the tab. Nothing is sent anywhere — it's private
     to your own browser on your own device.
  ------------------------------------------------------------------- */
  const STORAGE_KEY_DAY = 'theaicraftify_current_day';
  const STORAGE_KEY_TASKS = 'theaicraftify_completed_tasks';
  const TOTAL_DAYS = 90;

  const dayCurrentEl = document.getElementById('dayCurrent');
  const dayMinusBtn = document.getElementById('dayMinus');
  const dayPlusBtn = document.getElementById('dayPlus');
  const progressFillEl = document.getElementById('progressFill');
  const taskCheckboxes = document.querySelectorAll('.task-list input[type="checkbox"]');

  // Load saved day, defaulting to Day 1
  let currentDay = parseInt(localStorage.getItem(STORAGE_KEY_DAY), 10);
  if (isNaN(currentDay) || currentDay < 1) currentDay = 1;
  if (currentDay > TOTAL_DAYS) currentDay = TOTAL_DAYS;

  function renderDay() {
    dayCurrentEl.textContent = currentDay;
    const percent = (currentDay / TOTAL_DAYS) * 100;
    progressFillEl.style.width = percent + '%';
    localStorage.setItem(STORAGE_KEY_DAY, currentDay);
  }

  dayMinusBtn.addEventListener('click', () => {
    if (currentDay > 1) {
      currentDay--;
      renderDay();
    }
  });

  dayPlusBtn.addEventListener('click', () => {
    if (currentDay < TOTAL_DAYS) {
      currentDay++;
      renderDay();
    }
  });

  renderDay();

  // Load saved checked tasks (stored as an array of task IDs, e.g. ["p1-1","p1-2"])
  function getCompletedTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TASKS);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveCompletedTasks(taskArray) {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(taskArray));
  }

  const completedTasks = getCompletedTasks();

  // Apply saved state to checkboxes on page load
  taskCheckboxes.forEach((checkbox) => {
    const taskId = checkbox.dataset.task;
    if (completedTasks.includes(taskId)) {
      checkbox.checked = true;
    }

    // Save state whenever a checkbox changes
    checkbox.addEventListener('change', () => {
      const stored = getCompletedTasks();
      const id = checkbox.dataset.task;

      if (checkbox.checked && !stored.includes(id)) {
        stored.push(id);
      } else if (!checkbox.checked && stored.includes(id)) {
        const idx = stored.indexOf(id);
        stored.splice(idx, 1);
      }

      saveCompletedTasks(stored);
    });
  });


  /* -------------------------------------------------------------------
     4. NAV LINK HIGHLIGHT ON SCROLL (nice-to-have, purely visual)
     Adds a subtle "active" underline to whichever section is in view.
     Safe to remove if you don't want this behavior.
  ------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length && navAnchors.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

});
