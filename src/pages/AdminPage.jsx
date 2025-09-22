import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, formatDateLocal } from "../utils/dateUtils";

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
        const res = await axios.get("http://localhost:3000/api/galerie", {
          headers: { Authorization: token },
        });
        setGaleries(res.data);
      } catch (error) {
        console.error("Erreur chargement galeries", error);
      }
    };
    fetchGaleries();
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
          const res = await axios.get(`http://localhost:3000/api/locations/${user.idUser}`, {
            headers: { Authorization: token },
          });

          // Formate les dates pour correspondre à MySQL DATE
          const formatted = res.data.map(loc => ({
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
  const handleDeleteLocation = async (userId, photoboothId, dateDebut) => {
    try {
      const d =new Date(dateDebut);
      d.setDate(d.getDate()+1);
      const sqlDate = formatDateLocal(d); // Utilise formatDateLocal pour éviter le décalage

      const res = await axios.delete(
        `http://localhost:3000/api/deletelocation/${userId}/${photoboothId}/${sqlDate}`,
        { headers: { Authorization: token } }
      );

      // Mise à jour du state pour enlever la location sans rafraîchir
      setLocations(locations.filter(
        loc => !(loc.userId === userId && loc.photoboothId === photoboothId && loc.dateDebut === sqlDate)
      ));

      alert(res.data.message);
    } catch (error) {
      console.error("Erreur suppression location", error);
      alert("Impossible de supprimer la location.");
    }
  };

  const handleUpdateLocation = async (oldLoc, updatedLoc) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/updatelocation/${oldLoc.userId}/${oldLoc.photoboothId}/${formatDate(oldLoc.dateDebut)}`,updatedLoc,
        
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        setLocations(locations.map(l =>
          l.userId === oldLoc.userId &&
          l.photoboothId === oldLoc.photoboothId &&
          formatDate(l.dateDebut) === formatDate(oldLoc.dateDebut)
            ? updatedLoc
            : l
        ));
        alert("✅ Location mise à jour !");
      }
    } catch (error) {
      console.error("❌ Erreur mise à jour location", error);
      alert("Impossible de mettre à jour cette location.");
    }
  };

  // Delete handlers pour Users / Galeries / Photobooths
  const handleDeleteUser = async (idUser) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/deleteuser/${idUser}`, {
        headers: { Authorization: token },
      });
      setUsers(users.filter(u => u.idUser !== idUser));
      alert("Utilisateur supprimé !");
    } catch (error) {
      console.error("Erreur suppression utilisateur", error);
      alert("Impossible de supprimer cet utilisateur.");
    }
  };

  const handleDeleteGalerie = async (idGalerie) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletegalerie/${idGalerie}`, {
        headers: { Authorization: token },
      });
      setGaleries(galeries.filter(g => g.idGalerie !== idGalerie));
      alert("Galerie supprimée !");
    } catch (error) {
      console.error("Erreur suppression galerie", error);
      alert("Impossible de supprimer cette galerie.");
    }
  };

  const handleDeletePhotobooth = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deletephotobooth/${id}`, {
        headers: { Authorization: token },
      });
      setPhotobooths(photobooths.filter(p => p.idPhotobooth !== id));
      alert("Photobooth supprimé !");
    } catch (error) {
      console.error("Erreur suppression photobooth", error);
      alert("Impossible de supprimer ce photobooth.");
    }
  };

  return (
    <div className="admin-page p-4">
      <h1>Admin Dashboard</h1>

      <UserTable
        users={users}
        locations={locations}
        search={search}
        setSearch={setSearch}
        onDelete={handleDeleteUser}
      />

      <LocationTable
        locations={locations}
        users={users}
        photobooths={photobooths}
        onUpdate={handleUpdateLocation}
        onDelete={handleDeleteLocation}
      />

      <GalerieTable
        galeries={galeries}
        users={users}
        onDelete={handleDeleteGalerie}
      />

      <PhotoboothTable
        photobooths={photobooths}
        onDelete={handleDeletePhotobooth}
      />
    </div>
  );
};

export default AdminPage;