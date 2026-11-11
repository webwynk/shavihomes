declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Reports a conversion event to Google Ads.
 */
export const reportConversion = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-18293786997/6LgvCI2aqsocEPWSlJNE",
    });
    console.log("Google Ads conversion event reported successfully.");
  } else {
    console.warn("Google Ads gtag is not available on window.");
  }
};

/**
 * Reports the "Contact" conversion event to Google Ads, then navigates to `url`.
 */
export const reportContactConversion = (url?: string) => {
  const navigate = () => {
    if (url) {
      window.location.href = url;
    }
  };

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-18293786997/uGhACMr76M0cEPWSlJNE",
      event_callback: navigate,
    });
  } else {
    console.warn("Google Ads gtag is not available on window.");
    navigate();
  }
};
