export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: "is-this-ai",
    question: "Is this AI?",
    answer:
      "We almost never lead with that word. You don't hire a plumber because he uses copper pipe. You hire him because your basement stops flooding. We use modern software to read manufacturer portals and file claims. Call it whatever you want.",
  },
  {
    id: "replace-team",
    question: "Will this replace someone on my team?",
    answer:
      "No. It picks up the paperwork nobody has time for. If a role changes, it's because that person got freed up for something better, never because they got replaced.",
  },
  {
    id: "already-have-someone",
    question: "I already have someone doing this.",
    answer:
      "Good. We show you what's still getting missed, and work alongside them.",
  },
  {
    id: "switch-platforms",
    question: "Do I need to switch off ServiceTitan, Jobber, or FieldEdge?",
    answer:
      "No. We sit beside whatever you already run. We read what's there. That's the whole ask.",
  },
  {
    id: "free-count-cost",
    question: "What does the free count actually cost me?",
    answer:
      "Your time, and nothing else. About twenty minutes and read access to your last 90 days of claims.",
  },
  {
    id: "find-nothing",
    question: "What if you don't find anything?",
    answer:
      "Then you don't pay us anything. That's not a guarantee. That's just what counting honestly looks like.",
  },
  {
    id: "data-access",
    question: "What data do you need access to?",
    answer:
      "Your job data from your FSM: job records, parts used, labor logged, serial numbers when available. We do not need access to your financials, your bank accounts, or your customer data beyond what is on the work order itself.",
  },
  {
    id: "how-long",
    question: "How long until we see money coming back?",
    answer:
      "It depends on the manufacturer. Some pay within 30 days of a clean claim submission. Others take 60–90 days. We start filing as soon as the free count is done, and we track every claim through to payment so you know exactly where each one stands.",
  },
]
