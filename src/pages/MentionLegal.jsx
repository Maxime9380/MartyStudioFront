import React from "react";

const MentionsLegales = () => {
  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Mentions légales</h1>
      <p><strong>Éditeur du site :</strong> Chez Marty Studio</p>
      <p><strong>Statut juridique :</strong> Auto-entrepreneur</p>
      <p><strong>Adresse :</strong> 123 Rue Exemple, 75000 Paris</p>
      <p><strong>Email :</strong> <a href="mailto:chezmartystudio@gmail.com">chezmartystudio@gmail.com</a></p>
      <p><strong>Téléphone :</strong> <a href="tel:+33611223344">06 11 22 33 44</a></p>
      <p><strong>Directeur de publication :</strong> Marty</p>
      <p><strong>Hébergeur :</strong> Nom de l’hébergeur, adresse, téléphone</p>
      <p><strong>Propriété intellectuelle :</strong> Tout le contenu du site (photos, textes, logos) est protégé par le droit d’auteur.</p>
    </div>
  );
};

export default MentionsLegales;