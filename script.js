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
      "Sell one focused service to a small number of clients before expanding into a full-service agency.",

    tech:
      "Landing page, CRM/spreadsheet, communication tools, analytics and automation tools.",

    revenue:
      "Monthly retainers or project fees",

    alternatives: [
      "One-time projects",
      "Consulting",
      "Performance-based fees",
      "Productized services"
    ],

    marketing:
      "Publish proof-based content, case studies and educational material around one specific client problem.",

    acquisition:
      "Direct outreach, referrals, LinkedIn, local networking and targeted content.",

    risks: [
      "Too many services",
      "Client dependency",
      "Scope creep",
      "Unpredictable acquisition"
    ]
  },

  shop: {
    label: "Shop / Retail",

    customer:
      "local consumers looking for convenient access to useful products",

    earlyAdopters:
      "existing local shoppers with a recurring need for the product category",

    buyer:
      "the end customer",

    value:
      "Provide the right products conveniently with reliable pricing, availability and service.",

    features: [
      "Focused catalog",
      "Clear pricing",
      "Simple ordering",
      "Inventory tracking",
      "Customer support",
      "Repeat purchase offers"
    ],

    mvp:
      "Start with a focused product selection and validate demand before expanding inventory.",

    tech:
      "Simple storefront, payment/order system, inventory tracker and messaging channel.",

    revenue:
      "Product margins",

    alternatives: [
      "Subscriptions",
      "Bundles",
      "Wholesale",
      "Private-label products"
    ],

    marketing:
      "Local discovery, social media, referrals, offers and useful product content.",

    acquisition:
      "Google Business Profile, local SEO, referrals, WhatsApp and social media.",

    risks: [
      "Inventory risk",
      "Low margins",
      "Price competition",
      "Slow-moving products"
    ]
  },

  realEstate: {
    label: "Real Estate",

    customer:
      "buyers, renters, investors or property owners depending on the selected niche",

    earlyAdopters:
      "people already searching for properties or property-related services",

    buyer:
      "the person or business paying for the property transaction or service",

    value:
      "Reduce the friction of discovering, evaluating and transacting around property.",

    features: [
      "Property listings",
      "Search/filtering",
      "Lead capture",
      "Property details",
      "Appointment scheduling",
      "Lead follow-up"
    ],

    mvp:
      "Start with a focused local property niche and a reliable lead-generation process rather than a massive marketplace.",

    tech:
      "Responsive website, lead forms, CRM/spreadsheet, maps and communication tools.",

    revenue:
      "Commission, service fee or lead-generation fee",

    alternatives: [
      "Property management",
      "Premium listings",
      "Consulting",
      "Developer partnerships"
    ],

    marketing:
      "Local property content, search visibility, social media and useful market information.",

    acquisition:
      "Local SEO, referrals, property content, direct outreach and partnerships.",

    risks: [
      "Low-quality leads",
      "Long sales cycles",
      "Regulatory requirements",
      "Trust issues"
    ]
  },

  manufacturing: {
    label: "Manufacturing",

    customer:
      "businesses or distributors that need reliable products at an acceptable cost and quality level",

    earlyAdopters:
      "buyers with a recurring supply requirement and an urgent or underserved sourcing problem",

    buyer:
      "procurement manager, business owner, distributor or operations decision-maker",

    value:
      "Deliver consistent quality, predictable supply and competitive economics.",

    features: [
      "Product specification",
      "Sample process",
      "Quality control",
      "Production workflow",
      "Order tracking",
      "Customer support"
    ],

    mvp:
      "Validate one product line and a small number of customers before investing heavily in capacity.",

    tech:
      "Website, CRM, inventory/production tracking and communication tools.",

    revenue:
      "Wholesale product sales",

    alternatives: [
      "Contract manufacturing",
      "Private label",
      "Bulk orders",
      "Long-term supply contracts"
    ],

    marketing:
      "B2B outreach, product documentation, samples, industry networking and case studies.",

    acquisition:
      "Direct sales, distributor partnerships, trade networks and targeted B2B outreach.",

    risks: [
      "High upfront investment",
      "Quality problems",
      "Supply chain disruption",
      "Working-capital pressure"
    ]
  },

  exporter: {
    label: "Export / Trading",

    customer:
      "international buyers, distributors, retailers or businesses looking for reliable suppliers",

    earlyAdopters:
      "buyers already sourcing your product category and looking for alternative suppliers",

    buyer:
      "importer, distributor, wholesaler or procurement decision-maker",

    value:
      "Make cross-border sourcing simpler through reliable product quality, communication and fulfillment.",

    features: [
      "Product catalog",
      "Buyer inquiry system",
      "Product specifications",
      "Quotation workflow",
      "Documentation",
      "Order tracking"
    ],

    mvp:
      "Focus on one product category and a small number of target markets before expanding.",

    tech:
      "B2B website, inquiry forms, CRM, document workflow and communication tools.",

    revenue:
      "Wholesale/export margins",

    alternatives: [
      "Sourcing services",
      "Private label",
      "Distribution",
      "Commission-based trading"
    ],

    marketing:
      "B2B content, search visibility, product catalogs, trade networks and direct outreach.",

    acquisition:
      "Targeted buyer lists, direct outreach, trade platforms and industry partnerships.",

    risks: [
      "Payment risk",
      "Logistics issues",
      "Regulatory requirements",
      "Currency fluctuations"
    ]
  },

  service: {
    label: "Service Business",

    customer:
      "people or businesses with a recurring or urgent problem that can be solved through a service",

    earlyAdopters:
      "customers already paying for alternatives or actively searching for a solution",

    buyer:
      "the person responsible for paying for the service",

    value:
      "Deliver a clear outcome without making the customer manage the complexity themselves.",

    features: [
      "Clear service package",
      "Booking or inquiry process",
      "Transparent pricing",
      "Customer communication",
      "Delivery workflow",
      "Feedback system"
    ],

    mvp:
      "Start manually with one focused service and document the workflow before automating it.",

    tech:
      "Simple website, forms, communication tools, calendar and customer tracking.",

    revenue:
      "Service fees",

    alternatives: [
      "Packages",
      "Subscriptions",
      "Retainers",
      "Premium add-ons"
    ],

    marketing:
      "Educational content, local discovery, referrals and proof of results.",

    acquisition:
      "Direct outreach, referrals, local SEO and social media.",

    risks: [
      "Time-for-money limitation",
      "Inconsistent delivery",
      "Customer acquisition difficulty",
      "Operational overload"
    ]
  },

  general: {
    label: "General Business",

    customer:
      "a clearly defined customer group experiencing the problem you described",

    earlyAdopters:
      "people already aware of the problem and actively looking for alternatives",

    buyer:
      "the person who receives enough value from the solution to pay for it",

    value:
      "Solve one meaningful customer problem with a simple, focused and measurable solution.",

    features: [
      "Simple onboarding",
      "Core solution",
      "Customer feedback",
      "Basic analytics",
      "Communication channel",
      "Repeat-use mechanism"
    ],

    mvp:
      "Start with the smallest version that can test whether customers actually want the solution.",

    tech:
      "A simple responsive website, forms, analytics, communication tools and only the automation required for the MVP.",

    revenue:
      "Charge for the core outcome or product value.",

    alternatives: [
      "Subscription",
      "One-time purchase",
      "Service fee",
      "Premium version"
    ],

    marketing:
      "Focus on useful content, customer proof and a clear explanation of the problem you solve.",

    acquisition:
      "Start with direct outreach, communities, referrals and one focused acquisition channel.",

    risks: [
      "Building before validating",
      "Unclear target customer",
      "Weak differentiation",
      "Trying to do too much at once"
    ]
  }
};


