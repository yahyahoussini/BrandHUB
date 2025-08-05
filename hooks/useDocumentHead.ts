import { useEffect } from 'react';

interface LinkTag {
  rel: string;
  href: string;
  hreflang?: string;
}

interface ScriptTag {
  type: string;
  innerHTML: string;
}

interface DocumentHeadProps {
  title: string;
  description: string;
  links?: LinkTag[];
  script?: ScriptTag;
}

/**
 * A custom hook to dynamically update the document's head for SEO.
 * Manages the document title, meta description, link tags (for hreflang),
 * and a script tag (for structured data).
 *
 * @param {DocumentHeadProps} props - The SEO properties for the page.
 */
export const useDocumentHead = ({ title, description, links = [], script }: DocumentHeadProps) => {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set link tags
    const existingLinks = document.querySelectorAll('link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());

    links.forEach(linkInfo => {
      const link = document.createElement('link');
      link.setAttribute('rel', linkInfo.rel);
      link.setAttribute('href', linkInfo.href);
      if (linkInfo.hreflang) {
        link.setAttribute('hreflang', linkInfo.hreflang);
      }
      document.head.appendChild(link);
    });

    // Set script tag
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    if (script) {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', script.type);
      scriptElement.innerHTML = script.innerHTML;
      document.head.appendChild(scriptElement);
    }

  }, [title, description, links, script]);
};
