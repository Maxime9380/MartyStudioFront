import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

// Utilitaire pour formater une date en YYYY-MM-DD
const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
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
            {/* <th>Prix (€)</th> */}
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
                    <DatePicker
                    selected={formData.dateDebut ? moment(formData.dateDebut).format('YYYY-MM-DD').toDate() : moment(formData.dateDebut).format('YYYY-MM-DD').toDate() }
                      onChange={(date) => handleChange("dateDebut", formatDate(date))}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                  ) : (
                    moment(loc.dateDebut).add(1, 'day').format('DD/MM/YYYY')
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <DatePicker
                      selected={formData.dateFin ? moment(formData.dateFin).format('YYYY-MM-DD').toDate() : moment(formData.dateFin).add(1, 'day').format('YYYY-MM-DD').toDate() }
                      onChange={(date) => handleChange("dateFin", formatDate(date))}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                  ) : (
                    moment(loc.dateFin).add(1, 'day').format('DD/MM/YYYY')
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
                           dateDebut: moment(loc.dateDebut).add(1,'day').format("YYYY-MM-DD"),
                            dateFin: moment(loc.dateFin).add(1,'day').format("YYYY-MM-DD"),
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
                             onUpdate(loc, {
    ...loc,
    ...formData,
    dateDebut: formData.dateDebut
      ? formData.dateDebut
      : moment(loc.dateDebut).add(1, 'day').format("YYYY-MM-DD"),
    dateFin: formData.dateFin
      ? formData.dateFin
      : moment(loc.dateFin).add(1, 'day').format("YYYY-MM-DD"),
  });
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
    className="btn btn-sm btn-danger"
    onClick={() => {
        const dateDebutPlusUn= moment(loc.dateDebut).add(1,'day').format("YYYY-MM-DD");
        onDelete(loc.userId,loc.photoboothId,dateDebutPlusUn)
    }}
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