/* =========================================================
   BUSINESS TYPE DETECTION
========================================================= */

function detectBusinessType(text) {

  const value = safeText(text).toLowerCase();

  const keywords = {

    restaurant: [
      "restaurant",
      "food",
      "meal",
      "cafe",
      "café",
      "bakery",
      "cloud kitchen",
      "kitchen",
      "delivery food",
      "tiffin"
    ],

    clothing: [
      "clothing",
      "fashion",
      "shirt",
      "tshirt",
      "t-shirt",
      "jeans",
      "streetwear",
      "apparel",
      "garment",
      "dress"
    ],

    school: [
      "school",
      "student",
      "education",
      "course",
      "tuition",
      "coaching",
      "learning",
      "exam",
      "academy"
    ],

    salon: [
      "salon",
      "beauty",
      "spa",
      "barber",
      "hair",
      "grooming",
      "makeup"
    ],

    agency: [
      "agency",
      "marketing agency",
      "digital marketing",
      "advertising",
      "creative agency",
      "development agency"
    ],

    shop: [
      "shop",
      "store",
      "retail",
      "grocery",
      "products",
      "retailer"
    ],

    realEstate: [
      "real estate",
      "property",
      "properties",
      "realty",
      "rent",
      "rental",
      "apartment",
      "flat"
    ],

    manufacturing: [
      "manufacturing",
      "factory",
      "manufacture",
      "production",
      "industrial",
      "wholesale production"
    ],

    exporter: [
      "export",
      "import",
      "trading",
      "international buyer",
      "international buyers",
      "supplier",
      "sourcing"
    ],

    service: [
      "service",
      "services",
      "consulting",
      "repair",
      "cleaning",
      "maintenance",
      "freelance"
    ]
  };

  for (const [type, words] of Object.entries(keywords)) {

    if (words.some((word) => value.includes(word))) {
      return type;
    }

  }

  return "general";
}


