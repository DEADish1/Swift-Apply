export function computeMatchScore(
  resumeText: string,
  jobDescription: string
): {
  score: number;
  matched: string[];
  missing: string[];
} {
  const normalizedResume = resumeText.toLowerCase();
  const normalizedJob = jobDescription.toLowerCase();

  // Extremely naive: split on non-letters and dedupe
  const words = Array.from(
    new Set(normalizedJob.split(/[^a-z0-9]+/).filter(Boolean))
  );

  const important = words.filter((w) => w.length > 4); // ignore tiny words
  const matched: string[] = [];
  const missing: string[] = [];

  for (const word of important) {
    if (normalizedResume.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  }

  const score = important.length
    ? Math.round((matched.length / important.length) * 100)
    : 0;

  return { score, matched, missing };
}
