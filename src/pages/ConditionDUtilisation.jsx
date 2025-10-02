import React from "react";

const ConditionsUtilisation = () => {
  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Conditions d'utilisation</h1>
      <ul>
        <li>Seuls les utilisateurs inscrits peuvent accéder aux galeries privées et à la location de photobooth.</li>
        <li>La publication de témoignages implique le consentement à leur diffusion.</li>
        <li>L’usage commercial ou diffusion de contenus privés sans autorisation est interdit.</li>
        <li>Le non-respect peut entraîner la suppression du compte.</li>
      </ul>
    </div>
  );
};

export default ConditionsUtilisation;