/* =========================================================
   FORM DATA
========================================================= */

function collectBlueprintData() {

  const businessIdea =
    safeText(
      businessIdeaInput ? businessIdeaInput.value : ""
    );

  const selectedType =
    safeText(
      businessTypeInput ? businessTypeInput.value : "general",
      "general"
    );

  const combinedText = [
    businessIdea,
    safeText(problemInput ? problemInput.value : ""),
    safeText(customersInput ? customersInput.value : "")
  ].join(" ");

  let type = selectedType;

  if (!type || type === "general") {
    type = detectBusinessType(combinedText);
  }

  return {
    businessType: type,

    businessIdea,

    problem:
      safeText(
        problemInput ? problemInput.value : ""
      ),

    customers:
      safeText(
        customersInput ? customersInput.value : ""
      ),

    location:
      safeText(
        locationInput ? locationInput.value : "",
        "Your local market"
      ),

    budget:
      safeText(
        budgetInput ? budgetInput.value : "low",
        "low"
      ),

    goal:
      safeText(
        goalInput ? goalInput.value : "validate",
        "validate"
      ),

    experience:
      safeText(
        experienceInput ? experienceInput.value : "beginner",
        "beginner"
      )
  };
}


/* =========================================================
   ADAPTIVE CUSTOMER
========================================================= */

function buildCustomer(data, profile) {

  if (data.customers) {
    return data.customers;
  }

  return profile.customer;
}


/* =========================================================
   PROBLEM GENERATION
========================================================= */

function buildProblem(data, profile) {

  if (data.problem) {
    return data.problem;
  }

  if (data.businessIdea) {

    return (
      `The opportunity is to turn the problem described in the idea ` +
      `into a focused solution for ${profile.customer}.`
    );
  }

  return (
    `The business needs to identify one specific, painful and ` +
    `frequent customer problem before investing heavily in the solution.`
  );
}


/* =========================================================
   SOLUTION GENERATION
========================================================= */

function buildSolution(data, profile) {

  if (data.businessIdea) {

    return (
      `Build a focused ${profile.label.toLowerCase()} solution around ` +
      `the idea you described, starting with a small MVP for ` +
      `${buildCustomer(data, profile)} in ${data.location}.`
    );
  }

  return (
    `Build a focused ${profile.label.toLowerCase()} offering that solves ` +
    `one measurable problem for ${buildCustomer(data, profile)}.`
  );
}


/* =========================================================
   VALUE PROPOSITION
========================================================= */

function buildValue(data, profile) {

  let value = profile.value;

  if (data.goal === "customers") {
    value +=
      " The immediate priority should be proving that customers will actually pay.";
  }

  if (data.goal === "revenue") {
    value +=
      " The business model should be designed around repeatable revenue.";
  }

  if (data.goal === "scale") {
    value +=
      " The offer should be standardized enough to become repeatable.";
  }

  return value;
}


/* =========================================================
   BUDGET STRATEGY
========================================================= */

function buildBudget(data) {

  if (data.budget === "low") {

    return (
      "Bootstrap approach: validate demand manually first. " +
      "Use free or low-cost tools, avoid unnecessary inventory, " +
      "and spend only after evidence of customer demand."
    );

  }

  if (data.budget === "medium") {

    return (
      "Balanced approach: invest in a professional MVP, basic " +
      "branding, customer acquisition experiments and operational systems."
    );

  }

  return (
    "Higher-budget approach: build a stronger initial operation, " +
    "but still validate the customer problem before committing " +
    "large amounts of capital."
  );
}


/* =========================================================
   EXPERIENCE STRATEGY
========================================================= */

function buildExperience(data) {

  if (data.experience === "beginner") {

    return (
      "Beginner strategy: keep the first version simple, " +
      "learn while building and avoid unnecessary technology."
    );

  }

  if (data.experience === "some") {

    return (
      "Intermediate strategy: use existing skills to move faster " +
      "while validating the business before adding complexity."
    );

  }

  return (
    "Experienced strategy: focus on speed of validation, " +
    "distribution, unit economics and repeatable execution."
  );
}


