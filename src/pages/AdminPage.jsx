import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate, formatDateLocal } from "../utils/dateUtils";


// Composants
import UserTable from "../components/UserTable";
import GalerieTable from "../components/GalerieTable";
import PhotoboothTable from "../components/PhotoboothTable";
import LocationTable from "../components/LocationTable";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [galeries, setGaleries] = useState([]);
  const [photobooths, setPhotobooths] = useState([]);
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal,setShowModal]= useState(false);
  const [mode,setMode]= useState("add");
  const [currentPhotobooth, setCurrentPhotobooth]=useState({
    idPhotobooth:null,
    nomPhotobooth:"",
    statut:"libre",
    prix:"",
  });


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



  // --- Fetch Photobooths ---
  useEffect(() => {
    const fetchPhotobooths = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/photobooths", {
          headers: { Authorization: token },
        });
        console.log(res.data);
        
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

  const handleAddPhotobooth =()=>{
   setMode("add");
   setCurrentPhotobooth({
    idPhotobooth:null,
    nomPhotobooth:"",
    statut:"libre",
    prix:1,
   }) 
   setShowModal (true);
  } ;

  const handleEditPhotobooth =(pb) => {
    setMode("edit");
    setCurrentPhotobooth(pb);
    setShowModal(true);
  }

  const handleSubmitPhotobooth = async (e) => {
    e.preventDefault();
    try {

      const photoboothData = {
        ...currentPhotobooth,
        prix:1,
      }


  if (mode==="add") {
      const res =await axios.post("http://localhost:3000/api/createphotobooth",currentPhotobooth,{
        headers:{Authorization:token},

      });
      setPhotobooths([...photobooths,res.data]);
      toast.success("photobooth crée");
    }else if (mode==="edit"){
      await axios.put(`http://localhost:3000/api/updatephotobooth/${currentPhotobooth.idPhotobooth}`,currentPhotobooth,{
        headers:{Authorization:token},
      }
      );
    setPhotobooths(photobooths.map((p)=>(p.idPhotobooth === currentPhotobooth.idPhotobooth ? currentPhotobooth : p)));
    toast.success("photobooth modifié");
  }
  setShowModal(false);
    }catch (error){
      console.error("Erreur création photobooth",error);
      toast.error("Impossible de créer le photobooth");
    }
  };

  const handleDeleteLocation = async (userId, photoboothId, dateDebut) => {
  if (!window.confirm("Voulez-vous vraiment supprimer cette location ?")) return;

  try {
    await axios.delete(
      `http://localhost:3000/api/deletelocation/${userId}/${photoboothId}/${dateDebut}`,
      { headers: { Authorization: token } }
    );

    // Supprimer du state local
    setLocations(locations.filter(
      loc =>
        !(loc.userId === userId && loc.photoboothId === photoboothId && loc.dateDebut === dateDebut)
    ));
    toast.success("Location supprimée !");
  } catch (error) {
    console.error("Erreur suppression location", error);
    toast.error("Impossible de supprimer cette location.");
  }
};
const handleUpdateLocation = async (oldLoc, updatedLoc) => {
  try {

     const oldDateDebut = moment(oldLoc.dateDebut, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD");

    // Corps à envoyer au backend
    const body = {
      ...updatedLoc,
      newDateDebut: updatedLoc.dateDebut
        ? moment(updatedLoc.dateDebut).format("YYYY-MM-DD")
        : oldDateDebut, // fallback
      dateFin: updatedLoc.dateFin
        ? moment(updatedLoc.dateFin).format("YYYY-MM-DD")
        : moment(oldLoc.dateFin, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD"),
    };




    await axios.put(
      `http://localhost:3000/api/updatelocation/${oldLoc.userId}/${oldLoc.photoboothId}/${oldDateDebut}`,
      body,
      { headers: { Authorization: token } }
    );

    // Mettre à jour le state local
    setLocations(locations.map(loc =>
      loc.userId === oldLoc.userId &&
      loc.photoboothId === oldLoc.photoboothId && moment
      (loc.dateDebut, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("YYYY-MM-DD")=== oldDateDebut
        ? { ...loc, ...updatedLoc }
        : loc
    ));

    toast.success("Location mise à jour !");
  } catch (error) {
    console.error("Erreur modification location", error);
    toast.error("Impossible de modifier cette location.");
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
      <PhotoboothTable photobooths={photobooths}
       onDelete={handleDeletePhotobooth}
       onAdd={handleAddPhotobooth}
       onEdit={handleEditPhotobooth} />

        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === "add" ? "Ajouter un photobooth" : "Modifier le photobooth"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitPhotobooth}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={currentPhotobooth.nomPhotobooth}
                onChange={(e) =>
                  setCurrentPhotobooth({
                    ...currentPhotobooth,
                    nomPhotobooth: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Statut</Form.Label>
              <Form.Select
                value={currentPhotobooth.statut}
                onChange={(e) =>
                  setCurrentPhotobooth({
                    ...currentPhotobooth,
                    statut: e.target.value,
                  })
                }
              >
                <option>Disponible</option>
                <option>Indisponible</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="text"
                value="1 € / tirage"
               
               readOnly
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              {mode === "add" ? "Enregistrer" : "Mettre à jour"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Table des locations */}
      <LocationTable
        locations={locations}
        users={users}
        photobooths={photobooths}
        onUpdate={handleUpdateLocation}
       onDelete={handleDeleteLocation}
      />
    </div>
  );
};

export default AdminPage;