import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../services/AuthService";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken());
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(false); // <--- contrôle du menu burger
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(checkToken());
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, [window.location.pathname]);

  const handleNavClick = (path) => {
    navigate(path);
    setExpanded(false); // <--- ferme le menu après le clic
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={expanded} // <--- état contrôlé
      onToggle={(val) => setExpanded(val)}
      style={{
        backgroundColor: "#a3c8a3",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "10px 0",
      }}
    >
      <Container
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Brand onClick={() => handleNavClick("/")} style={{ cursor: "pointer" }}>
          <img
            src="/public/logo.png"
            alt="Logo"
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "50%",
              objectFit: "contain",
            }}
          />
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ display: "flex", alignItems: "center" }}>
            <Nav.Link onClick={() => handleNavClick("/apropos")} style={{ margin: "0 10px", color: "#3c5a76" }}>À propos</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/mariages")} style={{ margin: "0 10px", color: "#3c5a76" }}>Mariages</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/seances")} style={{ margin: "0 10px", color: "#3c5a76" }}>Séances Photo</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/galeries")} style={{ margin: "0 10px", color: "#3c5a76" }}>Galeries Public</Nav.Link>
            {isLoggedIn && (
              <Nav.Link onClick={() => handleNavClick("/galeriePrivee")} style={{ margin: "0 10px", color: "#3c5a76" }}>Galeries Privées</Nav.Link>
            )}
            <Nav.Link onClick={() => handleNavClick("/photobooth")} style={{ margin: "0 10px", color: "#3c5a76" }}>Photobooth</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/contact")} style={{ margin: "0 10px", color: "#3c5a76" }}>Contact</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/temoignages")} style={{ margin: "0 10px", color: "#3c5a76" }}>Témoignages</Nav.Link>
            {isLoggedIn && user?.role === "admin" && (
              <Nav.Link onClick={() => handleNavClick("/adminPage")} style={{ margin: "0 10px", color: "#3c5a76" }}>Réserver ADMIN</Nav.Link>
            )}

            {isLoggedIn ? (
              <Nav.Link
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  handleNavClick("/connexion");
                }}
                style={{
                  margin: "0 10px",
                  color: "#fff",
                  backgroundColor: "#d16d6d",
                  padding: "5px 15px",
                  borderRadius: "5px",
                }}
              >
                Déconnexion
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => handleNavClick("/connexion")}
                style={{
                  margin: "0 10px",
                  color: "#fff",
                  backgroundColor: "#3c5a76",
                  padding: "5px 15px",
                  borderRadius: "5px",
                }}
              >
                Connexion
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
