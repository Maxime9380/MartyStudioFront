import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, formatDateLocal } from "../utils/dateUtils";
import {jwtDecode} from "jwt-decode";

// Composants
import UserTable from "../components/UserTable";
import GalerieTable from "../components/GalerieTable";
import PhotoboothTable from "../components/PhotoboothTable";
import LocationTable from "../components/LocationTable";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [galeries, setGaleries] = useState([]);
  const [photobooths, setPhotobooths] = useState([]);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // --- Fetch Utilisateurs ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: token },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Erreur chargement users", error);
      }
    };
    fetchUsers();
  }, [token]);

  // --- Fetch Galeries ---
  useEffect(() => {
  const fetchGaleries = async () => {
    try {
      const decoded = jwtDecode(token); // { idUser, role, ... }
      const url =
        decoded.role === "admin"
          ? "http://localhost:3000/api/galerie"
          : "http://localhost:3000/api/galeries";

      const res = await axios.get(url, {
        headers: { Authorization: token },
      });

      setGaleries(res.data);
    } catch (error) {
      console.error(
        "Erreur chargement galeries",
        error.response?.data || error.message
      );
    }
  };

  if (token) fetchGaleries();
}, [token]);

  // --- Fetch Photobooths ---
  useEffect(() => {
    const fetchPhotobooths = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/photobooths", {
          headers: { Authorization: token },
        });
        setPhotobooths(res.data);
      } catch (error) {
        console.error("Erreur chargement photobooths", error);
      }
    };
    fetchPhotobooths();
  }, [token]);

  // --- Fetch Locations ---
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const allLocations = [];
        for (const user of users) {
          const res = await axios.get(
            `http://localhost:3000/api/locations/${user.idUser}`,
            { headers: { Authorization: token } }
          );

          // Formater les dates
          const formatted = res.data.map((loc) => ({
            ...loc,
            dateDebut: formatDate(loc.dateDebut),
            dateFin: formatDate(loc.dateFin),
          }));

          allLocations.push(...formatted);
        }
        setLocations(allLocations);
      } catch (error) {
        console.error("Erreur chargement locations", error);
      }
    };
    if (users.length > 0) fetchLocations();
  }, [users, token]);

  // --- Handlers ---
  const handleDeleteGalerie = async (idGalerie) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletegalerie/${idGalerie}`, {
        headers: { Authorization: token },
      });
      setGaleries(galeries.filter((g) => g.idGalerie !== idGalerie));
      alert("Galerie supprimée !");
    } catch (error) {
      console.error("Erreur suppression galerie", error);
      alert("Impossible de supprimer cette galerie.");
    }
  };

  const handleDeleteUser = async (idUser) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/deleteuser/${idUser}`, {
        headers: { Authorization: token },
      });
      setUsers(users.filter((u) => u.idUser !== idUser));
      alert("Utilisateur supprimé !");
    } catch (error) {
      console.error("Erreur suppression utilisateur", error);
      alert("Impossible de supprimer cet utilisateur.");
    }
  };

  const handleDeletePhotobooth = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletephotobooth/${id}`, {
        headers: { Authorization: token },
      });
      setPhotobooths(photobooths.filter((p) => p.idPhotobooth !== id));
      alert("Photobooth supprimé !");
    } catch (error) {
      console.error("Erreur suppression photobooth", error);
      alert("Impossible de supprimer ce photobooth.");
    }
  };

  return (
    <div className="admin-page p-4">
      <h1>Admin Dashboard</h1>

      {/* Table des utilisateurs */}
      <UserTable
        users={users}
        locations={locations}
        search={search}
        setSearch={setSearch}
        onDelete={handleDeleteUser}
      />

      {/* Table des galeries (formulaire inclus) */}
      <GalerieTable
        galeries={galeries}
        users={users}
        token={token}
        onDelete={handleDeleteGalerie}
        refreshGaleries={async () => {
          const res = await axios.get("http://localhost:3000/api/galerie", {
            headers: { Authorization: token },
          });
          setGaleries(res.data);
        }}
      />

      {/* Table des photobooths */}
      <PhotoboothTable photobooths={photobooths} onDelete={handleDeletePhotobooth} />

      {/* Table des locations */}
      <LocationTable
        locations={locations}
        users={users}
        photobooths={photobooths}
      />
    </div>
  );
};

export default AdminPage;