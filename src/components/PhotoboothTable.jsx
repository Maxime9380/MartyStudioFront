import { PencilFill, TrashFill, Plus } from "react-bootstrap-icons";

const PhotoboothTable = ({ photobooths, onEdit, onDelete, onAdd }) => (
  <div className="mt-5">
    <h2>Gestion des photobooths</h2>
    <div className="mb-3 d-flex">
      <button className="btn btn-primary" onClick={onAdd}>
        <Plus /> Ajouter un photobooth
      </button>
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Statut</th>
          <th>Prix</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {photobooths.map(pb => (
          <tr key={pb.idPhotobooth}>
            <td>{pb.nomPhotobooth}</td>
            <td>{pb.statut}</td>
            <td>1 euros / tirage</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(pb)}>
                <PencilFill /> Modifier
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(pb.idPhotobooth)}>
                <TrashFill /> Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PhotoboothTable;