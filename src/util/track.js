const track = (event, data = {}) => {
  if (typeof window === 'undefined' || !window.gtag) {
    setTimeout(() => track(event, data), 5000);
    return;
  }

  gtag('event', event, data);
};

export default track;
