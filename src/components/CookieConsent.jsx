import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "#fff",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        flexWrap: "wrap",
      }}
    >
      <span>
        Nous utilisons des cookies pour améliorer votre expérience et analyser le
        trafic du site.
      </span>
      <button
        onClick={acceptCookies}
        style={{
          background: "#fff",
          color: "#333",
          border: "none",
          padding: "8px 15px",
          cursor: "pointer",
          borderRadius: "4px",
          marginTop: "5px",
        }}
      >
        Accepter
      </button>
    </div>
  );
};

export default CookieConsent;