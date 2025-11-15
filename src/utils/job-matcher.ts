// Utility for matching jobs and extracting keywords

export function extractKeywords(text: string): string[] {
  // Common job-related keywords and skills to extract
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "up", "about", "into", "through", "during",
    "before", "after", "above", "below", "between", "same", "will", "should",
    "could", "would", "may", "might", "must", "shall", "can", "need", "dare",
    "ought", "used", "be", "been", "being", "have", "has", "had", "do", "does",
    "did", "is", "are", "was", "were", "am", "this", "that", "these", "those",
    "we", "you", "they", "it", "he", "she", "i", "me", "him", "her", "us",
    "them", "my", "your", "his", "its", "our", "their", "what", "which", "who",
    "when", "where", "why", "how", "all", "each", "every", "both", "few", "more",
    "some", "any", "most", "other", "than", "then", "as", "if", "not", "no",
  ]);

  // Extract potential keywords
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));

  // Count frequency
  const wordCount = new Map<string, number>();
  words.forEach((word) => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });

  // Extract multi-word phrases (bigrams)
  const phrases: string[] = [];
  const textLower = text.toLowerCase();
  const commonPhrases = [
    "customer service",
    "attention to detail",
    "team player",
    "problem solving",
    "time management",
    "communication skills",
    "data entry",
    "cash handling",
    "food safety",
    "inventory management",
    "point of sale",
    "microsoft office",
    "google workspace",
    "high school diploma",
    "valid driver",
    "background check",
    "drug test",
    "lifting requirements",
    "standing for long",
    "fast-paced environment",
  ];

  commonPhrases.forEach((phrase) => {
    if (textLower.includes(phrase)) {
      phrases.push(phrase);
    }
  });

  // Get top keywords by frequency
  const sortedWords = Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);

  return [...new Set([...phrases, ...sortedWords])];
}

export function calculateMatchScore(
  userSkills: string[],
  userKeywords: string[],
  jobKeywords: string[]
): {
  score: number;
  matching: string[];
  missing: string[];
} {
  const userTerms = new Set([
    ...userSkills.map((s) => s.toLowerCase()),
    ...userKeywords.map((k) => k.toLowerCase()),
  ]);

  const jobTermsLower = jobKeywords.map((k) => k.toLowerCase());

  const matching: string[] = [];
  const missing: string[] = [];

  jobTermsLower.forEach((term) => {
    // Check for exact match or partial match
    const hasMatch = Array.from(userTerms).some(
      (userTerm) => userTerm.includes(term) || term.includes(userTerm)
    );

    if (hasMatch) {
      matching.push(term);
    } else {
      missing.push(term);
    }
  });

  // Calculate score (0-100)
  const score =
    jobTermsLower.length > 0
      ? Math.round((matching.length / jobTermsLower.length) * 100)
      : 0;

  return { score, matching, missing };
}

export function generateResumeSuggestions(
  missingKeywords: string[],
  userExperiences: string[]
): string[] {
  const suggestions: string[] = [];

  // Suggest adding missing skills if user has related experience
  const skillSuggestions: Record<string, string[]> = {
    "customer service": [
      "Consider highlighting any customer-facing experience",
      "Add metrics about customers served",
    ],
    "communication skills": [
      "Emphasize any presentation or written communication tasks",
      "Mention team collaboration experiences",
    ],
    "attention to detail": [
      "Highlight tasks requiring accuracy",
      "Mention quality control or error-checking responsibilities",
    ],
    "team player": [
      "Describe collaborative projects",
      "Mention cross-functional work",
    ],
    "problem solving": [
      "Add examples of issues you resolved",
      "Highlight process improvements you made",
    ],
  };

  missingKeywords.slice(0, 5).forEach((keyword) => {
    const lower = keyword.toLowerCase();
    if (skillSuggestions[lower]) {
      suggestions.push(...skillSuggestions[lower]);
    } else {
      suggestions.push(`Consider adding "${keyword}" to your skills if you have this experience`);
    }
  });

  // General suggestions
  if (missingKeywords.length > 5) {
    suggestions.push(
      "Add more specific technical skills mentioned in the job description",
      "Include relevant certifications or training"
    );
  }

  return suggestions.slice(0, 6);
}
