import React, { useState, useEffect, use } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../services/AuthService";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken());
  const [user,setUser]=useState(null)
  const navigate = useNavigate();

 useEffect(() => {
    setIsLoggedIn(checkToken());
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser){
      setUser(storedUser);
    }
    }, [window.location.pathname]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: "#a3c8a3",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "10px 0"
      }}
    >
      <Container
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        {/* Liens */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Nav.Link onClick={()=>{navigate("/apropos")}} style={{ margin: "0 10px", color: "#3c5a76" }}>
              À propos
            </Nav.Link>
            <Nav.Link onClick={()=>{navigate("/mariages")}} style={{ margin: "0 10px", color: "#3c5a76" }}>
              Mariages
            </Nav.Link>
            <Nav.Link onClick={()=>{navigate("/seances")}} style={{ margin: "0 10px", color: "#3c5a76" }}>
              Séances Photo
            </Nav.Link>
            <Nav.Link onClick={()=>{navigate("/galeries")}} style={{ margin: "0 10px", color: "#3c5a76" }}>
              Galeries Public
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link onClick={()=>{navigate("/galeriePrivee")}} style={{ margin:"0  10px", color: "#3c5a76" }}>
                Galeries Privées
                </Nav.Link>
            )}

            {/* Logo */}
            <img
              src="/public/logo.png"
              alt="Logo"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                objectFit: "contain",
                margin: "0 15px"
              }}
            />

            <Nav.Link onClick={()=>{navigate("/photobooth")}} style={{ margin: "0 10px", color: "#3c5a76" }}>
              Photobooth
            </Nav.Link>
            <Nav.Link onClick={()=>{navigate("/contact")}} style={{ margin: "0 10px", color: "#3c5a76" }}> 
              Contact
            </Nav.Link>
            <Nav.Link onClick={()=>{navigate("/temoignages")}} style={{ margin: "0 10px", color: "#3c5a76" }}>
              Témoignages
            </Nav.Link>
            {isLoggedIn && user?.role ==="admin"&&(
              <Nav.Link onClick={()=>{navigate("/adminPage")}} style={{ margin: "0 10px", color: "#3c5a76"}}>Réserver ADMIN</Nav.Link>
            )}

            {/* Bouton Connexion/Déconnexion */}
            {isLoggedIn ? (
              <Nav.Link
                
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                  navigate("/connexion");
                }}
                style={{
                  margin: "0 10px",
                  color: "#fff",
                  backgroundColor: "#dc3545",
                  padding: "5px 15px",
                  borderRadius: "5px"
                }}
              >
                Déconnexion
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => navigate("/connexion")}
                style={{
                  margin: "0 10px",
                  color: "#fff",
                  backgroundColor: "#0d6efd",
                  padding: "5px 15px",
                  borderRadius: "5px"
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



