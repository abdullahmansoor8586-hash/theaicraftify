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
    dayPlus.addEventListener("click", () => {
      if (currentDay < TOTAL_DAYS) {
        currentDay++;
        updateDayUI();
      }
    });
  }


  updateDayUI();


  /* =========================================================
     4. ROADMAP CHECKBOX PERSISTENCE
  ========================================================= */

  let completedTasks = [];

  try {
    completedTasks =
      JSON.parse(
        localStorage.getItem(TASK_STORAGE_KEY) || "[]"
      );

    if (!Array.isArray(completedTasks)) {
      completedTasks = [];
    }

  } catch (error) {
    completedTasks = [];
  }


  const taskCheckboxes =
    document.querySelectorAll(
      'input[type="checkbox"][data-task]'
    );


  taskCheckboxes.forEach((checkbox) => {

    const taskId =
      checkbox.dataset.task;

    checkbox.checked =
      completedTasks.includes(taskId);


    checkbox.addEventListener("change", () => {

      if (checkbox.checked) {

        if (!completedTasks.includes(taskId)) {
          completedTasks.push(taskId);
        }

      } else {

        completedTasks =
          completedTasks.filter(
            (id) => id !== taskId
          );
      }

      localStorage.setItem(
        TASK_STORAGE_KEY,
        JSON.stringify(completedTasks)
      );
    });
  });


  /* =========================================================
     5. ACTIVE NAVIGATION ON SCROLL
  ========================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navAnchors =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );


  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const id =
              entry.target.getAttribute("id");

            navAnchors.forEach((link) => {

              const matches =
                link.getAttribute("href") === `#${id}`;

              link.classList.toggle(
                "active",
                matches
              );
            });

          });

        },
        {
          rootMargin: "-35% 0px -55% 0px"
        }
      );


    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  /* =========================================================
     6. BLUEPRINT ENGINE — HELPERS
  ========================================================= */

  const blueprintForm =
    document.getElementById("blueprintForm");

  const blueprintLoading =
    document.getElementById("blueprintLoading");

  const blueprintResults =
    document.getElementById("blueprintResults");

  const businessTypeInput =
    document.getElementById("businessType");

  const problemInput =
    document.getElementById("problem");

  const customersInput =
    document.getElementById("customers");

  const locationInput =
    document.getElementById("location");

  const budgetInput =
    document.getElementById("budget");

  const goalInput =
    document.getElementById("goal");

  const experienceInput =
    document.getElementById("experience");

  const regenerateBtn =
    document.getElementById("regenerateBtn");

  const newIdeaBtn =
    document.getElementById("newIdeaBtn");


  function clean(value, fallback = "") {
    if (
      value === undefined ||
      value === null
    ) {
      return fallback;
    }

    return String(value).trim();
  }


  function normalize(value) {
    return clean(value)
      .toLowerCase()
      .replace(/[^\w\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }


  function setText(id, value) {
    const element =
      document.getElementById(id);

    if (element) {
      element.textContent =
        clean(value, "Not available.");
    }
  }


  function setList(id, items) {
    const element =
      document.getElementById(id);

    if (!element) {
      return;
    }

    element.innerHTML = "";

    const safeItems =
      Array.isArray(items)
        ? items
        : [items];

    safeItems.forEach((item) => {

      const li =
        document.createElement("li");

      li.textContent =
        clean(item);

      element.appendChild(li);
    });
  }


  function setOrderedList(id, items) {
    setList(id, items);
  }


  function scrollToBlueprint() {
    const section =
      document.getElementById("blueprint-engine");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }


  /* =========================================================
     7. BUSINESS PROFILES
  ========================================================= */

  const BUSINESS_PROFILES = {

    restaurant: {
      keywords: [
        "restaurant",
        "cafe",
        "café",
        "food",
        "bakery",
        "cloud kitchen",
        "food business",
        "eatery"
      ],

      label: "Food Business",

      solution:
        "Build a focused food business around one clear customer segment and a small, repeatable menu. Start with a tightly defined offer, validate demand locally, then improve operations and expand the menu only after the first repeat customers appear.",

      value:
        "Customers get a convenient, trustworthy food option with a clear reason to choose the business instead of a generic alternative.",

      features: [
        "Focused menu built around a small number of profitable items",
        "Simple ordering and enquiry flow",
        "Digital menu with strong product photos",
        "WhatsApp or direct-order customer channel",
        "Customer feedback and repeat-order tracking",
        "Basic loyalty or repeat-purchase system"
      ],

      tech: [
        "Responsive website",
        "HTML / CSS / JavaScript",
        "WhatsApp Business",
        "Google Business Profile",
        "Simple analytics"
      ],

      revenue:
        "Primary revenue should come from direct food and beverage sales, with the strongest focus on repeat customers and profitable items.",

      alternatives: [
        "Meal subscriptions",
        "Corporate / office orders",
        "Party or event catering",
        "Delivery partnerships",
        "Premium bundles"
      ],

      pricing:
        "Start with competitive entry pricing while protecting gross margin. Track ingredient cost, packaging, delivery and wastage before deciding which products deserve promotion.",

      marketing:
        "Use local discovery, short-form food content, customer reviews, Google Business Profile, WhatsApp updates and partnerships with nearby communities or offices.",

      acquisition:
        "Begin with a small geographic area. Use sampling, referral offers, local social content, Google discovery and direct outreach to nearby offices, apartments and communities.",

      risks: [
        "Low repeat purchase rate",
        "High food or packaging costs",
        "Too many menu items",
        "Delivery margin pressure",
        "Weak local differentiation"
      ]
    },


    clothing: {
      keywords: [
        "clothing",
        "fashion",
        "apparel",
        "streetwear",
        "garment",
        "clothes",
        "fashion brand",
        "clothing brand"
      ],

      label: "Clothing Brand",

      solution:
        "Build a focused clothing brand around a specific style, audience or use case rather than trying to sell everything. Start with a small collection and validate which designs customers actually want.",

      value:
        "Customers get clothing that matches a specific identity, aesthetic or need instead of choosing from a generic catalogue.",

      features: [
        "Focused first collection",
        "Mobile-first product catalogue",
        "High-quality product photography",
        "Size and fit information",
        "Simple checkout or enquiry flow",
        "Customer reviews",
        "Social media product discovery"
      ],

      tech: [
        "Responsive storefront",
        "HTML / CSS / JavaScript",
        "Payment / commerce platform",
        "Instagram / social commerce",
        "Analytics"
      ],

      revenue:
        "Primary revenue comes from product sales, with margin driven by product selection, sourcing, pricing and repeat customers.",

      alternatives: [
        "Limited drops",
        "Bundles",
        "Memberships",
        "Custom products",
        "Wholesale"
      ],

      pricing:
        "Calculate landed product cost first, then include packaging, payment fees, marketing and returns before setting retail pricing.",

      marketing:
        "Use short-form video, creator collaborations, customer-generated content, visual storytelling and niche communities.",

      acquisition:
        "Start with one narrow audience and use organic social content, micro-creators, referrals and limited product drops to create early demand.",

      risks: [
        "Inventory risk",
        "Weak differentiation",
        "High return rates",
        "Poor product photography",
        "Cash tied up in unsold stock"
      ]
    },


    school: {
      keywords: [
        "school",
        "education",
        "tuition",
        "coaching",
        "academy",
        "learning",
        "training institute",
        "classes"
      ],

      label: "Education Business",

      solution:
        "Build a focused learning service around a specific learner, outcome and curriculum. Start with one programme and prove that students achieve a useful result before expanding.",

      value:
        "Learners receive a structured path toward a specific outcome instead of scattered educational content.",

      features: [
        "Focused curriculum",
        "Student onboarding",
        "Progress tracking",
        "Assignments or practice",
        "Teacher / mentor support",
        "Parent or learner communication",
        "Outcome tracking"
      ],

      tech: [
        "Responsive website",
        "Learning management workflow",
        "Forms",
        "Video meeting tools",
        "WhatsApp communication",
        "Analytics"
      ],

      revenue:
        "Primary revenue should come from paid programmes, classes or subscriptions.",

      alternatives: [
        "Workshops",
        "Recorded courses",
        "Tutoring",
        "Corporate training",
        "Study materials"
      ],

      pricing:
        "Price around the measurable outcome and delivery effort. Offer a clear entry product before creating expensive long-term programmes.",

      marketing:
        "Use educational content, demonstrations, testimonials, referrals, local search and free introductory sessions.",

      acquisition:
        "Use referrals, local communities, educational content, partnerships and targeted outreach to parents, students or organisations.",

      risks: [
        "Low student retention",
        "Unclear learning outcomes",
        "Heavy founder involvement",
        "Weak differentiation",
        "Inconsistent delivery quality"
      ]
    },


    salon: {
      keywords: [
        "salon",
        "beauty",
        "barber",
        "spa",
        "parlour",
        "parlor",
        "beauty salon"
      ],

      label: "Beauty / Personal Care",

      solution:
        "Build a local beauty service around a clear service menu, easy booking and repeat visits. Focus on customer experience and retention before expanding the service range.",

      value:
        "Customers get a convenient, trustworthy local service with simple booking and consistent quality.",

      features: [
        "Service catalogue",
        "Booking / enquiry flow",
        "Price list",
        "Location and opening hours",
        "Before / after portfolio",
        "Customer reviews",
        "Repeat-visit reminders"
      ],

      tech: [
        "Responsive website",
        "Booking system",
        "Google Business Profile",
        "WhatsApp Business",
        "Social media"
      ],

      revenue:
        "Primary revenue comes from service appointments and repeat customers.",

      alternatives: [
        "Membership packages",
        "Premium treatments",
        "Retail products",
        "Home services",
        "Gift cards"
      ],

      pricing:
        "Use service-level costing and local competitor research. Create clear entry, standard and premium options where appropriate.",

      marketing:
        "Use before/after content, reviews, local discovery, referrals, social media and limited-time introductory offers.",

      acquisition:
        "Focus on a small radius using Google, Instagram, referrals, local partnerships and WhatsApp.",

      risks: [
        "Low repeat rate",
        "Appointment cancellations",
        "Staff dependency",
        "Weak local visibility",
        "Inconsistent service quality"
      ]
    },


    agency: {
      keywords: [
        "agency",
        "digital agency",
        "marketing agency",
        "web agency",
        "creative agency",
        "development agency"
      ],

      label: "Service Agency",

      solution:
        "Start with one specialised service for one clear customer segment. Productise the service into a repeatable offer instead of accepting every possible project.",

      value:
        "Clients get a focused outcome without needing to hire a full internal team.",

      features: [
        "Clear service package",
        "Portfolio / proof",
        "Lead capture",
        "Discovery process",
        "Proposal template",
        "Delivery workflow",
        "Client reporting"
      ],

      tech: [
        "Website",
        "HTML / CSS / JavaScript",
        "AI-assisted workflows",
        "CRM or spreadsheet",
        "Automation tools",
        "Analytics"
      ],

      revenue:
        "Primary revenue comes from project fees or recurring retainers for a clearly defined service.",

      alternatives: [
        "Maintenance retainers",
        "Consulting",
        "Training",
        "Templates",
        "Productised services"
      ],

      pricing:
        "Package the service around a defined outcome and scope. Avoid pricing only by hours once the workflow becomes repeatable.",

      marketing:
        "Use case studies, educational content, targeted outreach, referrals, communities and direct prospecting.",

      acquisition:
        "Choose one niche and contact relevant prospects with a specific problem-focused offer.",

      risks: [
        "Too many services",
        "Unclear positioning",
        "Inconsistent leads",
        "Scope creep",
        "Founder becoming the bottleneck"
      ]
    },


    shop: {
      keywords: [
        "shop",
        "store",
        "retail",
        "online store",
        "ecommerce",
        "e-commerce",
        "product store"
      ],

      label: "Retail / E-commerce",

      solution:
        "Start with a focused product category and a small catalogue. Validate which products sell before investing heavily in inventory.",

      value:
        "Customers get a convenient way to discover and purchase a focused range of relevant products.",

      features: [
        "Focused product catalogue",
        "Product search",
        "Clear pricing",
        "Product photography",
        "Order / enquiry flow",
        "Reviews",
        "Customer support"
      ],

      tech: [
        "Responsive storefront",
        "HTML / CSS / JavaScript",
        "Commerce platform",
        "Payment provider",
        "Analytics"
      ],

      revenue:
        "Primary revenue comes from product sales with margin managed through sourcing, pricing and inventory control.",

      alternatives: [
        "Bundles",
        "Subscriptions",
        "Wholesale",
        "Private-label products",
        "Memberships"
      ],

      pricing:
        "Calculate product cost, shipping, payment fees, returns and marketing before deciding retail price.",

      marketing:
        "Use search, social content, product demonstrations, creators, referrals and customer-generated content.",

      acquisition:
        "Start with one product category and use content, search discovery, communities and targeted partnerships.",

      risks: [
        "Inventory risk",
        "Low margins",
        "High return rate",
        "Supplier problems",
        "Weak differentiation"
      ]
    },


    realEstate: {
      keywords: [
        "real estate",
        "property",
        "properties",
        "broker",
        "realty",
        "real estate agency"
      ],

      label: "Real Estate Business",

      solution:
        "Build a focused local property service around one area, property type or customer segment. The initial advantage should come from better lead handling, trustworthy information and faster follow-up.",

      value:
        "Buyers, sellers or renters get a more focused property discovery and support experience.",

      features: [
        "Property catalogue",
        "Search and filtering",
        "Lead capture",
        "WhatsApp enquiry",
        "Location information",
        "Property verification workflow",
        "Follow-up tracking"
      ],

      tech: [
        "Responsive website",
        "Property database",
        "Lead form",
        "WhatsApp Business",
        "CRM / spreadsheet",
        "Analytics"
      ],

      revenue:
        "Revenue can come from transaction commissions, service fees or property marketing packages depending on the operating model.",

      alternatives: [
        "Property marketing",
        "Lead generation",
        "Management services",
        "Consulting",
        "Premium listings"
      ],

      pricing:
        "Keep pricing transparent and tied to the service provided or transaction outcome.",

      marketing:
        "Use local SEO, property content, social media, community groups, referrals and direct relationships.",

      acquisition:
        "Own a small local market first rather than trying to cover an entire city immediately.",

      risks: [
        "Long sales cycles",
        "Lead quality",
        "Trust issues",
        "Regulatory requirements",
        "Dependency on inventory"
      ]
    },


    manufacturing: {
      keywords: [
        "manufacturing",
        "factory",
        "manufacturer",
        "industrial",
        "production",
        "manufacturing business"
      ],

      label: "Manufacturing Business",

      solution:
        "Start with one product or manufacturing capability where there is identifiable demand. Validate buyers, required specifications, minimum order quantities and unit economics before expanding production.",

      value:
        "Business customers receive a reliable product with predictable specifications, quality and delivery.",

      features: [
        "Product specification",
        "Sample / prototype process",
        "Quotation workflow",
        "Production tracking",
        "Quality control",
        "Inventory tracking",
        "B2B customer management"
      ],

      tech: [
        "Business website",
        "Quotation system",
        "Inventory spreadsheet or software",
        "CRM",
        "Production tracking",
        "Analytics"
      ],

      revenue:
        "Primary revenue comes from product orders, ideally with repeat B2B customers and predictable production runs.",

      alternatives: [
        "Custom manufacturing",
        "Private label",
        "Wholesale",
        "Contract manufacturing",
        "Export"
      ],

      pricing:
        "Price from complete unit economics including materials, labour, energy, wastage, packaging, logistics and overhead.",

      marketing:
        "Use B2B outreach, industry directories, trade networks, demonstrations, samples and relationship-driven selling.",

      acquisition:
        "Identify a narrow buyer profile and contact potential buyers directly with a clear product specification and sample offer.",

      risks: [
        "High initial capital",
        "Quality problems",
        "Production delays",
        "Working-capital pressure",
        "Customer concentration"
      ]
    },


    exporter: {
      keywords: [
        "export",
        "exporter",
        "international trade",
        "trading",
        "import export",
        "global trade"
      ],

      label: "Export / Trading Business",

      solution:
        "Start with one product category and one target international market. Validate buyer demand, compliance, logistics, margins and payment terms before scaling.",

      value:
        "International buyers get reliable access to a relevant product with clear specifications and dependable communication.",

      features: [
        "Product catalogue",
        "Buyer enquiry system",
        "Product specifications",
        "Quotation workflow",
        "Sample process",
        "Documentation workflow",
        "Order tracking"
      ],

      tech: [
        "Business website",
        "Digital catalogue",
        "CRM",
        "Email",
        "Messaging",
        "Spreadsheet / operations system"
      ],

      revenue:
        "Primary revenue comes from product trading margins or export order margins.",

      alternatives: [
        "Private label",
        "Sourcing services",
        "Distribution",
        "Wholesale",
        "Commission-based trading"
      ],

      pricing:
        "Calculate product, packaging, compliance, freight, insurance, payment and currency costs before quoting.",

      marketing:
        "Use B2B directories, targeted outreach, trade communities, referrals and product-specific content.",

      acquisition:
        "Build a list of relevant buyers in one target market and run systematic, personalised outreach.",

      risks: [
        "Compliance problems",
        "Currency risk",
        "Logistics delays",
        "Buyer payment risk",
        "Low initial trust"
      ]
    },


    service: {
      keywords: [
        "service",
        "consulting",
        "freelance",
        "repair",
        "cleaning",
        "maintenance",
        "professional service"
      ],

      label: "Service Business",

      solution:
        "Turn a skill into a clearly packaged service for a specific customer type. Start with one offer, create a repeatable delivery process and collect proof from early customers.",

      value:
        "Customers get a specific problem solved without having to figure out the process themselves.",

      features: [
        "Clear service package",
        "Simple landing page",
        "Lead form",
        "Booking or enquiry flow",
        "Service process",
        "Testimonials",
        "Follow-up system"
      ],

      tech: [
        "Responsive website",
        "HTML / CSS / JavaScript",
        "Forms",
        "WhatsApp / email",
        "Simple CRM",
        "Automation"
      ],

      revenue:
        "Primary revenue comes from service fees, packages or recurring retainers.",

      alternatives: [
        "Subscriptions",
        "Maintenance plans",
        "Consulting",
        "Training",
        "Digital products"
      ],

      pricing:
        "Package the service around customer value and delivery effort. Use clear scope to prevent uncontrolled work.",

      marketing:
        "Use educational content, referrals, local search, communities, direct outreach and proof of results.",

      acquisition:
        "Start with a narrow customer profile and direct outreach. Turn successful projects into case studies.",

      risks: [
        "Inconsistent leads",
        "Scope creep",
        "Time-based income",
        "Founder bottleneck",
        "Weak differentiation"
      ]
    },


    general: {
      keywords: [],

      label: "General Business",

      solution:
        "Start with a narrow version of the idea that solves one clear customer problem. Validate demand before building a large product or investing heavily.",

      value:
        "Customers get a focused solution to a real problem with less complexity than trying to serve everyone.",

      features: [
        "Clear core offer",
        "Simple landing page",
        "Customer enquiry flow",
        "Basic onboarding",
        "Feedback collection",
        "Simple analytics"
      ],

      tech: [
        "Responsive website",
        "HTML / CSS / JavaScript",
        "Forms",
        "Analytics",
        "Simple automation"
      ],

      revenue:
        "Choose one primary revenue model that is easy for customers to understand and easy for you to deliver.",

      alternatives: [
        "Subscriptions",
        "One-time purchases",
        "Service packages",
        "Licensing",
        "Consulting"
      ],

      pricing:
        "Start with a simple price that reflects customer value and your delivery costs. Test pricing with real customers rather than assuming the perfect number.",

      marketing:
        "Create useful content around the customer problem and build trust before aggressively selling.",

      acquisition:
        "Start with direct outreach, referrals, communities, search and relevant social content.",

      risks: [
        "Building before validating",
        "Unclear target customer",
        "Weak differentiation",
        "Poor pricing",
        "Trying to serve everyone"
      ]
    }
  };


  /* =========================================================
     8. CATEGORY DETECTION
  ========================================================= */

  function detectBusinessCategory(businessType) {

    const value =
      normalize(businessType);

    if (!value) {
      return "general";
    }


    for (const [category, profile]
      of Object.entries(BUSINESS_PROFILES)) {

      if (category === "general") {
        continue;
      }

      const found =
        profile.keywords.some((keyword) =>
          value.includes(
            normalize(keyword)
          )
        );

      if (found) {
        return category;
      }
    }


    return "general";
  }


  /* =========================================================
     9. INPUT DATA
  ========================================================= */

  function getBlueprintInput() {

    return {
      businessType:
        clean(
          businessTypeInput?.value
        ),

      problem:
        clean(
          problemInput?.value
        ),

      customers:
        clean(
          customersInput?.value
        ),

      location:
        clean(
          locationInput?.value,
          "Local / Online"
        ),

      budget:
        clean(
          budgetInput?.value,
          "low"
        ),

      goal:
        clean(
          goalInput?.value,
          "income"
        ),

      experience:
        clean(
          experienceInput?.value,
          "beginner"
        )
    };
  }


  /* =========================================================
     10. ADAPTIVE CONTENT
  ========================================================= */

  function customerText(input, profile) {

    if (input.customers) {
      return input.customers;
    }

    const defaults = {
      restaurant:
        "Local customers, nearby families, office workers and repeat food buyers.",

      clothing:
        "A focused group of fashion-conscious customers who identify with the brand's style.",

      school:
        "Students, parents or professionals looking for a specific learning outcome.",

      salon:
        "Local customers who value convenience, trust and repeat personal-care services.",

      agency:
        "Small businesses and founders who need a specialised service but do not want a full internal team.",

      shop:
        "Customers actively looking for products within the chosen category.",

      realEstate:
        "Local buyers, sellers, landlords or renters depending on the selected property niche.",

      manufacturing:
        "Businesses that regularly purchase the product or component being manufactured.",

      exporter:
        "International B2B buyers looking for reliable suppliers in the chosen product category.",

      service:
        "Customers or businesses experiencing the specific problem your service solves.",

      general:
        "A clearly defined group of customers who repeatedly experience the problem."
    };

    return defaults[detectBusinessCategory(input.businessType)]
      || defaults.general;
  }


  function generateProblem(input) {

    if (input.problem) {
      return input.problem;
    }

    return `Customers in ${input.location || "the target market"} may currently have difficulty finding a reliable, convenient and clearly differentiated solution for ${input.businessType || "this business idea"}.`;
  }


  function generateEarlyAdopters(input, profile) {

    const customer =
      customerText(input, profile);

    return `Start with a small group of customers most likely to feel the problem strongly. For this idea, that means ${customer.toLowerCase()} Focus first on people who already spend money trying to solve the problem.`;
  }


  function generateBuyer(input, profile) {

    if (input.customers) {
      return `The initial buyer should be the person or organisation represented by "${input.customers}". Confirm who actually controls the purchase decision before building the full offer.`;
    }

    return `Identify the person who directly experiences the problem and has the authority or willingness to pay for the solution. For this ${profile.label.toLowerCase()}, keep the first buyer profile narrow enough to target directly.`;
  }


  function generateMVP(input, profile) {

    const business =
      input.businessType || profile.label;

    const goalText = {
      income:
        "The MVP should prove that customers will pay.",

      local:
        "The MVP should prove local demand and repeat usage.",

      online:
        "The MVP should prove online acquisition and conversion.",

      startup:
        "The MVP should prove a repeatable problem-solution fit before scaling.",

      freelance:
        "The MVP should prove that the service can be sold and delivered consistently."
    };

    return `For ${business}, build only the smallest version that can deliver the core customer outcome. ${goalText[input.goal] || goalText.income} Do not build secondary features until real users provide evidence that they are needed.`;
  }


  function generateEffort(input, profile) {

    const effortMap = {
      low:
        "Start lean. Focus on validation, a simple offer and a lightweight MVP before spending heavily.",

      medium:
        "A moderate build-and-test cycle is realistic. Invest in the parts that directly improve customer acquisition or delivery.",

      high:
        "A larger investment may be possible, but validate the core demand before committing the full budget."
    };

    return effortMap[input.budget]
      || effortMap.low;
  }


  function generateTechnology(input, profile) {

    const base =
      profile.tech || [];

    const experienceAddition = {
      beginner:
        "Prefer simple technologies you can understand and maintain yourself.",

      intermediate:
        "You can introduce more structured application architecture after the MVP is validated.",

      advanced:
        "Choose architecture based on scale, reliability, integration and maintainability requirements."
    };

    return [
      ...base,
      experienceAddition[input.experience] ||
        experienceAddition.beginner
    ];
  }


  function generatePricing(input, profile) {

    let pricing =
      profile.pricing;

    if (input.budget === "low") {
      pricing +=
        " Keep the initial offer simple so you can test willingness to pay without requiring a large upfront investment.";
    }

    if (input.goal === "startup") {
      pricing +=
        " As the business proves demand, test pricing against retention, conversion and customer acquisition cost.";
    }

    return pricing;
  }


  function generateMarketing(input, profile) {

    let marketing =
      profile.marketing;

    if (input.location) {
      marketing +=
        ` For ${input.location}, adapt the channels to where your actual customers already spend time.`;
    }

    return marketing;
  }


  function generateAcquisition(input, profile) {

    let acquisition =
      profile.acquisition;

    if (input.experience === "beginner") {
      acquisition +=
        " As a beginner, prioritise one or two acquisition channels rather than trying every platform simultaneously.";
    }

    return acquisition;
  }


  function generateRevenue(profile, input) {

    let primary =
      profile.revenue;

    if (input.goal === "freelance") {
      primary =
        "Use a clearly packaged service with a defined scope, delivery process and price. Add recurring support only after the core service is proven.";
    }

    return {
      primary,
      alternatives:
        profile.alternatives
    };
  }


  /* =========================================================
     11. ROADMAP ENGINE
  ========================================================= */

  function generateRoadmap(input, profile) {

    const business =
      input.businessType || profile.label;

    const location =
      input.location || "the target market";

    return {

      day30:
        `Days 0–30: Validate ${business} in ${location}. Interview potential customers, study existing alternatives, define one narrow customer segment, test the core offer and identify what people are already willing to pay for. Do not overbuild.`,

      day60:
        `Days 31–60: Build the smallest usable MVP for ${business}. Create the core customer experience, basic brand or landing page, essential operations and a simple way to capture feedback and measure demand.`,

      day90:
        `Days 61–90: Launch to a controlled group of real customers. Focus on first transactions, delivery quality, customer feedback and evidence of repeat demand rather than vanity metrics.`,

      month6:
        `3–6 months: Improve the offer using real customer behaviour. Build repeatable acquisition, improve operations, document the process and aim for a predictable flow of customers and revenue.`,

      month12:
        `6–12 months: Strengthen unit economics, retention, positioning and delivery. Remove unnecessary work, automate repetitive processes and expand only the parts that show reliable demand.`,

      longTerm:
        `12+ months: Scale the proven model. Consider additional products, locations, customer segments, partnerships, technology, team hiring or automation only when the core business model is working consistently.`
    };
  }


  /* =========================================================
     12. GROWTH ENGINE
  ========================================================= */

  function generateGrowth(input, profile) {

    const business =
      input.businessType || profile.label;

    return `Long-term growth for ${business} should follow evidence rather than assumptions: first prove the customer problem, then prove willingness to pay, then create a repeatable acquisition channel, improve margins and retention, and only then expand products, geography, team or technology.`;
  }


  /* =========================================================
     13. FULL BLUEPRINT
  ========================================================= */

  function generateBusinessBlueprint(input) {

    const category =
      detectBusinessCategory(
        input.businessType
      );

    const profile =
      BUSINESS_PROFILES[category] ||
      BUSINESS_PROFILES.general;


    const revenue =
      generateRevenue(
        profile,
        input
      );


    const roadmap =
      generateRoadmap(
        input,
        profile
      );


    return {

      category,

      heading:
        `${input.businessType || profile.label} — Business Blueprint`,

      solution:
        profile.solution,

      problem:
        generateProblem(input),

      value:
        profile.value,

      primaryCustomer:
        customerText(
          input,
          profile
        ),

      location:
        input.location ||
        "Local / Online",

      earlyAdopters:
        generateEarlyAdopters(
          input,
          profile
        ),

      buyer:
        generateBuyer(
          input,
          profile
        ),

      features:
        profile.features,

      mvp:
        generateMVP(
          input,
          profile
        ),

      tech:
        generateTechnology(
          input,
          profile
        ),

      revenuePrimary:
        revenue.primary,

      revenueAlternatives:
        revenue.alternatives,

      pricing:
        generatePricing(
          input,
          profile
        ),

      marketing:
        generateMarketing(
          input,
          profile
        ),

      acquisition:
        generateAcquisition(
          input,
          profile
        ),

      budget:
        `Budget level: ${input.budget}. Start by spending only on activities that directly validate demand, improve delivery or acquire customers. Avoid major fixed costs before validation.`,

      experience:
        `Experience level: ${input.experience}. The first version should match your current ability. Use AI-assisted development and simple tools where they reduce complexity without hiding how the system works.`,

      effort:
        generateEffort(
          input,
          profile
        ),

      risks:
        profile.risks,

      firstActions: [
        "Write the one-sentence customer problem.",
        "Choose one narrow customer segment.",
        "Interview or speak with at least 5 potential customers.",
        "Study 3–5 existing alternatives.",
        "Create the smallest testable offer.",
        "Ask for real commitment, payment, booking or sign-up.",
        "Record the evidence and revise the plan."
      ],

      roadmap30:
        roadmap.day30,

      roadmap60:
        roadmap.day60,

      roadmap90:
        roadmap.day90,

      roadmap6:
        roadmap.month6,

      roadmap12:
        roadmap.month12,

      roadmapLong:
        roadmap.longTerm,

      growth:
        generateGrowth(
          input,
          profile
        )
    };
  }


  /* =========================================================
     14. RENDER BLUEPRINT
  ========================================================= */

  function renderBlueprint(blueprint) {

    setText(
      "resultHeading",
      blueprint.heading
    );

    setText(
      "resSolution",
      blueprint.solution
    );

    setText(
      "resProblem",
      blueprint.problem
    );

    setText(
      "resValue",
      blueprint.value
    );

    setText(
      "resPrimaryCustomer",
      blueprint.primaryCustomer
    );

    setText(
      "resLocation",
      blueprint.location
    );

    setText(
      "resEarlyAdopters",
      blueprint.earlyAdopters
    );

    setText(
      "resBuyer",
      blueprint.buyer
    );

    setList(
      "resFeatures",
      blueprint.features
    );

    setText(
      "resMvp",
      blueprint.mvp
    );

    setList(
      "resTech",
      blueprint.tech
    );

    setText(
      "resRevenuePrimary",
      blueprint.revenuePrimary
    );

    setList(
      "resRevenueAlternatives",
      blueprint.revenueAlternatives
    );

    setText(
      "resPricing",
      blueprint.pricing
    );

    setText(
      "resMarketing",
      blueprint.marketing
    );

    setText(
      "resAcquisition",
      blueprint.acquisition
    );

    setText(
      "resBudget",
      blueprint.budget
    );

    setText(
      "resExperience",
      blueprint.experience
    );

    setText(
      "resEffort",
      blueprint.effort
    );

    setList(
      "resRisks",
      blueprint.risks
    );

    setOrderedList(
      "resFirstActions",
      blueprint.firstActions
    );

    setText(
      "resRoadmap30",
      blueprint.roadmap30
    );

    setText(
      "resRoadmap60",
      blueprint.roadmap60
    );

    setText(
      "resRoadmap90",
      blueprint.roadmap90
    );

    setText(
      "resRoadmap6",
      blueprint.roadmap6
    );

    setText(
      "resRoadmap12",
      blueprint.roadmap12
    );

    setText(
      "resRoadmapLong",
      blueprint.roadmapLong
    );

    setText(
      "resGrowth",
      blueprint.growth
    );


    if (blueprintResults) {
      blueprintResults.hidden = false;
    }


    if (blueprintLoading) {
      blueprintLoading.hidden = true;
    }


    window.latestBusinessBlueprint =
      blueprint;
  }


  /* =========================================================
     15. GENERATION
  ========================================================= */

  let lastInput = null;


  function runBlueprintGeneration(
    shouldScroll = true
  ) {

    if (!blueprintForm) {
      return;
    }


    const input =
      getBlueprintInput();


    if (!input.businessType) {

      if (businessTypeInput) {
        businessTypeInput.focus();
      }

      return;
    }


    lastInput = {
      ...input
    };


    if (blueprintLoading) {
      blueprintLoading.hidden = false;
    }


    if (blueprintResults) {
      blueprintResults.hidden = true;
    }


    if (shouldScroll) {
      scrollToBlueprint();
    }


    window.setTimeout(() => {

      const blueprint =
        generateBusinessBlueprint(
          input
        );

      renderBlueprint(
        blueprint
      );

    }, 650);
  }


  /* =========================================================
     16. FORM SUBMIT
  ========================================================= */

  if (blueprintForm) {

    blueprintForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        runBlueprintGeneration(true);
      }
    );
  }


  /* =========================================================
     17. EXAMPLE CHIPS
  ========================================================= */

  const exampleChips =
    document.querySelectorAll(
      ".example-chip"
    );


  exampleChips.forEach((chip) => {

    chip.addEventListener(
      "click",
      () => {

        const example =
          chip.dataset.example;

        if (!businessTypeInput) {
          return;
        }

        businessTypeInput.value =
          example;

        businessTypeInput.focus();

        const category =
          detectBusinessCategory(
            example
          );


        const exampleProblems = {

          restaurant:
            "People want convenient, trustworthy food with consistent quality and easy ordering.",

          clothing:
            "Customers struggle to find clothing that matches their specific style and identity.",

          salon:
            "Local customers want convenient booking and a reliable personal-care experience.",

          "digital agency":
            "Small businesses need specialised digital work without hiring a full internal team.",

          "online store":
            "Customers want a convenient way to discover and purchase relevant products online.",

          "real estate":
            "Buyers and sellers need trustworthy property information and faster follow-up."
        };


        const selectedProblem =
          exampleProblems[example];


        if (
          selectedProblem &&
          problemInput &&
          !problemInput.value.trim()
        ) {
          problemInput.value =
            selectedProblem;
        }


        if (
          category !== "general" &&
          customersInput &&
          !customersInput.value.trim()
        ) {
          const customerDefaults = {

            restaurant:
              "Local families, office workers and nearby food customers.",

            clothing:
              "Fashion-conscious customers in a focused niche.",

            salon:
              "Local customers who regularly purchase beauty or personal-care services.",

            agency:
              "Small businesses and founders.",

            shop:
              "Customers actively searching for products in the selected category.",

            realEstate:
              "Local buyers, sellers, landlords and renters."
          };


          if (customerDefaults[category]) {
            customersInput.value =
              customerDefaults[category];
          }
        }
      }
    );
  });


  /* =========================================================
     18. REGENERATE
  ========================================================= */

  if (regenerateBtn) {

    regenerateBtn.addEventListener(
      "click",
      () => {

        if (!lastInput) {
          runBlueprintGeneration(false);
          return;
        }


        if (blueprintLoading) {
          blueprintLoading.hidden = false;
        }

        if (blueprintResults) {
          blueprintResults.hidden = true;
        }


        window.setTimeout(() => {

          const blueprint =
            generateBusinessBlueprint(
              lastInput
            );

          renderBlueprint(
            blueprint
          );

        }, 500);
      }
    );
  }


  /* =========================================================
     19. NEW IDEA
  ========================================================= */

  if (newIdeaBtn) {

    newIdeaBtn.addEventListener(
      "click",
      () => {

        if (blueprintForm) {
          blueprintForm.reset();
        }

        lastInput = null;

        if (blueprintResults) {
          blueprintResults.hidden = true;
        }

        if (blueprintLoading) {
          blueprintLoading.hidden = true;
        }

        if (businessTypeInput) {
          businessTypeInput.focus();
        }

        scrollToBlueprint();
      }
    );
  }


  /* =========================================================
     20. OPEN BLUEPRINT BUTTON
  ========================================================= */

  const blueprintOpenButtons =
    document.querySelectorAll(
      '[data-role="open-blueprint"]'
    );


  blueprintOpenButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        window.setTimeout(() => {

          if (businessTypeInput) {
            businessTypeInput.focus();
          }

        }, 500);
      }
    );
  });


  /* =========================================================
     21. PUBLIC API
     Useful later for future features.
  ========================================================= */

  window.TheAICraftifyBlueprint = {

    generate:
      generateBusinessBlueprint,

    detectCategory:
      detectBusinessCategory,

    render:
      renderBlueprint

  };


  /* =========================================================
     22. READY LOG
  ========================================================= */

  console.log(
    "TheAIcraftify portfolio + Business Blueprint Engine loaded."
  );

});
