import { useState, useEffect } from 'react';

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({});

  const resize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  useEffect(() => {
    resize();
  }, []);

  return windowSize;
};

export default useWindowResize;
