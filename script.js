/* =========================================================
   THEAICRAFTIFY
   MAIN PORTFOLIO + AI BUSINESS BLUEPRINT ENGINE
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL HELPERS
========================================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  Array.from(parent.querySelectorAll(selector));

const byId = (id) => document.getElementById(id);

const safeText = (value, fallback = "") => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return String(value).trim();
};

const escapeHTML = (value) => {
  return safeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


/* =========================================================
   DOM REFERENCES
========================================================= */

const blueprintForm = byId("blueprintForm");
const blueprintLoading = byId("blueprintLoading");
const blueprintResults = byId("blueprintResults");

const businessTypeInput = byId("businessType");
const problemInput = byId("problem");
const customersInput = byId("customers");
const locationInput = byId("location");
const budgetInput = byId("budget");
const goalInput = byId("goal");
const experienceInput = byId("experience");
const businessIdeaInput = byId("businessIdea");

const menuToggle = byId("menuToggle");
const mainNav = byId("mainNav");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function closeMobileNav() {
  if (!mainNav || !menuToggle) return;

  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

function toggleMobileNav() {
  if (!mainNav || !menuToggle) return;

  const open = mainNav.classList.toggle("is-open");

  menuToggle.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileNav);
}

$$(".main-nav a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
========================================================= */

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    if (targetId === "#blueprint-engine") {
      setTimeout(() => {
        const firstInput = byId("businessIdea");

        if (firstInput) {
          firstInput.focus({ preventScroll: true });
        }
      }, 700);
    }
  });
});


/* =========================================================
   HERO / YEAR
========================================================= */

