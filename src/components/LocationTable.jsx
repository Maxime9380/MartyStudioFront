import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Utilitaire pour formater une date en YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const LocationTable = ({ locations, users, photobooths, onUpdate, onDelete }) => {
  const [editingLoc, setEditingLoc] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mt-5">
      <h2>Gestion des locations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Photobooth</th>
            <th>Lieu</th>
            {/* <th>Statut</th> */}
            <th>Prix (€)</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => {
            const user = users.find((u) => u.idUser === loc.userId);
            const pb = photobooths.find((p) => p.idPhotobooth === loc.photoboothId);
            const locKey = `${loc.userId}-${loc.photoboothId}-${loc.dateDebut}`;
            const isEditing = editingLoc === locKey;

            return (
              <tr key={locKey}>
                <td>
                  {isEditing ? (
                    <select
                      className="form-select"
                      value={formData.userId || loc.userId}
                      onChange={(e) => handleChange("userId", Number(e.target.value))}
                    >
                      {users.map((u) => (
                        <option key={u.idUser} value={u.idUser}>
                          {u.prenom} {u.nom}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user ? `${user.prenom} ${user.nom}` : loc.userId
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <select
                      className="form-select"
                      value={formData.photoboothId || loc.photoboothId}
                      onChange={(e) => handleChange("photoboothId", Number(e.target.value))}
                    >
                      {photobooths.map((p) => (
                        <option key={p.idPhotobooth} value={p.idPhotobooth}>
                          {p.nomPhotobooth}
                        </option>
                      ))}
                    </select>
                  ) : (
                    pb ? pb.nomPhotobooth : loc.photoboothId
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lieu || loc.lieu}
                      onChange={(e) => handleChange("lieu", e.target.value)}
                    />
                  ) : (
                    loc.lieu
                  )}
                </td>

                {/* <td>
                  {isEditing ? (
                    <select
                      className="form-select"
                      value={formData.statut || loc.statut}
                      onChange={(e) => handleChange("statut", e.target.value)}
                    >
                      <option value="en attente">En attente</option>
                      <option value="confirmée">Confirmée</option>
                      <option value="terminée">Terminée</option>
                    </select>
                  ) : (
                    loc.statut
                  )}
                </td> */}

                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      className="form-control"
                      value={formData.prix || loc.prixTotal}
                      onChange={(e) => handleChange("prix", e.target.value)}
                    />
                  ) : (
                    `${loc.prixTotal} €`
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <DatePicker
                      selected={formData.dateDebut ? new Date(formData.dateDebut) : new Date(loc.dateDebut)}
                      onChange={(date) => handleChange("dateDebut", formatDate(date))}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                  ) : (
                    loc.dateDebut
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <DatePicker
                      selected={formData.dateFin ? new Date(formData.dateFin) : new Date(loc.dateFin)}
                      onChange={(date) => handleChange("dateFin", formatDate(date))}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                  ) : (
                    loc.dateFin
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => {
                          onUpdate(loc, {
                            ...loc,
                            ...formData, // envoie toutes les nouvelles valeurs
                          });
                          setEditingLoc(null);
                          setFormData({});
                        }}
                      >
                        Sauvegarder
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                          setEditingLoc(null);
                          setFormData({});
                        }}
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => {
                          setEditingLoc(locKey);
                          setFormData(loc); // pré-remplir avec les valeurs actuelles
                        }}
                      >
                        <PencilFill /> Modifier
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(loc.userId, loc.photoboothId, loc.dateDebut)}
                      >
                        <TrashFill /> Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;