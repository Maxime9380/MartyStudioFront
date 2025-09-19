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
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <div className="mt-5">
      <h2>Gestion des locations</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Photobooth</th>
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
                <td>{user ? `${user.prenom} ${user.nom}` : loc.userId}</td>
                <td>{pb ? pb.nomPhotobooth : loc.photoboothId}</td>
                <td>{isEditing ? formatDate(dateRange[0]) : loc.dateDebut}</td>
                <td>{isEditing ? formatDate(dateRange[1]) : loc.dateFin}</td>
                <td>
                  {isEditing ? (
                    <>
                      <div className="d-flex gap-2">
                        <DatePicker
                          selected={dateRange[0]}
                          onChange={(date) => setDateRange([date, dateRange[1]])}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Date début"
                        />
                        <DatePicker
                          selected={dateRange[1]}
                          onChange={(date) => setDateRange([dateRange[0], date])}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Date fin"
                        />
                      </div>
                      <button
                        className="btn btn-sm btn-success me-2 mt-2"
                        onClick={() => {
                          onUpdate(loc, formatDate(dateRange[0]), formatDate(dateRange[1]));
                          setEditingLoc(null);
                        }}
                      >
                        Sauvegarder
                      </button>
                      <button
                        className="btn btn-sm btn-secondary mt-2"
                        onClick={() => setEditingLoc(null)}
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
                          setDateRange([new Date(loc.dateDebut), new Date(loc.dateFin)]);
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