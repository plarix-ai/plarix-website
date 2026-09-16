/**
 * Every word the site says, in one place.
 *
 * House rules, from the doctrine: short sentences, real trade vocabulary, a specific
 * number before an opinion, no em dashes, and none of the category's vocabulary
 * ("AI-powered", "agentic", "seamless", "revolutionize", "unlock", "cutting-edge").
 */

export const CONTACT_EMAIL = "hello@plarix.dev";

export const nav = [
  { label: "What we run", href: "/#processes" },
  { label: "How it works", href: "/#method" },
  { label: "Where we start", href: "/#start" },
  { label: "Pricing", href: "/#pricing" },
] as const;

export const hero = {
  facts: ["Your systems, unchanged", "Live in weeks", "No contract"],
  headline: "Everything after the call.",
  subhead:
    "Home services runs on what happens once the phone hangs up. Plarix builds the operational AI that does that work, inside the systems you already use.",
  primaryCta: { label: "Get your count", href: "/#count" },
  secondaryCta: { label: "How it works", href: "/#method" },
  rotatorLabel: "Processes we run",
};

/** The hero rotator and the processes section read from the same list. */
export const processes = [
  {
    id: "warranty",
    name: "Warranty and rebate recovery",
    short: "Reads your closed jobs, finds every claim you are still owed, files it, tracks it to paid.",
    detail:
      "Labor reimbursement on parts you already replaced. Manufacturer rebates with deadlines nobody wrote down. Dealer tier credits that lapse quietly. It checks eligibility against each manufacturer's rules, prepares the claim, files it through the right channel, and chases it until the money lands or someone tells you why it will not.",
  },
  {
    id: "reconciliation",
    name: "Invoice and job reconciliation",
    short: "Matches parts, labor and invoices against what actually happened on the job.",
    detail:
      "Every job produces a paper version and a real version, and they drift. This one reads both, flags the gap, and either corrects it or puts it in front of the one person who should decide. Underbilled jobs stop shipping. Overbilled ones stop coming back as disputes.",
  },
  {
    id: "purchasing",
    name: "Purchasing and vendor credits",
    short: "Catches pricing errors, open returns and unused credits before they age out.",
    detail:
      "Supply house pricing moves, returns sit on the counter, and credits expire on a schedule nobody tracks. It reconciles what you were quoted against what you were charged, keeps a live list of what is owed back to you, and files the return before the window closes.",
  },
  {
    id: "compliance",
    name: "Permits, licensing and compliance",
    short: "Files the paperwork that stops jobs, and renews it before it lapses.",
    detail:
      "Permit applications, inspection scheduling, certificate of insurance requests, license and registration renewals across every jurisdiction you work in. It knows what each one needs and when, and it files early rather than on the day a crew is standing in a driveway.",
  },
  {
    id: "pay",
    name: "Technician pay and commissions",
    short: "Reconciles spiffs, commissions and bonuses against the jobs that earned them.",
    detail:
      "Manufacturer spiffs that never get matched to the tech who earned them. Commission math done by hand at the end of a long week. It calculates from the job record, shows the work, and flags anything that does not add up before payroll runs, not after a tech notices.",
  },
  {
    id: "memberships",
    name: "Memberships and service agreements",
    short: "Keeps recurring revenue from quietly falling off the books.",
    detail:
      "Agreements that lapse without anyone noticing. Visits owed and never scheduled. Cards that expired three months ago. It tracks every agreement against what has actually been delivered and what has actually been collected, and surfaces the ones about to go.",
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
    },
    {
      verb: "Build",
      time: "Weeks two to six",
      body: "We build the narrow thing that handles exactly what we found. It runs against the systems you already have. Nobody learns a new screen. A person stays in the loop wherever real money or your name is on the line.",
    },
    {
      verb: "Prove",
      time: "Every month after",
      body: "One page. What it ran, what it recovered, what it saved. Before and after, in dollars, the same way you would measure a tech. If the number stops being worth the fee, you cancel.",
    },
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
    body: "There are 250 to 500 open warranty coordinator and claims administrator jobs in America right now, paying $45,000 to $110,000 a year fully loaded, to do work that is almost entirely filing the right paperwork on time. Somebody already decided this work is worth a salary. We are the other option.",
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
  intro:
    "A warranty coordinator costs $45,000 to $110,000 a year fully loaded, and needs a desk, training and a reason to stay. That is the number we ask you to hold us against.",
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
} as const;

export const closing = {
  heading: "Start with the count.",
  body: "Twenty minutes and read access to your data. We come back with a real number for what is sitting there unclaimed, unreconciled or unfiled. Then you decide whether any of it is worth doing.",
  disclosure: "No contract to sign for this. Nothing to install. If we find nothing, we will say so.",
} as const;

export const faqs = [
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
    q: "Only HVAC and plumbing?",
    a: "Those are where we started and where we are deepest. Electrical, roofing and the rest of home services have the same shape, and the same processes sitting unrun. If you are one of them, the count still works.",
  },
  {
    q: "What if you find nothing?",
    a: "Then we tell you, and you owe us nothing. That is not a guarantee we are proud of, it is just what counting honestly looks like.",
  },
] as const;