/* =========================================================
   EFFORT
========================================================= */

function buildEffort(data) {

  if (
    data.businessType === "manufacturing" ||
    data.businessType === "exporter"
  ) {

    return (
      "High operational effort. Product quality, suppliers, " +
      "logistics and customer relationships will require significant attention."
    );
  }

  if (data.businessType === "restaurant") {

    return (
      "Medium-to-high effort. Operations, quality, customer service " +
      "and repeat orders matter every day."
    );
  }

  if (
    data.businessType === "agency" ||
    data.businessType === "service"
  ) {

    return (
      "Medium effort initially, but customer acquisition and service delivery " +
      "can become the main workload as demand increases."
    );
  }

  return (
    "Medium effort. Start small, validate quickly and increase complexity " +
    "only when customer demand justifies it."
  );
}


/* =========================================================
   PRICING
========================================================= */

function buildPricing(data, profile) {

  const location =
    data.location || "your market";

  if (data.businessType === "restaurant") {

    return (
      `Price around the local competitive range in ${location}. ` +
      `Use entry-level items to acquire customers and higher-margin ` +
      `bundles or add-ons to improve order economics.`
    );
  }

  if (data.businessType === "clothing") {

    return (
      "Start with a price that protects your gross margin while remaining " +
      "credible against comparable products. Test bundles and limited drops."
    );
  }

  if (
    data.businessType === "agency" ||
    data.businessType === "service"
  ) {

    return (
      "Use package-based pricing rather than selling hours. " +
      "Create a clear entry package, a core package and an optional premium tier."
    );
  }

  if (data.businessType === "school") {

    return (
      "Test a simple monthly, course-based or cohort-based price. " +
      "Price should reflect measurable learning value and local purchasing power."
    );
  }

  return (
    "Start with a simple price that customers can understand. " +
    "Test willingness to pay with real customers before optimizing pricing."
  );
}


/* =========================================================
   MARKETING
========================================================= */

function buildMarketing(data, profile) {

  let result = profile.marketing;

  if (data.location) {
    result +=
      ` Start locally in ${data.location} before trying to reach a broad market.`;
  }

  if (data.goal === "validate") {
    result +=
      " At the validation stage, conversations and direct feedback are more important than large advertising spend.";
  }

  return result;
}


/* =========================================================
   ACQUISITION
========================================================= */

function buildAcquisition(data, profile) {

  let result = profile.acquisition;

  if (data.experience === "beginner") {

    result +=
      " Keep the first acquisition process manual so you learn what actually convinces customers.";

  }

  if (data.budget === "low") {

    result +=
      " Prioritize organic and direct channels before paid advertising.";

  }

  return result;
}


/* =========================================================
   ROADMAP
========================================================= */

function buildRoadmap(data, profile) {

  const type = profile.label.toLowerCase();

  const roadmap30 =
    `Define the exact customer and problem. Interview or speak with ` +
    `${buildCustomer(data, profile)}. Study existing alternatives, ` +
    `choose one focused offer and test whether people are willing to pay. ` +
    `For this ${type} business, keep the first experiment small.`;

  const roadmap60 =
    `Build the smallest workable version of the offer. Create the MVP, ` +
    `set up basic operations, pricing and customer communication. ` +
    `Aim to serve a small number of real customers and document what happens.`;

  const roadmap90 =
    `Launch publicly in a focused market. Acquire the first repeat customers, ` +
    `measure conversion and repeat usage, collect feedback and remove ` +
    `features or processes that do not create value.`;

  const roadmap6 =
    `Move from experimentation to a repeatable operating system. ` +
    `Improve the offer, customer experience and acquisition process. ` +
    `Track revenue, costs, repeat purchases and customer acquisition.`;

  const roadmap12 =
    `Strengthen unit economics and retention. Standardize operations, ` +
    `automate repetitive work where useful, develop stronger marketing ` +
    `channels and build a reliable customer pipeline.`;

  const roadmapLong =
    `Scale only the parts of the business that have already been validated. ` +
    `Expand products, markets, locations or team capacity based on evidence. ` +
    `The long-term objective is a repeatable business rather than simply a bigger MVP.`;

  return {
    roadmap30,
    roadmap60,
    roadmap90,
    roadmap6,
    roadmap12,
    roadmapLong
  };
}


/* =========================================================
   GROWTH STRATEGY
========================================================= */

function buildGrowth(data, profile) {

  const customer =
    buildCustomer(data, profile);

  return (
    `Growth should happen in stages. First dominate a small customer segment ` +
    `such as ${customer}. Then build a repeatable acquisition channel, improve ` +
    `retention and economics, and only then expand into additional products, ` +
    `markets or locations. Avoid scaling operational complexity before demand ` +
    `is proven.`
  );
}


