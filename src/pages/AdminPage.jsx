import { useEffect, useState } from "react";
import axios from "axios";

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
          allLocations.push(...res.data);
        }
        setLocations(allLocations);
      } catch (error) {
        console.error("Erreur chargement locations", error);
      }
    };
    if (users.length > 0) fetchLocations();
  }, [token, users]);

  // --- Handlers Users ---
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

  // --- Handlers Galeries ---
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

  // --- Handlers Photobooths ---
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

  // --- Handlers Locations ---
  const handleDeleteLocation = async (userId, photoboothId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette location ?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/deletelocation/${userId}/${photoboothId}`, {
        headers: { Authorization: token },
      });
      setLocations(locations.filter(l => !(l.userId === userId && l.photoboothId === photoboothId)));
      alert("Location supprimée !");
    } catch (error) {
      console.error("Erreur suppression location", error);
      alert("Impossible de supprimer cette location.");
    }
  };

  const handleUpdateLocation = async (loc, newDateDebut, newDateFin) => {
    try {
      await axios.put(
        `http://localhost:3000/api/updatelocation/${loc.userId}/${loc.photoboothId}`,
        { dateDebut: newDateDebut, dateFin: newDateFin },
        { headers: { Authorization: token } }
      );
      setLocations(locations.map(l =>
        l.userId === loc.userId && l.photoboothId === loc.photoboothId
          ? { ...l, dateDebut: newDateDebut, dateFin: newDateFin }
          : l
      ));
      alert("Location mise à jour !");
    } catch (error) {
      console.error("Erreur mise à jour location", error);
      alert("Impossible de mettre à jour cette location.");
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