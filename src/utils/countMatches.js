/**
 * Counts the number of matches of a search term in a given text
 * @param {string} text - The text to search in
 * @param {string} query - The term to search for
 * @returns {number} - The number of matches found
 */
export const countMatches = (text, query) => {
  if (!query.trim()) {
    return 0;
  }
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};
