import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectJsonLd(blocks: object[]) {
  const existing = document.head.querySelectorAll<HTMLScriptElement>('script[data-page-jsonld]');
  existing.forEach((s) => s.remove());
  blocks.forEach((block) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.pageJsonld = 'true';
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  });
}

export default function PageMeta({ title, description, canonical, jsonLd }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertCanonical(canonical);
    if (jsonLd?.length) injectJsonLd(jsonLd);
  }, [title, description, canonical]);

  return null;
}