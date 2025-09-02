import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#c8bcb3", // couleur similaire à ton image
        padding: "40px 20px 20px 20px",
      
      }}
    >
      <Container>
        <Row style={{display:"flex",justifyContent:"space-around", alignItems:"center"}}>
          {/* Colonne gauche */}
          <Col md={4} sm={12} style={{ marginBottom: "20px", color:" #3C5A76" }}>
            <h5 style={{ fontWeight: "bold" }}>Chez Marty Studio</h5>
            <p>Photographe</p>
            <p>Contact Chez Marty Studio</p>
            <p>Email: chezmartystudio@gmail.com</p>
            <p>Téléphone: 06 11 22 33 44</p>
          </Col>

          {/* Colonne milieu */}
          <Col md={4} sm={12} style={{ marginBottom: "20px" }}>
            <h5 style={{ fontWeight: "bold" }}>Plan du site</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="/apropos" style={{ textDecoration: "none", color: "#3C5A76" }}>À propos</a></li>
              <li><a href="/mariages" style={{ textDecoration: "none", color: "#3C5A76" }}>Mariage</a></li>
              <li><a href="/seances" style={{ textDecoration: "none", color: "#3C5A76" }}>Séances Photo</a></li>
              <li><a href="/evenements" style={{ textDecoration: "none", color: "#3C5A76" }}>Galeries</a></li>
              <li><a href="/photobooth" style={{ textDecoration: "none", color: "#3C5A76" }}>Photobooth</a></li>
              <li><a href="/contact" style={{ textDecoration: "none", color: "#3C5A76" }}>Contact</a></li>
                <li><a href="/temoignages" style={{ textDecoration: "none", color: "#3C5A76" }}>Témoignages</a></li>
                <li><a href="/connexion" style={{ textDecoration: "none", color: "#3C5A76" }}>Connexion</a></li>
            </ul>
          </Col>

          {/* Colonne droite */}
          <Col md={4} sm={12} style={{ marginBottom: "20px" }}>
            <h5 style={{ fontWeight: "bold" }}>Affichages obligatoires</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="#mentions" style={{ textDecoration: "none", color: "#3C5A76" }}>Mentions légales</a></li>
              <li><a href="#confidentialite" style={{ textDecoration: "none", color: "#3C5A76" }}>Politique de confidentialité</a></li>
            </ul>
          </Col>
        </Row>

        {/* Ligne copyright */}
        <Row>
          <Col className="text-center mt-4">
            <p style={{ fontSize: "0.9rem", margin: 0 }}>
              © {new Date().getFullYear()} Chez Marty Studio. Tous droits réservés.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;