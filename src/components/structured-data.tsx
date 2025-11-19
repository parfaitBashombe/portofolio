"use client";

import { siteMetadata } from "@/lib/metadata";

export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMetadata.author.name,
    jobTitle: "Front-End & Website Developer",
    url: siteMetadata.url,
    email: siteMetadata.author.email,
    sameAs: [
      siteMetadata.author.github,
      siteMetadata.author.linkedin,
    ],
    knowsAbout: siteMetadata.keywords,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.title,
    url: siteMetadata.url,
    description: siteMetadata.description,
    author: {
      "@type": "Person",
      name: siteMetadata.author.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
