/**
 * Every word the site says, in one place.
 *
 * House rules, from the doctrine: short sentences, real trade vocabulary, a specific
 * number before an opinion, no em dashes, and none of the category's vocabulary
 * ("AI-powered", "agentic", "seamless", "revolutionize", "unlock", "cutting-edge").
 */

export const CONTACT_EMAIL = "hello@plarix.dev";
export const SITE_URL = "https://plarix.dev";

export const nav = [
  { label: "Processes", href: "/processes" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Journal", href: "/journal" },
] as const;

export const footerNav = {
  Product: [
    { label: "Processes", href: "/processes" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Get your count", href: "/count" },
  ],
  Company: [
    { label: "What we believe", href: "/company" },
    { label: "Journal", href: "/journal" },
    { label: "Questions", href: "/faq" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export const hero = {
  facts: ["Your systems, unchanged", "Live in weeks", "No contract"],
  headline: "Everything after the call.",
  subhead:
    "Home services runs on what happens once the phone hangs up. Plarix builds the operational AI that does that work, inside the systems you already use.",
  primaryCta: { label: "Get your count", href: "/count" },
  secondaryCta: { label: "How it works", href: "/how-it-works" },
  rotatorLabel: "Processes we run",
};

/** One-paragraph answer, written to be quoted back by a search or an assistant. */
export const answerBlock = {
  question: "What does Plarix do?",
  answer:
    "Plarix builds operational AI for home services companies. It runs the back office processes a job leaves behind, warranty and rebate recovery, invoice reconciliation, vendor credits, permits, technician pay and membership renewals, inside the field service software a contractor already uses. There is no data migration, no new software for the team to learn, and no long contract. Every engagement starts with a free count of what is actually sitting unclaimed in the company's own data.",
};

export const processes = [
  {
    slug: "warranty-and-rebate-recovery",
    id: "warranty",
    name: "Warranty and rebate recovery",
    short: "Reads your closed jobs, finds every claim you are still owed, files it, tracks it to paid.",
    detail:
      "Labor reimbursement on parts you already replaced. Manufacturer rebates with deadlines nobody wrote down. Dealer tier credits that lapse quietly. It checks eligibility against each manufacturer's rules, prepares the claim, files it through the right channel, and chases it until the money lands or someone tells you why it will not.",
    metaTitle: "Warranty and rebate recovery for HVAC and plumbing contractors",
    metaDescription:
      "Plarix finds every manufacturer warranty claim, parts credit and rebate a home services company is still owed, files it, and tracks it to paid. Free count first. No contract.",
    reads: [
      "Closed work orders and the parts consumed on each one",
      "Serial numbers, install dates and registration status",
      "Existing claim history, so nothing gets filed twice",
      "Each manufacturer's current eligibility rules and filing windows",
    ],
    does: [
      "Flags every closed job that carries an unfiled, still eligible claim",
      "Assembles the claim with the documentation that manufacturer actually requires",
      "Files it through the right portal or channel for that program",
      "Tracks status, answers routine follow ups, and escalates a rejection to a person",
      "Watches rebate and dealer tier deadlines so none of them pass unnoticed",
    ],
    gives: [
      "A running count of claims filed, approved, rejected and paid",
      "Dollars recovered, against the dollars that were sitting there before we started",
      "A reason on every rejection, in language you can act on",
    ],
    why: "It is the cleanest place to start because the result is a number, and a number either exists or it does not.",
  },
  {
    slug: "invoice-and-job-reconciliation",
    id: "reconciliation",
    name: "Invoice and job reconciliation",
    short: "Matches parts, labor and invoices against what actually happened on the job.",
    detail:
      "Every job produces a paper version and a real version, and they drift. This one reads both, flags the gap, and either corrects it or puts it in front of the one person who should decide. Underbilled jobs stop shipping. Overbilled ones stop coming back as disputes.",
    metaTitle: "Invoice and job reconciliation for home services contractors",
    metaDescription:
      "Plarix matches every invoice against the parts, labor and time a job actually consumed, flags the gap, and stops underbilled work from shipping. Inside your existing software.",
    reads: [
      "The work order, the parts pulled and the labor logged against it",
      "The invoice that went out, line by line",
      "Your pricebook, and the agreement or warranty terms that job fell under",
    ],
    does: [
      "Compares what was consumed against what was billed, on every job",
      "Flags underbilled work before the invoice leaves",
      "Flags overbilled work before the customer finds it",
      "Routes anything ambiguous to the person who should make the call",
    ],
    gives: [
      "A weekly list of jobs where the paperwork and the reality diverged",
      "Revenue recovered from work that was completed and quietly undercharged",
      "Fewer billing disputes, because fewer invoices are wrong",
    ],
    why: "Most shops assume this gap is small. It is the first thing the count measures, and it usually is not.",
  },
  {
    slug: "purchasing-and-vendor-credits",
    id: "purchasing",
    name: "Purchasing and vendor credits",
    short: "Catches pricing errors, open returns and unused credits before they age out.",
    detail:
      "Supply house pricing moves, returns sit on the counter, and credits expire on a schedule nobody tracks. It reconciles what you were quoted against what you were charged, keeps a live list of what is owed back to you, and files the return before the window closes.",
    metaTitle: "Purchasing reconciliation and vendor credit recovery for contractors",
    metaDescription:
      "Plarix reconciles supply house invoices against quoted pricing, tracks open returns and unused vendor credits, and files before the window closes.",
    reads: [
      "Purchase orders, supplier invoices and the pricing you were actually quoted",
      "Parts returned, parts still on the truck, and parts never used",
      "Open credit memos and their expiry terms",
    ],
    does: [
      "Reconciles every supplier invoice against the agreed price",
      "Disputes the difference where there is one, with the documentation attached",
      "Keeps a live register of credits owed to you and when each one expires",
      "Files returns inside the vendor's window rather than after it",
    ],
    gives: [
      "A standing number for what your suppliers currently owe you",
      "Pricing errors caught in the same week they happen, not at year end",
      "Credits used instead of expired",
    ],
    why: "Nobody in a busy shop has time to audit a supply house invoice line by line. This does, every time.",
  },
  {
    slug: "permits-licensing-and-compliance",
    id: "compliance",
    name: "Permits, licensing and compliance",
    short: "Files the paperwork that stops jobs, and renews it before it lapses.",
    detail:
      "Permit applications, inspection scheduling, certificate of insurance requests, license and registration renewals across every jurisdiction you work in. It knows what each one needs and when, and it files early rather than on the day a crew is standing in a driveway.",
    metaTitle: "Permit filing and compliance automation for home services companies",
    metaDescription:
      "Plarix files permits, schedules inspections, handles certificate of insurance requests and renews licenses across every jurisdiction a contractor works in, before anything lapses.",
    reads: [
      "Scheduled and sold jobs, and the jurisdiction each one falls in",
      "Which permit type that scope of work requires in that jurisdiction",
      "Your licenses, registrations and insurance certificates, and their expiry dates",
    ],
    does: [
      "Prepares and files the permit application as soon as the job is sold",
      "Books the inspection and puts it on the right calendar",
      "Sends certificates of insurance when a general contractor or property manager asks",
      "Starts every license and registration renewal well before it lapses",
    ],
    gives: [
      "Crews that are not standing in a driveway waiting on a permit",
      "A single view of what is filed, what is pending and what is expiring",
      "Renewals that happen early, not the week they run out",
    ],
    why: "A permit is the cheapest possible reason to lose a day of a crew's time.",
  },
  {
    slug: "technician-pay-and-commissions",
    id: "pay",
    name: "Technician pay and commissions",
    short: "Reconciles spiffs, commissions and bonuses against the jobs that earned them.",
    detail:
      "Manufacturer spiffs that never get matched to the tech who earned them. Commission math done by hand at the end of a long week. It calculates from the job record, shows the work, and flags anything that does not add up before payroll runs, not after a tech notices.",
    metaTitle: "Technician commission and spiff reconciliation for contractors",
    metaDescription:
      "Plarix calculates technician commissions, spiffs and bonuses from the job record, shows the working, and flags discrepancies before payroll runs rather than after.",
    reads: [
      "Jobs closed by each technician and what was sold on them",
      "Your commission and bonus structure, including its exceptions",
      "Manufacturer spiff programs currently running, and who qualified",
    ],
    does: [
      "Calculates each technician's pay from the job record rather than from memory",
      "Matches manufacturer spiffs to the technician who actually earned them",
      "Flags anything that does not reconcile before payroll closes",
      "Shows the working, so a disagreement is settled by looking rather than arguing",
    ],
    gives: [
      "Payroll that is right the first time",
      "Spiff money reaching the person who earned it",
      "One fewer reason for a good technician to start looking around",
    ],
    why: "Pay disputes cost more in trust than they ever do in dollars.",
  },
  {
    slug: "memberships-and-service-agreements",
    id: "memberships",
    name: "Memberships and service agreements",
    short: "Keeps recurring revenue from quietly falling off the books.",
    detail:
      "Agreements that lapse without anyone noticing. Visits owed and never scheduled. Cards that expired three months ago. It tracks every agreement against what has actually been delivered and what has actually been collected, and surfaces the ones about to go.",
    metaTitle: "Service agreement and membership retention automation for home services",
    metaDescription:
      "Plarix tracks every service agreement against visits delivered and payments collected, catches failed cards and lapsing renewals, and surfaces what is about to churn.",
    reads: [
      "Every active agreement, its terms, and what it entitles the customer to",
      "Visits delivered against visits owed",
      "Payment status, including cards that have quietly stopped working",
    ],
    does: [
      "Flags agreements approaching renewal early enough to do something about it",
      "Surfaces owed visits that were never scheduled",
      "Catches failed and expiring payment methods before the agreement dies",
      "Builds the outreach list, in priority order, for whoever owns the call",
    ],
    gives: [
      "Recurring revenue that stays on the books",
      "A real number for agreements at risk this month",
      "Visits delivered, which is the whole reason the agreement renews",
    ],
    why: "Recurring revenue is the most valuable thing a home services company owns, and the easiest to lose by accident.",
  },
] as const;

export const afterTheCall = {
  heading: "The call gets answered. Then the real work starts.",
  body: [
    "Every job leaves a trail behind it. A claim to file. A part to credit. An invoice that does not match the work. A permit to close out. A rebate with a deadline nobody wrote down.",
    "None of it is hard. All of it is constant. And it is the first thing to slip when the schedule is full and you are down two techs.",
  ],
  pivot:
    "Almost every AI sold to this industry answers phones and books jobs. That is the front door. The cost is behind it.",
  trail: [
    { label: "Job closed", state: "done" },
    { label: "Part replaced under warranty", state: "done" },
    { label: "Claim eligible", state: "done" },
    { label: "Filing window open", state: "stalled" },
    { label: "Filed", state: "pending" },
    { label: "Paid", state: "pending" },
  ],
} as const;

export const method = {
  heading: "Count. Build. Prove.",
  intro:
    "We do not start with a demo, because a demo is a story about someone else's shop. We start with your numbers.",
  steps: [
    {
      verb: "Count",
      time: "Week one",
      body: "We read your real data first. Jobs, invoices, parts, payouts. You get a count of what is actually sitting there, in your numbers, before you decide anything. If we find nothing worth doing, we say so and you owe us nothing.",
      detail:
        "The count needs about twenty minutes of your time and read access to roughly the last ninety days. Nothing is installed and nothing is changed. What comes back is a written figure for each process we looked at, with the jobs behind it listed so you can check any line yourself.",
    },
    {
      verb: "Build",
      time: "Weeks two to six",
      body: "We build the narrow thing that handles exactly what we found. It runs against the systems you already have. Nobody learns a new screen. A person stays in the loop wherever real money or your name is on the line.",
      detail:
        "We scope to what the count found and nothing else. The build reads through the integrations your existing software already exposes. Your pricebook is not rebuilt, your data is not migrated, and your team is not retrained. You approve the scope before any of it starts.",
    },
    {
      verb: "Prove",
      time: "Every month after",
      body: "One page. What it ran, what it recovered, what it saved. Before and after, in dollars, the same way you would measure a tech. If the number stops being worth the fee, you cancel.",
      detail:
        "The report is one page because a report nobody reads is not proof. It carries the count from before we started, the running total since, and the specific items behind both, so every figure on it can be traced back to a job.",
    },
  ],
} as const;

/** The artifact the Prove step produces. Structure is real; the figures are an example. */
export const report = {
  heading: "Then we show you the page.",
  body: "Every month you get one page. Not a dashboard, not a login, not a screen you have to remember exists. The number that matters, the work behind it, and the reason for anything that did not go through.",
  disclaimer: "Illustrative layout. Every figure on a real report traces back to a specific job in your own data.",
  period: "Example month",
  headline: { label: "Recovered this month", value: "$18,420" },
  rows: [
    { label: "Claims filed", value: "184" },
    { label: "Approved", value: "151" },
    { label: "Still open", value: "24" },
    { label: "Rejected, with reason", value: "9" },
    { label: "Hours nobody spent on this", value: "61" },
  ],
} as const;

export const start = {
  heading: "We start where the math is undeniable.",
  body: [
    "For most shops the first process we run is the money your manufacturers already owe you. Warranty labor on parts you replaced and ate the cost of. Rebates with deadlines. Credits nobody had time to chase.",
    "We start there because the result is a number, and the number either exists or it does not. There is no arguing with a deposit.",
    "Then we take the next process. Then the one after that.",
  ],
  aside: {
    heading: "Why this one first",
  },
} as const;

export const refusals = {
  heading: "What we will never do.",
  intro:
    "You have been sold software before. Some of it did not go well. So these are in writing, and they do not change.",
  items: [
    {
      never: "Lock you into a long contract.",
      because: "If we are not worth keeping month to month, we do not deserve to be kept.",
    },
    {
      never: "Replace anyone on your team.",
      because:
        "We automate paperwork, not people. If a role changes it is because that person got freed up for better work.",
    },
    {
      never: "Record or score your technicians.",
      because: "Nothing we build goes in the field, listens to a call, or makes anyone feel watched.",
    },
    {
      never: "Make you migrate your data.",
      because: "No rebuilt pricebook, no retraining, no cutover weekend. We read what is already there.",
    },
    {
      never: "Promise a number we have not proven on your data.",
      because: "Every figure we give you starts with your own count, never an industry average.",
    },
    {
      never: "Become the platform you have to run.",
      because:
        "Whatever you already run on, we sit beside it. Not on top of it, and not instead of it.",
    },
  ],
} as const;

export const pricing = {
  heading: "Compare us to a hire, not to software.",
  tiers: [
    {
      name: "The count",
      price: "Free",
      body: "We read your last 90 days and hand you a real number for what is sitting there. About twenty minutes of your time and read access. No pitch attached.",
      note: "If there is nothing worth doing, we tell you.",
      featured: false,
    },
    {
      name: "The build",
      price: "Scoped to what we found",
      body: "A one time fee for building the process, priced against the count, not a rate card. Live in weeks. You approve the scope before anything starts.",
      note: "No implementation fee for software you have not seen work.",
      featured: true,
    },
    {
      name: "Running it",
      price: "Monthly, cancel anytime",
      body: "A flat monthly fee to keep the process running, monitored and current as manufacturers change their rules. For a limited period, a share of what we actually recover.",
      note: "No contract. No notice period.",
      featured: false,
    },
  ],
  /** Comparison table. Every figure here is sourced, not estimated. */
  comparison: {
    heading: "Three ways to handle this work",
    columns: ["Hire a coordinator", "Keep absorbing it", "Plarix"],
    rows: [
      {
        label: "Cost to start",
        values: ["$45,000 to $110,000 a year, fully loaded", "Nothing visible, which is the problem", "Free count, then a scoped build fee"],
      },
      {
        label: "Time to running",
        values: ["Weeks to recruit, months to get good", "Already happening", "Live in weeks"],
      },
      {
        label: "Covers how much",
        values: ["One person's working hours", "Whatever is left after the real work", "Every eligible job, every time"],
      },
      {
        label: "What happens when they leave",
        values: ["You start over", "Nothing changes", "Nothing changes"],
      },
      {
        label: "Commitment",
        values: ["A salary", "None", "Monthly, cancel anytime"],
      },
    ],
  },
  reference:
    "For reference, the platform most shops already run on publishes nothing. The going rate in this category is $245 to $500 per technician per month, $5,000 to $50,000 to implement, on a 12 to 36 month contract. We publish ours because you should be able to do the math before you talk to anyone.",
} as const;

export const company = {
  heading: "We are the third option.",
  lede:
    "A home services company with money sitting unclaimed has had two choices. Absorb it, the way most shops have absorbed warranty labor for years. Or hire someone to chase it full time. We built the third one.",
  sections: [
    {
      h: "What we actually are",
      p: [
        "Plarix is an AI integration company. We build agentic process automation for home services: software that reads a business's real systems, makes decisions inside a real process, and does the work end to end.",
        "We engineer from the business process first rather than from a model or a chat window. That order matters. Most of what is sold as AI in this industry is a general purpose tool pointed at a specific job. We do the opposite. We take one specific job, understand exactly how it runs in a real shop, and build the narrow thing that finishes it.",
      ],
    },
    {
      h: "Why home services",
      p: [
        "Because the work is real, the money is countable, and almost nobody is doing it. The AI being sold into this industry answers phones and books jobs. That is the front office, and it is crowded. Everything after the call is not.",
        "And because this industry has been sold badly for a long time. Six month onboardings. Five figure implementation fees. Contracts that run two or three years. An owner who has been through one of those does not need a better pitch. He needs someone to hand him a number and then leave him alone.",
      ],
    },
    {
      h: "Why warranty claims first",
      p: [
        "Because it is the cleanest possible proof. The result is a figure, and a figure either exists or it does not. There is no arguing with a deposit.",
        "But warranty claims are not the business. Underneath every trade, there is a bureaucratic counterparty sitting on money it technically owes and has made deliberately hard to collect. Manufacturers, on claims and rebates. Suppliers, on credits and returns. Jurisdictions, on permits. We are the layer that goes and collects what institutions make hard to collect. Warranty is simply the fastest place to start proving it.",
      ],
    },
  ],
  beliefs: [
    "Every dollar owed to a small business and never collected is a kind of theft. Quiet, legal, and completely preventable.",
    "The companies running this country's homes and comfort systems deserve tools as simple as the trade they are in.",
    "Software should give people back their time, not ask for more of it.",
    "Proof beats promises. Every time, with no exceptions.",
    "The owner who built this with his hands should not have to become a technology person to keep what is his.",
    "If it takes more than one sitting to turn on, it is not finished.",
  ],
} as const;

export const closing = {
  heading: "Start with the count.",
  body: "Twenty minutes and read access to your data. We come back with a real number for what is sitting there unclaimed, unreconciled or unfiled. Then you decide whether any of it is worth doing.",
  disclosure: "No contract to sign for this. Nothing to install. If we find nothing, we will say so.",
} as const;

export const faqs = [
  {
    q: "What does Plarix do?",
    a: "Plarix builds operational AI for home services companies. It runs the back office processes a job leaves behind, inside the field service software you already use. Warranty and rebate recovery, invoice reconciliation, vendor credits, permits, technician pay and membership renewals. No migration, no new screen for your team, no long contract.",
  },
  {
    q: "Is this an AI company?",
    a: "Yes, though we almost never lead with it. You do not hire a plumber because he runs copper instead of PEX, you hire him because the basement stops flooding. We build software that reads your systems, makes decisions inside a real process, and does the work. What it is called matters less than what shows up in your account.",
  },
  {
    q: "Do I have to leave ServiceTitan, Jobber or FieldEdge?",
    a: "No. Those run your business and they should keep running it. We run the work your business produces afterward. We read what is already in there. That is the whole ask.",
  },
  {
    q: "Will this replace someone on my payroll?",
    a: "No, and we put that in writing. It takes the paperwork nobody has time for. Your office manager stops doing data entry at ten at night and goes back to the parts of the job that need a person.",
  },
  {
    q: "We already have someone doing this.",
    a: "Good. Let us run the count anyway and show you what is still slipping through. Most of the time it runs alongside that person rather than instead of them.",
  },
  {
    q: "How long until it is actually running?",
    a: "The count takes about a week. The first process is usually live inside six weeks. If anyone quotes you a six month onboarding for something like this, they are building the wrong thing.",
  },
  {
    q: "What does the count cost?",
    a: "Nothing but about twenty minutes of your time and read access to your last 90 days. There is no version of this where you owe us money before you have seen a number.",
  },
  {
    q: "What does Plarix cost?",
    a: "The count is free. The build is a one time fee scoped to what the count actually found, not a rate card. Running it is a flat monthly fee you can cancel any time, plus, for a limited period, a share of what we recover. We ask you to compare that to a hire, which runs $45,000 to $110,000 a year fully loaded, rather than to a software subscription.",
  },
  {
    q: "Only HVAC and plumbing?",
    a: "Those are where we started and where we are deepest. Electrical, roofing and the rest of home services have the same shape, and the same processes sitting unrun. If you are one of them, the count still works.",
  },
  {
    q: "What if you find nothing?",
    a: "Then we tell you, and you owe us nothing. That is not a guarantee we are proud of, it is just what counting honestly looks like.",
  },
  {
    q: "Do you record or score technicians?",
    a: "No, and we never will. Nothing we build goes in the field, listens to a call, or scores anybody. That fight already happened at bigger companies than us and we know which side of it we are on.",
  },
  {
    q: "What data do you need access to?",
    a: "Read access to your field service platform, and where relevant your accounting system and supplier portals. Read access only for the count. Nothing is installed, nothing is migrated, and nothing is changed.",
  },
] as const;

export const journal = [
  {
    slug: "the-clock-on-a-warranty-claim",
    title: "The clock on a warranty claim",
    dek: "Every claim has a filing window, and the window starts before anyone in your office knows the job exists.",
    date: "2026-08-04",
    readingMinutes: 4,
    body: [
      {
        h: null,
        p: [
          "A technician replaces a compressor under warranty on a Tuesday. He is paid for that Tuesday. The part is covered, so the customer is not charged for it. Everyone involved considers the job finished.",
          "It is not finished. The manufacturer owes labor reimbursement on that job, and that obligation has a clock on it. The clock started Tuesday.",
        ],
      },
      {
        h: "Where the time actually goes",
        p: [
          "Most manufacturers set a filing window measured in days from the service date rather than from the date anyone got around to the paperwork. The exact number varies by manufacturer, by program, and sometimes by dealer tier, which is the first reason this is hard to keep in anyone's head.",
          "The second reason is that the window is rarely the only requirement. A claim usually needs the equipment registered, the serial number matched, the failure coded correctly, and the part either returned or documented. Miss any one of those and the claim is rejected, and the rejection does not reset the clock.",
          "So the real deadline is not the filing deadline. It is the filing deadline minus however long it takes to gather four things from three systems.",
        ],
      },
      {
        h: "Why it slips",
        p: [
          "It slips because nothing in the shop is designed to notice. The work order closes. The technician moves to the next call. The office manager is reconciling yesterday. There is no screen anywhere that turns red.",
          "And it slips quietly. An unfiled claim does not generate a complaint, a phone call, or a line on a report. It generates nothing at all. That is precisely what makes it expensive.",
        ],
      },
      {
        h: "What to do about it today",
        p: [
          "Without changing anything, you can find out how big this is. Pull your closed work orders for the last ninety days. Filter to jobs where a part was replaced under warranty. Compare that list against the claims you actually filed.",
          "The difference is your number. You do not need us to run that comparison, and we would rather you knew it either way.",
        ],
      },
    ],
  },
  {
    slug: "the-invoice-and-the-job-are-not-the-same-document",
    title: "The invoice and the job are not the same document",
    dek: "Every job produces a paper version and a real version. The gap between them is where margin goes.",
    date: "2026-08-19",
    readingMinutes: 4,
    body: [
      {
        h: null,
        p: [
          "A job is sold from an estimate. It is performed against reality. It is billed from whichever of those two the person doing the billing had in front of them.",
          "Most of the time those match closely enough that nobody looks. The times they do not are not evenly distributed, and they are not random.",
        ],
      },
      {
        h: "The four places the gap opens",
        p: [
          "A part pulled from the truck and never logged. The job consumed it, the invoice never saw it, and the inventory count quietly disagrees with the shelf.",
          "Labor that ran long for a real reason. The estimate said two hours, the job took four, and nobody wanted to have the conversation so the invoice said two.",
          "A change made verbally in a driveway. The customer asked for something extra, the technician did it, and it exists nowhere in writing.",
          "An agreement or warranty applied by habit rather than by terms. The discount was given because it usually is, not because this job qualified for it.",
        ],
      },
      {
        h: "Why it does not show up in the numbers",
        p: [
          "Because the jobs still close and the invoices still get paid. Underbilling does not create a dispute. It creates a slightly smaller deposit than the one you earned, on a job you have already stopped thinking about.",
          "Overbilling is the opposite problem with the same cause. It does create disputes, weeks later, when the margin is already booked and the customer is already annoyed.",
        ],
      },
      {
        h: "The cheap version of the fix",
        p: [
          "Pick twenty closed jobs from last month at random. Not your biggest, not your worst, random. Put the work order and the invoice side by side and read them against each other.",
          "Most owners who do this find something on more of the twenty than they expected. The exercise takes an afternoon once. The problem it finds happens every week.",
        ],
      },
    ],
  },
  {
    slug: "we-almost-never-say-the-word-ai",
    title: "We almost never say the word AI",
    dek: "Not because we are not one. Because the word has stopped carrying information for the person we are talking to.",
    date: "2026-09-02",
    readingMinutes: 3,
    body: [
      {
        h: null,
        p: [
          "Plarix is an AI company. We build software that reads real systems, makes decisions inside a real process, and completes work end to end. That is what the technology is and we are not shy about it.",
          "We just do not lead with it, and it is worth explaining why, because the reason is not modesty.",
        ],
      },
      {
        h: "The word stopped meaning anything",
        p: [
          "Every vendor selling into home services right now is saying it, about everything. When a word is attached to every product in a category, it no longer separates any of them. To an owner who has spent thirty years learning to be careful about what he is sold, an industry where everyone says the same word reads as noise, not as signal.",
          "There is a second problem. This particular buyer has already been shown a version of AI he did not like: a recording feature that turned into scoring his technicians, and a dispatcher whose job quietly disappeared. That is the association the word carries into the room. We are not walking into it voluntarily.",
        ],
      },
      {
        h: "What we say instead",
        p: [
          "We say what it does. It reads your closed jobs. It finds the claims you are still owed. It files them. It tracks them until they are paid or somebody explains why not.",
          "Nobody hires a plumber because he runs copper instead of PEX. They hire him because the basement stops flooding. The pipe is the plumber's problem. The basement is the conversation.",
        ],
      },
      {
        h: "Where the word does belong",
        p: [
          "In a conversation about how it works, with someone who wants to know. On a page like this one. In an answer to a direct question, which is exactly where we put it: yes, this is an AI company.",
          "What we will not do is use it as the pitch. The pitch is the number we hand you at the end of the count.",
        ],
      },
    ],
  },
] as const;

export type Process = (typeof processes)[number];
export type JournalPost = (typeof journal)[number];
