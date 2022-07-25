const track = (event, data = {}, depth = 0) => {
  if (typeof window === 'undefined' || !window.gtag) {
    if (depth < 5) {
      setTimeout(() => track(event, data, depth + 1), 5000);
    }
    return;
  }

  gtag('event', event, data);
};

export default track;
