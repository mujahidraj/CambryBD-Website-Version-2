'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/app/loading'; // Reusing your beautiful loading screen!

export default function NavigationLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hide loader when route changes completely (the pathname/searchParams updates)
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Intercept all link clicks globally to show loader early
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      
      // Look for the closest anchor tag in case user clicked an element inside the a tag
      const anchor = (e.target as HTMLElement).closest('a');
      
      if (!anchor) return;

      const href = anchor.href;
      if (!href) return;

      const url = new URL(href);
      
      // Only show loader for internal Next.js route navigations
      // that are NOT same-page anchors/hashes, and NOT opening in a new tab
      if (
        url.origin === window.location.origin && 
        url.pathname !== window.location.pathname &&
        anchor.target !== '_blank' &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        setIsLoading(true);
      }
    };

    // Attach to document to catch all link clicks
    document.addEventListener('click', handleAnchorClick, true);

    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[10000]">
      <LoadingScreen />
    </div>
  );
}