/* =========================================================
   FIRST ACTIONS
========================================================= */

function buildFirstActions(data, profile) {

  return [
    `Write a one-sentence description of the customer problem.`,
    `Talk to at least 5–10 potential customers.`,
    `Study 3–5 existing alternatives and record their pricing.`,
    `Create the smallest version of the offer.`,
    `Try to get the first real customer before adding unnecessary features.`,
    `Track feedback, costs, conversion and repeat demand.`
  ];
}


/* =========================================================
   FEATURES HTML
========================================================= */

function listToHTML(items) {

  if (!Array.isArray(items)) {
    return "";
  }

  return `
    <ul class="result-list">
      ${items
        .map((item) => `<li>${escapeHTML(item)}</li>`)
        .join("")}
    </ul>
  `;
}


/* =========================================================
   RENDER RESULT
========================================================= */

function renderBlueprint(blueprint) {

  const setText = (id, value) => {

    const element = byId(id);

    if (element) {
      element.textContent = safeText(value);
    }

  };

  const setHTML = (id, value) => {

    const element = byId(id);

    if (element) {
      element.innerHTML = value;
    }

  };

  setText("resultHeading", blueprint.title);
  setText("resSolution", blueprint.solution);
  setText("resProblem", blueprint.problem);
  setText("resValue", blueprint.value);
  setText("resPrimaryCustomer", blueprint.primaryCustomer);
  setText("resLocation", blueprint.location);
  setText("resEarlyAdopters", blueprint.earlyAdopters);
  setText("resBuyer", blueprint.buyer);

  setHTML("resFeatures", listToHTML(blueprint.features));

  setText("resMvp", blueprint.mvp);
  setText("resTech", blueprint.tech);
  setText("resRevenuePrimary", blueprint.revenuePrimary);

  setHTML(
    "resRevenueAlternatives",
    listToHTML(blueprint.revenueAlternatives)
  );

  setText("resPricing", blueprint.pricing);
  setText("resMarketing", blueprint.marketing);
  setText("resAcquisition", blueprint.acquisition);
  setText("resBudget", blueprint.budget);
  setText("resExperience", blueprint.experience);
  setText("resEffort", blueprint.effort);

  setHTML(
    "resRisks",
    listToHTML(blueprint.risks)
  );

  setHTML(
    "resFirstActions",
    listToHTML(blueprint.firstActions)
  );

  setText("resRoadmap30", blueprint.roadmap30);
  setText("resRoadmap60", blueprint.roadmap60);
  setText("resRoadmap90", blueprint.roadmap90);
  setText("resRoadmap6", blueprint.roadmap6);
  setText("resRoadmap12", blueprint.roadmap12);
  setText("resRoadmapLong", blueprint.roadmapLong);
  setText("resGrowth", blueprint.growth);

  updateBlueprintActionButtons();
}


/* =========================================================
   BLUEPRINT GENERATOR
========================================================= */

function generateBlueprint(data) {

  const profile =
    BUSINESS_PROFILES[data.businessType] ||
    BUSINESS_PROFILES.general;

  const customer =
    buildCustomer(data, profile);

  const problem =
    buildProblem(data, profile);

  const solution =
    buildSolution(data, profile);

  const value =
    buildValue(data, profile);

  const roadmap =
    buildRoadmap(data, profile);

  const firstActions =
    buildFirstActions(data, profile);

  const titleBase =
    data.businessIdea
      ? data.businessIdea.slice(0, 70)
      : `${profile.label} Business`;

  return {

    title:
      `${profile.label} — Business Blueprint`,

    solution,
    problem,
    value,

    primaryCustomer:
      customer,

    location:
      data.location,

    earlyAdopters:
      profile.earlyAdopters,

    buyer:
      profile.buyer,

    features:
      profile.features,

    mvp:
      profile.mvp,

    tech:
      profile.tech,

    revenuePrimary:
      profile.revenue,

    revenueAlternatives:
      profile.alternatives,

    pricing:
      buildPricing(data, profile),

    marketing:
      buildMarketing(data, profile),

    acquisition:
      buildAcquisition(data, profile),

    budget:
      buildBudget(data),

    experience:
      buildExperience(data),

    effort:
      buildEffort(data),

    risks:
      profile.risks,

    firstActions,

    roadmap30:
      roadmap.roadmap30,

    roadmap60:
      roadmap.roadmap60,

    roadmap90:
      roadmap.roadmap90,

    roadmap6:
      roadmap.roadmap6,

    roadmap12:
      roadmap.roadmap12,

    roadmapLong:
      roadmap.roadmapLong,

    growth:
      buildGrowth(data, profile),

    sourceIdea:
      titleBase,

    generatedAt:
      new Date().toISOString()
  };
}


