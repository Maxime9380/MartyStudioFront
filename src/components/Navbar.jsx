import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../services/AuthService";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken());
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(checkToken());
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, [window.location.pathname]);

  const handleNavClick = (path) => {
    navigate(path);
    setExpanded(false);
  };

  const linkStyle = { margin: "0 10px", color: "#3c5a76" };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded}
      style={{
        backgroundColor: "#a3c8a3",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "15px 0",
      }}
    >
      <Container style={{ maxWidth: "1200px", width: "100%" }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex w-100 justify-content-between align-items-center">
            
            {/* Liens gauche */}
            <Nav className="d-flex align-items-center">
              <Nav.Link onClick={() => handleNavClick("/apropos")} style={linkStyle}>À propos</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/mariages")} style={linkStyle}>Mariages</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/seances")} style={linkStyle}>Séances Photo</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/galeries")} style={linkStyle}>Galeries Public</Nav.Link>
              {isLoggedIn && (
                <Nav.Link onClick={() => handleNavClick("/galeriePrivee")} style={linkStyle}>Galeries Privées</Nav.Link>
              )}
            </Nav>

            {/* Logo centré (visible uniquement en desktop) */}
            <Navbar.Brand
              onClick={() => handleNavClick("/")}
              className="mx-3 d-none d-lg-block"
              style={{ cursor: "pointer" }}
            >
              <img
                src="/public/logo.png"
                alt="Logo"
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />
            </Navbar.Brand>

            {/* Liens droite */}
            <Nav className="d-flex align-items-center">
              <Nav.Link onClick={() => handleNavClick("/photobooth")} style={linkStyle}>Photobooth</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/contact")} style={linkStyle}>Contact</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/temoignages")} style={linkStyle}>Témoignages</Nav.Link>
              {isLoggedIn && user?.role === "admin" && (
                <Nav.Link onClick={() => handleNavClick("/adminPage")} style={linkStyle}>Réserver ADMIN</Nav.Link>
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
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
