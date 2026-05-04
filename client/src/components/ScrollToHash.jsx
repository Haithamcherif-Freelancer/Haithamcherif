import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      
      // Function to attempt the scroll
      const attemptScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!attemptScroll()) {
        // If not found, it might be mounting. Try a few times.
        const interval = setInterval(() => {
          if (attemptScroll()) {
            clearInterval(interval);
          }
        }, 100);

        // Stop trying after 2 seconds
        setTimeout(() => clearInterval(interval), 2000);
        return () => clearInterval(interval);
      }
    }
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
