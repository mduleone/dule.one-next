import Script from 'next/script';

const GoogleAnalytics = () => {

  return (
    <>
      <Script defer async src="https://www.googletagmanager.com/gtag/js?id=G-ZV1JHW05R8" />
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(...args) {
            dataLayer.push(args);
          }
          window.gtag = gtag;
          gtag('js', new Date());

          gtag('config', 'G-ZV1JHW05R8');
          gtag('event', 'page');
          console.log('fire one');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