/* =========================================================
   STORAGE
========================================================= */

const BLUEPRINT_STORAGE_KEY =
  "theaicraftify_latest_business_blueprint";

function saveBlueprint(blueprint) {

  try {

    localStorage.setItem(
      BLUEPRINT_STORAGE_KEY,
      JSON.stringify(blueprint)
    );

  } catch (error) {

    console.warn(
      "Blueprint could not be saved.",
      error
    );

  }

  window.latestBusinessBlueprint =
    blueprint;
}

function loadBlueprint() {

  try {

    const saved =
      localStorage.getItem(
        BLUEPRINT_STORAGE_KEY
      );

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);

  } catch (error) {

    return null;
  }
}


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateBlueprintForm(data) {

  if (!data.businessIdea && !data.problem) {

    if (businessIdeaInput) {
      businessIdeaInput.focus();
    }

    alert(
      "Please describe your business idea or the problem you want to solve."
    );

    return false;
  }

  return true;
}


/* =========================================================
   SHOW / HIDE LOADING
========================================================= */

function showLoading() {

  if (blueprintLoading) {
    blueprintLoading.hidden = false;
  }

  if (blueprintResults) {
    blueprintResults.hidden = true;
  }
}

function hideLoading() {

  if (blueprintLoading) {
    blueprintLoading.hidden = true;
  }
}


/* =========================================================
   GENERATE FLOW
========================================================= */

async function runBlueprintGeneration() {

  if (!blueprintForm) {
    return;
  }

  const data =
    collectBlueprintData();

  if (!validateBlueprintForm(data)) {
    return;
  }

  showLoading();

  await wait(900);

  const blueprint =
    generateBlueprint(data);

  saveBlueprint(blueprint);

  renderBlueprint(blueprint);

  hideLoading();

  if (blueprintResults) {
    blueprintResults.hidden = false;

    blueprintResults.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================================
   FORM SUBMIT
========================================================= */

if (blueprintForm) {

  blueprintForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      await runBlueprintGeneration();

    }
  );

}


/* =========================================================
   EXAMPLE CHIPS
========================================================= */

