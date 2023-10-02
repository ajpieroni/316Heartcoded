import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMatch = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addListener(handleMatch);
    handleMatch(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMatch);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
