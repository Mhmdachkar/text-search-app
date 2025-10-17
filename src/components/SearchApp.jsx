import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "Understanding the difference between grid-template and grid-auto",
    date: "Oct 09, 2018",
    excerpt: "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns. Although I knew they were different, I didn't understand the fundamental reason why."
  },
  {
    id: 2,
    title: "CSS Grid Layout: The Fractional Unit",
    date: "Aug 15, 2018",
    excerpt: "The CSS Grid specification introduced a new unit called the fractional unit, or 'fr'. This unit allows you to divide the available space in a grid container into fractions, making it easy to create flexible layouts without having to calculate percentages."
  },
  {
    id: 3,
    title: "Getting Started with CSS Grid",
    date: "Jul 22, 2018",
    excerpt: "CSS Grid is a powerful layout tool that allows you to create two-dimensional layouts with ease. In this article, we'll explore the basics of CSS Grid and how to get started with this revolutionary layout method."
  },
  {
    id: 4,
    title: "Flexbox vs Grid: When to Use Each",
    date: "Jun 10, 2018",
    excerpt: "Flexbox and CSS Grid are both powerful layout tools, but they serve different purposes. Understanding when to use each one will help you write more efficient and maintainable CSS code."
  },
  {
    id: 5,
    title: "Advanced CSS Grid Techniques",
    date: "May 03, 2018",
    excerpt: "Once you've mastered the basics of CSS Grid, it's time to explore some advanced techniques. This article covers auto-fit, auto-fill, and other advanced grid features that can take your layouts to the next level."
  },
  {
    id: 6,
    title: "CSS Grid Template Areas",
    date: "Apr 18, 2018",
    excerpt: "Grid template areas provide a visual way to define your grid layout. Instead of specifying row and column numbers, you can name areas and place items within them, making your code more readable and maintainable."
  }
];

const countMatches = (text, query) => {
  if (!query.trim()) {
    return 0;
  }
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
};

const HighlightedText = ({ text, query }) => {
  if (!query.trim()) {
    return <span>{text}</span>;
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? 
          <mark key={i} className="bg-yellow-300 font-semibold">{part}</mark> : 
          <span key={i}>{part}</span>
      )}
    </span>
  );
};

export default function SearchApp() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) {
      return articles;
    }
    
    const lowerQuery = query.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Search</h1>
          <p className="text-slate-600">bitsofcode. Articles on Frontend Development</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {query.trim() && (
          <div className="mb-6">
            <p className="text-slate-600 font-medium">
              {results.reduce((total, article) => total + countMatches(article.title + ' ' + article.excerpt, query), 0)} matches found
            </p>
          </div>
        )}

        <div className="grid gap-6">
          {results.length > 0 ? (
            results.map(article => {
              const matchCount = countMatches(article.title + ' ' + article.excerpt, query);
              return (
                <article 
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200"
                >
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">
                    <HighlightedText text={article.title} query={query} />
                  </h2>
                  <p className="text-sm text-slate-500 mb-1">{article.date}</p>
                  {query.trim() && (
                    <p className="text-xs text-slate-500 mb-3">
                      {matchCount} {matchCount === 1 ? 'match' : 'matches'} found
                    </p>
                  )}
                  <p className="text-slate-700 leading-relaxed">
                    <HighlightedText text={article.excerpt} query={query} />
                  </p>
                </article>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No articles found matching "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
