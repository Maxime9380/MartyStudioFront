import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container, Alert, Spinner } from "react-bootstrap";
import"../App.css";
import  {jwtDecode}  from "jwt-decode";

const CommentairesPage = () => {
  const [commentaires, setCommentaires] = useState([]);
  const [contenu, setContenu] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem("token");
  
  const user= token ? jwtDecode(token):null;
  console.log(user);
  
  


  const fetchCommentaires = async () => {
    try {
      setError(null);
      const res = await axios.get("http://localhost:3000/api/commentaires");
      setCommentaires(Array.isArray(res.data) ? res.data : []);
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
    if (user?.role !== "admin"){
        alert("accés refusé");
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

      <div className="commentaires-bulles">
        {commentaires.length > 0 ? (
          commentaires.map((c) => (
            <div
              key={c.idCommentaire}
              className={`bulle ${
                user?.idUser === c.userId ? "bulle-mien" : "bulle-autre"
              }`}
            >
              <div className="bulle-nom">{c.nom} {c.prenom}</div>
              <div className="bulle-texte">{c.contenu}</div>
              <div className="bulle-date">{new Date(c.dateCommentaire).toLocaleString()}</div>

              {user?.role == "admin" && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(c.idCommentaire)}
                >
                  Supprimer
                </Button>
              )}
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment.</p>
        )}
      </div>
    </Container>
  );
};

export default CommentairesPage;