import Script from 'next/script';

const GoogleAnalytics = () => (
  <>
    <Script defer async src="https://www.googletagmanager.com/gtag/js?id=G-ZV1JHW05R8" />
    <Script>
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());

          gtag('config', 'G-ZV1JHW05R8');
          gtag('event', 'page');
        `}
    </Script>
  </>
);

export default GoogleAnalytics;
