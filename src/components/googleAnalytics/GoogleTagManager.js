import React, { useEffect } from 'react';

const GoogleTagManager = () => {
  useEffect(() => {
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-Q67BNF2T8G');
  }, []);
  const trackLogin = (userData) => {
    window.dataLayer.push({
      event: 'login',
      userData: userData
    });
  };

  return <></>;
};

export default GoogleTagManager;
