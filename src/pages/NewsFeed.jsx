import React from "react";
import NewsFeedRoot from "../components/news-emergent/NewsFeed";

// /news — the live feed aggregator built in the emergent workspace.
// NewsFeedRoot is fully self-contained (sidebar, signal scanner, mock dataset,
// live-price context via CoinGecko, and scoped styles in news-emergent/news.css).
// The .news-page wrapper namespaces those styles so they can't leak site-wide.
export default function NewsFeed() {
  return (
    <div className="news-page">
      <NewsFeedRoot />
    </div>
  );
}