$$(".example-chip").forEach((chip) => {

  chip.addEventListener("click", () => {

    const example =
      safeText(
        chip.getAttribute("data-example")
      );

    if (!example) return;

    if (businessIdeaInput) {
      businessIdeaInput.value = example;
    }

    const detected =
      detectBusinessType(example);

    if (
      businessTypeInput &&
      BUSINESS_PROFILES[detected]
    ) {
      businessTypeInput.value = detected;
    }

    if (problemInput && !problemInput.value) {

      problemInput.value =
        `Customers need a better, more convenient solution related to: ${example}`;

    }

    if (blueprintForm) {

      blueprintForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


/* =========================================================
   REGENERATE
========================================================= */

const regenerateBtn =
  byId("regenerateBtn");

if (regenerateBtn) {

  regenerateBtn.addEventListener(
    "click",
    async () => {

      await runBlueprintGeneration();

    }
  );

}


/* =========================================================
   NEW IDEA
========================================================= */

const newIdeaBtn =
  byId("newIdeaBtn");

if (newIdeaBtn) {

  newIdeaBtn.addEventListener(
    "click",
    () => {

      if (blueprintForm) {
        blueprintForm.reset();
      }

      if (blueprintResults) {
        blueprintResults.hidden = true;
      }

      if (blueprintLoading) {
        blueprintLoading.hidden = true;
      }

      if (blueprintForm) {

        blueprintForm.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

      if (businessIdeaInput) {
        setTimeout(() => {
          businessIdeaInput.focus();
        }, 500);
      }

    }
  );

}


/* =========================================================
   OPEN BLUEPRINT BUTTONS
========================================================= */

$$('[data-role="open-blueprint"]').forEach((button) => {

  button.addEventListener("click", () => {

    setTimeout(() => {

      const input =
        byId("businessIdea");

      if (input) {
        input.focus({
          preventScroll: true
        });
      }

    }, 700);

  });

});


/* =========================================================
   BLUEPRINT SAVE / DOWNLOAD UI
========================================================= */

function createBlueprintActionButtons() {

  if (!blueprintResults) {
    return;
  }

  if (
    byId("saveBlueprintBtn") ||
    byId("downloadBlueprintBtn") ||
    byId("restoreBlueprintBtn")
  ) {
    return;
  }

  const actionWrap =
    document.createElement("div");

  actionWrap.className =
    "blueprint-actions";

  actionWrap.innerHTML = `
    <button
      type="button"
      class="btn btn-primary"
      id="saveBlueprintBtn"
    >
      💾 Save Blueprint
    </button>

    <button
      type="button"
      class="btn btn-secondary"
      id="downloadBlueprintBtn"
    >
      📄 Download Blueprint
    </button>

    <button
      type="button"
      class="btn btn-secondary"
      id="restoreBlueprintBtn"
    >
      🔄 Open Last Blueprint
    </button>
  `;

  blueprintResults.prepend(actionWrap);

  const saveButton =
    byId("saveBlueprintBtn");

  const downloadButton =
    byId("downloadBlueprintBtn");

  const restoreButton =
    byId("restoreBlueprintBtn");

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      () => {

        const blueprint =
          window.latestBusinessBlueprint ||
          loadBlueprint();

        if (!blueprint) {

          alert(
            "Generate a Blueprint first."
          );

          return;
        }

        saveBlueprint(blueprint);

        saveButton.textContent =
          "✓ Blueprint Saved";

        setTimeout(() => {
          saveButton.textContent =
            "💾 Save Blueprint";
        }, 1800);

      }
    );

  }

  if (downloadButton) {

    downloadButton.addEventListener(
      "click",
      downloadCurrentBlueprint
    );

  }

  if (restoreButton) {

    restoreButton.addEventListener(
      "click",
      restoreAndShowBlueprint
    );

  }

}


/* =========================================================
   UPDATE ACTION BUTTON STATE
========================================================= */

function updateBlueprintActionButtons() {

  const saveButton =
    byId("saveBlueprintBtn");

  const downloadButton =
    byId("downloadBlueprintBtn");

  const restoreButton =
    byId("restoreBlueprintBtn");

  const hasBlueprint =
    Boolean(
      window.latestBusinessBlueprint ||
      loadBlueprint()
    );

  if (saveButton) {
    saveButton.disabled = !hasBlueprint;
  }

  if (downloadButton) {
    downloadButton.disabled = !hasBlueprint;
  }

  if (restoreButton) {
    restoreButton.disabled = !loadBlueprint();
  }
}


/* =========================================================
   BUILD DOWNLOAD TEXT
========================================================= */

function buildBlueprintDownloadText(blueprint) {

  const listToText = (items) => {

    if (!Array.isArray(items)) {
      return "";
    }

    return items
      .map((item, index) =>
        `${index + 1}. ${item}`
      )
      .join("\n");
  };

  return `
THEAICRAFTIFY
AI BUSINESS BLUEPRINT
========================================

${blueprint.title}

Generated:
${new Date(blueprint.generatedAt).toLocaleString()}

----------------------------------------
SOLUTION
----------------------------------------
${blueprint.solution}

----------------------------------------
PROBLEM
----------------------------------------
${blueprint.problem}

----------------------------------------
VALUE PROPOSITION
----------------------------------------
${blueprint.value}

----------------------------------------
PRIMARY CUSTOMER
----------------------------------------
${blueprint.primaryCustomer}

----------------------------------------
LOCATION
----------------------------------------
${blueprint.location}

----------------------------------------
EARLY ADOPTERS
----------------------------------------
${blueprint.earlyAdopters}

----------------------------------------
BUYER
----------------------------------------
${blueprint.buyer}

----------------------------------------
KEY FEATURES
----------------------------------------
${listToText(blueprint.features)}

----------------------------------------
MVP
----------------------------------------
${blueprint.mvp}

----------------------------------------
TECHNOLOGY
----------------------------------------
${blueprint.tech}

----------------------------------------
PRIMARY REVENUE
----------------------------------------
${blueprint.revenuePrimary}

----------------------------------------
ALTERNATIVE REVENUE
----------------------------------------
${listToText(blueprint.revenueAlternatives)}

----------------------------------------
PRICING
----------------------------------------
${blueprint.pricing}

----------------------------------------
MARKETING
----------------------------------------
${blueprint.marketing}

----------------------------------------
CUSTOMER ACQUISITION
----------------------------------------
${blueprint.acquisition}

----------------------------------------
BUDGET STRATEGY
----------------------------------------
${blueprint.budget}

----------------------------------------
EXPERIENCE STRATEGY
----------------------------------------
${blueprint.experience}

----------------------------------------
EFFORT
----------------------------------------
${blueprint.effort}

----------------------------------------
RISKS
----------------------------------------
${listToText(blueprint.risks)}

----------------------------------------
FIRST ACTIONS
----------------------------------------
${listToText(blueprint.firstActions)}

----------------------------------------
30-DAY ROADMAP
----------------------------------------
${blueprint.roadmap30}

----------------------------------------
60-DAY ROADMAP
----------------------------------------
${blueprint.roadmap60}

----------------------------------------
90-DAY ROADMAP
----------------------------------------
${blueprint.roadmap90}

----------------------------------------
3–6 MONTH ROADMAP
----------------------------------------
${blueprint.roadmap6}

----------------------------------------
6–12 MONTH ROADMAP
----------------------------------------
${blueprint.roadmap12}

----------------------------------------
12+ MONTH ROADMAP
----------------------------------------
${blueprint.roadmapLong}

----------------------------------------
GROWTH STRATEGY
----------------------------------------
${blueprint.growth}

========================================
Generated by TheAICraftify
========================================
`.trim();
}


/* =========================================================
   DOWNLOAD BLUEPRINT
========================================================= */

function downloadCurrentBlueprint() {

  const blueprint =
    window.latestBusinessBlueprint ||
    loadBlueprint();

  if (!blueprint) {

    alert(
      "Generate a Blueprint first."
    );

    return;
  }

  const content =
    buildBlueprintDownloadText(blueprint);

  const blob =
    new Blob(
      [content],
      {
        type: "text/plain;charset=utf-8"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "TheAICraftify-Business-Blueprint.txt";

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}


/* =========================================================
   RESTORE LAST BLUEPRINT
========================================================= */

function restoreAndShowBlueprint() {

  const saved =
    loadBlueprint();

  if (!saved) {

    alert(
      "No saved Blueprint found yet."
    );

    return;
  }

  window.latestBusinessBlueprint =
    saved;

  renderBlueprint(saved);

  hideLoading();

  if (blueprintResults) {

    blueprintResults.hidden = false;

    blueprintResults.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


/* =========================================================
   RESTORE LAST BLUEPRINT ON LOAD
========================================================= */

function restoreLastBlueprint() {

  const saved =
    loadBlueprint();

  if (!saved) {
    return;
  }

  window.latestBusinessBlueprint =
    saved;

  /*
    Old results are intentionally not shown
    automatically on page load.
  */

  setTimeout(() => {
    createBlueprintActionButtons();
    updateBlueprintActionButtons();
  }, 0);
}

restoreLastBlueprint();


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

function setupRevealObserver() {

  const elements = $$(
    ".section-heading, .roadmap-card, .project-card, " +
    ".skill-card, .learning-card, .journey-card, " +
    ".contact-card, .future-goal"
  );

  if (!elements.length) {
    return;
  }

  if (
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.08
      }
    );

  elements.forEach((element) => {

    element.classList.add(
      "reveal-ready"
    );

    observer.observe(element);

  });

}

setupRevealObserver();


/* =========================================================
   HERO TYPING EFFECT
========================================================= */

function setupHeroTyping() {

  const kicker =
    $(".hero-kicker");

  if (!kicker) {
    return;
  }

  const original =
    kicker.textContent.trim();

  if (!original) {
    return;
  }

  if (
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    return;
  }

  let index = 0;

  kicker.textContent = "";

  const typeNext = () => {

    if (index >= original.length) {
      return;
    }

    kicker.textContent +=
      original.charAt(index);

    index += 1;

    setTimeout(
      typeNext,
      28
    );

  };

  setTimeout(
    typeNext,
    500
  );

}

setupHeroTyping();


/* =========================================================
   CREATE BLUEPRINT BUTTONS AFTER DOM IS READY
========================================================= */

createBlueprintActionButtons();
updateBlueprintActionButtons();


/* =========================================================
   BLUEPRINT ENGINE PUBLIC API
========================================================= */

window.TheAICraftifyBlueprint = {

  generate: generateBlueprint,

  detectBusinessType,

  getBusinessProfile(type) {
    return (
      BUSINESS_PROFILES[type] ||
      BUSINESS_PROFILES.general
    );
  },

  getLatest() {
    return (
      window.latestBusinessBlueprint ||
      loadBlueprint()
    );
  },

  save: saveBlueprint,

  load: loadBlueprint,

  download: downloadCurrentBlueprint

};


/* =========================================================
   DEBUG / READY
========================================================= */

console.log(
  "TheAICraftify loaded successfully."
);

console.log(
  "AI Business Blueprint Engine ready."
);

console.log(
  "Blueprint Save + Download features ready."
);
