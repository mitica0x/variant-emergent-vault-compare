import React from "react";
import NewsFeed from "../components/news-emergent/NewsFeed";

// Renders the news feed built in the emergent workspace. NewsFeed is fully
// self-contained (own nav, sidebar, signal scanner, mock dataset, live-price
// context, and scoped styles in news-emergent/news.css). The .news-page
// wrapper namespaces those styles so they cannot leak into the rest of the site.
export default function News() {
  return (
    <div className="news-page">
      <NewsFeed />
    </div>
  );
}
