import { PencilFill, TrashFill } from "react-bootstrap-icons";

const LocationTable = ({ locations, users, photobooths, onUpdate, onDelete }) => {
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
            const user = users.find(u => u.idUser === loc.userId);
            const pb = photobooths.find(p => p.idPhotobooth === loc.photoboothId);

            return (
              <tr key={`${loc.userId}-${loc.photoboothId}-${loc.dateDebut}`}>
                <td>{user ? `${user.prenom} ${user.nom}` : loc.userId}</td>
                <td>{pb ? pb.nomPhotobooth : loc.photoboothId}</td>
                <td>{loc.dateDebut}</td>
                <td>{loc.dateFin}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      const newDateDebut = prompt("Nouvelle date de début :", loc.dateDebut);
                      const newDateFin = prompt("Nouvelle date de fin :", loc.dateFin);
                      if (newDateDebut && newDateFin) onUpdate(loc, newDateDebut, newDateFin);
                    }}
                  >
                    <PencilFill /> Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(loc.userId, loc.photoboothId)}
                  >
                    <TrashFill /> Supprimer
                  </button>
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