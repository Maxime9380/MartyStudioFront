import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { checkToken, getUserFromToken } from "../services/AuthService"; // Remplace par le chemin correct

export const GaleriePrive = () => {
  const [galeries, setGaleries] = useState([]);
  const [token, setToken] = useState(checkToken());
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Récupère le rôle de l'utilisateur depuis le token
  useEffect(() => {
    if (token) {
      const user = getUserFromToken();
      setRole(user?.role);
    }
  }, [token]);

  // Fonction pour récupérer les galeries en fonction du rôle
  const fetchGaleries = async (tokenParam = token, roleParam = role) => {
    if (!tokenParam || !roleParam) return;

    try {
      const url = roleParam === "admin"
        ? "http://localhost:3000/api/galeries"
        : "http://localhost:3000/api/galerie";

      const res = await axios.get(url, {
        headers: { Authorization: tokenParam },
      });

      setGaleries(res.data);
    } catch (error) {
      console.error("Erreur chargement galeries :", error.response?.data || error.message);
      toast.error("Impossible de charger les galeries.");
    }
  };

  // Charger les galeries automatiquement si token et rôle sont présents
  useEffect(() => {
    if (token && role) {
      fetchGaleries(token, role);
    }
  }, [token, role]);

  // Connexion utilisateur ou admin
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Erreur lors de la connexion");

      const data = await res.json();
      const { token: newToken } = data;

      // Mise à jour du token
      localStorage.setItem("token", newToken);
      setToken(newToken);
      toast.success("Connexion réussie !");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Identifiants incorrects ou erreur serveur.");
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    setGaleries([]);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">
        {role === "admin" ? "Galeries Privées Clients" : "Ma Galerie Privée"}
      </h1>
      <ToastContainer position="top-right" autoClose={3000} />

      {!token ? (
        // Formulaire de connexion
        <form onSubmit={handleLogin} className="mb-4">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Se connecter</button>
        </form>
      ) : (
        // Affichage des galeries
        <div>
          

          {galeries.length === 0 ? (
            <p>Aucune galerie trouvée.</p>
          ) : (
            galeries.map((galerie) => (
              <div key={galerie.idGalerie} className="mb-5">
                <h2 className="mb-3">
                  {galerie.titre}
                  {role === "admin" && (
                    <small className="text-muted"> — {galerie.prenom} {galerie.nom}</small>
                  )}
                </h2>
                <div className="row">
                  {galerie.photos && galerie.photos.length > 0 ? (
                    galerie.photos.map((img) => (
                      <div className="col-md-4 mb-4" key={img.idPhoto}>
                        <div className="card shadow-sm">
                          <img
                            src={`http://localhost:3000${img.url}`}
                            className="card-img-top"
                            alt={img.description || img.titre}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="ms-3">Aucune photo dans cette galerie.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
