import { TrashFill, Plus } from "react-bootstrap-icons";
import axios from "axios";
import {useState} from "react";

const GalerieTable = ({ galeries,users = [], token, onDelete,refreshGaleries }) => {
     const [showForm, setShowForm] = useState(false);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState("prive");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titre || files.length === 0) return alert("Titre et photos obligatoires");

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("statut", statut);
    formData.append("userId", selectedUserId);
    for (const file of files) formData.append("photos", file);

    try {
      await axios.post("http://localhost:3000/api/creategalerie", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      alert("Galerie créée !");
      setShowForm(false);
      setTitre("");
      setDescription("");
      setStatut("prive");
      setSelectedUserId("");
      setFiles([]);
      refreshGaleries(); // rafraîchir la liste dans le parent
    } catch (error) {
      console.error("Erreur création galerie", error);
      alert("Impossible de créer la galerie.");
    }
  };

   return (
    <div className="mt-5">
      <h2>Gestion des galeries</h2>

      <div className="mb-3 d-flex">
        <button className="btn btn-primary me-3" onClick={() => setShowForm(!showForm)}>
          <Plus /> Ajouter une galerie
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            className="form-control mb-2"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control mb-2"
          />
          <select
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            className="form-select mb-2"
          >
            <option value="prive">Privé</option>
            <option value="public">Public</option>
          </select>

           <select
  value={selectedUserId}
  onChange={e => setSelectedUserId(e.target.value)}
  required
>
  <option value="">Sélectionner un utilisateur</option>
  {users.map(user => (
    <option key={user.idUser} value={user.idUser}>
      {user.nom} {user.prenom}
    </option>
  ))}
</select> 


          <input
            type="file"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-success">Créer Galerie</button>
        </form>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {galeries.map((galerie) => (
            <tr key={galerie.idGalerie}>
              <td>{galerie.titre}</td>
              <td>{galerie.description}</td>
              <td>{galerie.statut=== 1 ? "prive": "public"}</td>
              
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(galerie.idGalerie)}>
                  <TrashFill /> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

    

export default GalerieTable;