const currentYear = byId("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   PORTFOLIO ROADMAP PROGRESS
========================================================= */

const progressBar = byId("progressBar");
const progressPercent = byId("progressPercent");

const ROADMAP_STORAGE_KEY =
  "theaicraftify_90_day_progress";

function loadRoadmapProgress() {
  let progress = 0;

  try {
    const saved = localStorage.getItem(
      ROADMAP_STORAGE_KEY
    );

    if (saved !== null) {
      progress = Number(saved);
    }
  } catch (error) {
    progress = 0;
  }

  if (!Number.isFinite(progress)) {
    progress = 0;
  }

  progress = Math.max(0, Math.min(100, progress));

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (progressPercent) {
    progressPercent.textContent = `${progress}%`;
  }
}

loadRoadmapProgress();


/* =========================================================
   BUSINESS PROFILES
========================================================= */

const BUSINESS_PROFILES = {

  restaurant: {
    label: "Restaurant / Food",

    customer:
      "local customers, office workers, families and nearby repeat buyers",

    earlyAdopters:
      "customers already buying similar food nearby and people actively looking for convenient meal options",

    buyer:
      "the person who directly pays for the meal or order",

    value:
      "Make food ordering easier, more convenient and more valuable while maintaining consistent quality.",

    features: [
      "Clear menu and pricing",
      "Simple ordering process",
      "WhatsApp / phone ordering",
      "Delivery or pickup workflow",
      "Customer feedback collection",
      "Repeat-customer offers"
    ],

    mvp:
      "Start with a small focused menu, simple digital presence, WhatsApp ordering and a reliable delivery/pickup process.",

    tech:
      "Responsive website, WhatsApp Business, Google Business Profile, simple order form and spreadsheet/database for tracking.",

    revenue:
      "Direct sales from food orders",

    alternatives: [
      "Meal subscriptions",
      "Corporate lunch packages",
      "Party / catering orders",
      "Premium add-ons"
    ],

    marketing:
      "Use local content, Google Business Profile, Instagram, WhatsApp and referral offers to create awareness.",

    acquisition:
      "Start with a small geographic area and personally acquire the first customers through local outreach, referrals and introductory offers.",

    risks: [
      "Food quality inconsistency",
      "Delivery delays",
      "Low repeat purchase rate",
      "High ingredient or operating costs"
    ]
  },

  clothing: {
    label: "Clothing / Fashion",

    customer:
      "young fashion-conscious customers looking for a specific style at an affordable price",

    earlyAdopters:
      "people already following fashion creators, streetwear pages or niche clothing communities",

    buyer:
      "the end customer purchasing clothing for personal use",

    value:
      "Give customers a clear style identity through focused products instead of an unfocused clothing catalog.",

    features: [
      "Focused product collection",
      "Strong product photography",
      "Size guide",
      "Simple checkout/order flow",
      "Social media storefront",
      "Customer reviews"
    ],

    mvp:
      "Launch a small collection with a limited number of products and test demand before expanding inventory.",

    tech:
      "Mobile-first storefront, payment/order system, social media and simple inventory tracking.",

    revenue:
      "Product sales",

    alternatives: [
      "Limited edition drops",
      "Bundles",
      "Custom products",
      "Wholesale"
    ],

    marketing:
      "Build visual content around the brand identity, product drops, customer photos and creator collaborations.",

    acquisition:
      "Use Instagram, short-form video, micro-creators, referrals and limited launch drops.",

    risks: [
      "Unsold inventory",
      "Weak differentiation",
      "Returns and sizing problems",
      "High customer acquisition cost"
    ]
  },

  school: {
    label: "School / Education",

    customer:
      "students, parents, teachers or learners looking for measurable educational improvement",

    earlyAdopters:
      "students and parents already actively searching for better learning outcomes",

    buyer:
      "usually the parent, student or institution paying for the service",

    value:
      "Make learning more structured, accessible and measurable.",

    features: [
      "Focused curriculum",
      "Learning resources",
      "Practice tests",
      "Progress tracking",
      "Teacher or mentor support",
      "Parent/student communication"
    ],

    mvp:
      "Start with one subject or one specific learner problem instead of trying to build a complete education platform.",

    tech:
      "Responsive website, learning content system, forms, video tools and simple progress tracking.",

    revenue:
      "Course fees or subscription",

    alternatives: [
      "One-to-one tutoring",
      "Group classes",
      "Exam preparation packages",
      "Institution partnerships"
    ],

    marketing:
      "Publish useful educational content and use results, testimonials and referrals to build trust.",

    acquisition:
      "Free trial sessions, local outreach, parent communities, referrals and educational content.",

    risks: [
      "Low student engagement",
      "Weak outcomes",
      "High dependence on individual teachers",
      "Difficulty proving value"
    ]
  },

  salon: {
    label: "Salon / Beauty",

    customer:
      "local customers who regularly need beauty, grooming or personal-care services",

    earlyAdopters:
      "nearby customers actively searching for salon or beauty services",

    buyer:
      "the customer booking and paying for the service",

    value:
      "Make booking easier while delivering consistent service and a better customer experience.",

    features: [
      "Service menu",
      "Price list",
      "Appointment booking",
      "WhatsApp communication",
      "Customer reminders",
      "Repeat-visit offers"
    ],

    mvp:
      "Create a clear service menu, booking flow and local presence before building complex software.",

    tech:
      "Website, WhatsApp Business, booking form, Google Business Profile and customer tracking.",

    revenue:
      "Service bookings",

    alternatives: [
      "Memberships",
      "Packages",
      "Retail products",
      "Premium services"
    ],

    marketing:
      "Use before/after content, local SEO, customer reviews, referrals and limited-time packages.",

    acquisition:
      "Google Business Profile, Instagram, referrals and local partnerships.",

    risks: [
      "Inconsistent service quality",
      "Appointment cancellations",
      "Staff dependency",
      "Weak repeat rate"
    ]
  },

  agency: {
    label: "Agency",

    customer:
      "small and medium businesses that need a specific service but do not want a full-time specialist",

    earlyAdopters:
      "business owners already spending money on the problem you solve",

    buyer:
      "the founder, owner or marketing/business decision-maker",

    value:
      "Solve a clearly defined business problem without requiring the client to build an internal team.",

    features: [
      "Focused service package",
      "Clear deliverables",
      "Client onboarding",
      "Reporting",
      "Communication workflow",
      "Case studies"
    ],

    mvp:
      "Sell one focused service to a small number of
