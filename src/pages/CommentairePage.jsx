import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const CommentairesPage = () => {
  const [commentaires, setCommentaires] = useState([]);
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const couleursBulle = ["#a3c8a3", "#f5c27a", "#f7a6a6", "#9bc1f5", "#d7a3f5"];

  const fetchCommentaires = async () => {
    try {
      setError(null);
      const res = await axios.get("http://localhost:3000/api/commentaires");
      const data = Array.isArray(res.data) ? res.data : [];

      // on attribue une couleur aléatoire à chaque commentaire au moment du fetch
      const dataAvecCouleurs = data.map((c) => ({
        ...c,
        couleur: couleursBulle[Math.floor(Math.random() * couleursBulle.length)],
      }));

      setCommentaires(dataAvecCouleurs);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des commentaires.");
      setCommentaires([]);
    }
  };

  useEffect(() => {
    fetchCommentaires();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contenu.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:3000/api/createcommentaire",
        { contenu },
        { headers: { Authorization: token } }
      );
      setContenu("");
      fetchCommentaires();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'envoi du commentaire.");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (user?.role !== "admin") {
      alert("Accès refusé");
      return;
    }
    if (!window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/deletecommentaire/${id}`, {
        headers: { Authorization: token },
      });
      fetchCommentaires();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du commentaire.");
    }
  };

  return (
    <Container className="my-5">
      <h3 className="mb-4">Commentaires des utilisateurs</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      {user ? (
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Écrivez votre commentaire..."
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" /> Envoi...
              </>
            ) : (
              "Publier"
            )}
          </Button>
        </Form>
      ) : (
        <p>Connectez-vous pour publier un commentaire.</p>
      )}

      {/* Défilement horizontal */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          padding: "1rem 0",
          scrollBehavior: "smooth",
        }}
      >
        {commentaires.length > 0 ? (
          commentaires.map((c) => (
            <div
              key={c.idCommentaire}
              style={{
                flex: "0 0 auto",
                backgroundColor: c.couleur,
                color: "#000",
                padding: "1rem",
                borderRadius: "15px",
                minWidth: "250px",
                maxWidth: "300px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              className="bulle-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 15px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  marginBottom: "0.3rem",
                }}
              >
                {c.nom} {c.prenom}
              </div>
              <div style={{ marginBottom: "0.3rem" }}>{c.contenu}</div>
              <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>
                {new Date(c.dateCommentaire).toLocaleDateString()}
              </div>

              {user?.role === "admin" && (
                <Button
                  variant="danger"
                  size="sm"
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => handleDelete(c.idCommentaire)}
                >
                  Supprimer
                </Button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center">Aucun commentaire pour le moment.</p>
        )}
      </div>
    </Container>
  );
};

export default CommentairesPage;
