// Utility for generating and improving resume bullet points

const actionVerbs = [
  "Achieved",
  "Administered",
  "Coordinated",
  "Delivered",
  "Enhanced",
  "Executed",
  "Generated",
  "Implemented",
  "Increased",
  "Managed",
  "Maintained",
  "Operated",
  "Organized",
  "Processed",
  "Provided",
  "Resolved",
  "Served",
  "Streamlined",
  "Supervised",
  "Trained",
];

const metricsPrompts = [
  "How many customers did you serve daily?",
  "What was the dollar amount you handled?",
  "How many team members did you work with?",
  "What percentage improvement did you achieve?",
  "How much time did you save?",
];

export function generateBulletPoint(
  responsibility: string,
  jobTitle: string,
  metrics?: { number?: number; unit?: string }
): string {
  // Clean and normalize the input
  let bullet = responsibility.trim();

  // If it doesn't start with an action verb, add one
  const startsWithVerb = actionVerbs.some((verb) =>
    bullet.toLowerCase().startsWith(verb.toLowerCase())
  );

  if (!startsWithVerb) {
    // Suggest an appropriate verb based on common patterns
    const verb = suggestActionVerb(bullet, jobTitle);
    bullet = `${verb} ${bullet.charAt(0).toLowerCase()}${bullet.slice(1)}`;
  }

  // Add metrics if provided
  if (metrics?.number && metrics?.unit) {
    bullet = addMetricsToBullet(bullet, metrics.number, metrics.unit);
  }

  // Ensure proper punctuation
  if (!bullet.endsWith(".")) {
    bullet += ".";
  }

  // Capitalize first letter
  bullet = bullet.charAt(0).toUpperCase() + bullet.slice(1);

  return bullet;
}

function suggestActionVerb(responsibility: string, jobTitle: string): string {
  const lowerResp = responsibility.toLowerCase();
  const lowerTitle = jobTitle.toLowerCase();

  // Customer-facing roles
  if (
    lowerTitle.includes("cashier") ||
    lowerTitle.includes("server") ||
    lowerTitle.includes("retail")
  ) {
    if (lowerResp.includes("customer")) return "Provided";
    if (lowerResp.includes("transaction") || lowerResp.includes("payment")) return "Processed";
    if (lowerResp.includes("stock") || lowerResp.includes("inventory")) return "Maintained";
    if (lowerResp.includes("clean")) return "Maintained";
    return "Served";
  }

  // Delivery/warehouse roles
  if (
    lowerTitle.includes("driver") ||
    lowerTitle.includes("delivery") ||
    lowerTitle.includes("warehouse")
  ) {
    if (lowerResp.includes("deliver")) return "Delivered";
    if (lowerResp.includes("load") || lowerResp.includes("unload")) return "Processed";
    if (lowerResp.includes("route")) return "Coordinated";
    return "Executed";
  }

  // Food service
  if (lowerTitle.includes("cook") || lowerTitle.includes("chef") || lowerTitle.includes("food")) {
    if (lowerResp.includes("prepar")) return "Prepared";
    if (lowerResp.includes("cook")) return "Prepared";
    if (lowerResp.includes("clean") || lowerResp.includes("sanit")) return "Maintained";
    return "Executed";
  }

  // Default verbs
  if (lowerResp.includes("help")) return "Assisted";
  if (lowerResp.includes("answer")) return "Responded to";
  if (lowerResp.includes("train")) return "Trained";
  if (lowerResp.includes("manag")) return "Managed";
  if (lowerResp.includes("organiz")) return "Organized";

  return "Performed";
}

function addMetricsToBullet(bullet: string, number: number, unit: string): string {
  // Insert metrics naturally into the bullet point
  const patterns = [
    { keyword: "customer", insert: `${number}+ ${unit}` },
    { keyword: "transaction", insert: `$${number.toLocaleString()} in ${unit}` },
    { keyword: "team", insert: `${number}-person ${unit}` },
    { keyword: "daily", insert: `${number} ${unit} daily` },
  ];

  for (const pattern of patterns) {
    if (bullet.toLowerCase().includes(pattern.keyword)) {
      return bullet.replace(
        new RegExp(pattern.keyword, "i"),
        `${pattern.insert} ${pattern.keyword}`
      );
    }
  }

  // Default: append at the end before period
  const withoutPeriod = bullet.replace(/\.$/, "");
  return `${withoutPeriod}, handling ${number} ${unit}`;
}

export function improveBulletPoint(originalBullet: string): {
  improved: string;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let improved = originalBullet;

  // Check for weak language
  const weakWords = ["helped", "worked on", "responsible for", "duties included"];
  for (const weak of weakWords) {
    if (improved.toLowerCase().includes(weak)) {
      suggestions.push(`Replace "${weak}" with a stronger action verb`);
    }
  }

  // Check for missing metrics
  if (!/\d/.test(improved)) {
    suggestions.push("Add specific numbers to quantify your impact");
  }

  // Check for vague language
  if (improved.toLowerCase().includes("various") || improved.toLowerCase().includes("multiple")) {
    suggestions.push("Be more specific instead of using vague terms");
  }

  // Generate improved version
  improved = improved.replace(/helped/gi, "Assisted");
  improved = improved.replace(/worked on/gi, "Developed");
  improved = improved.replace(/responsible for/gi, "Managed");
  improved = improved.replace(/duties included/gi, "Executed");

  return { improved, suggestions };
}

export function suggestMetricsQuestions(responsibility: string): string[] {
  const questions: string[] = [];
  const lower = responsibility.toLowerCase();

  if (lower.includes("customer") || lower.includes("client") || lower.includes("guest")) {
    questions.push("How many customers/clients did you interact with daily or weekly?");
  }

  if (lower.includes("transaction") || lower.includes("sales") || lower.includes("revenue")) {
    questions.push("What was the average transaction value or total sales you handled?");
  }

  if (lower.includes("team") || lower.includes("train") || lower.includes("supervise")) {
    questions.push("How many team members did you work with or train?");
  }

  if (lower.includes("improv") || lower.includes("reduc") || lower.includes("increas")) {
    questions.push("What percentage improvement did you achieve?");
  }

  if (lower.includes("time") || lower.includes("efficient") || lower.includes("fast")) {
    questions.push("How much time did you save or how did you improve efficiency?");
  }

  if (questions.length === 0) {
    questions.push(
      "Can you add any numbers to show the scale of your work?",
      "What measurable impact did this have?"
    );
  }

  return questions;
}
