import { TrashFill, Plus } from "react-bootstrap-icons";

const GalerieTable = ({ galeries, users, onAdd, onDelete }) => (
  <div className="mt-5">
    <h2>Gestion des galeries</h2>
    <div className="mb-3 d-flex">
      <button className="btn btn-primary" onClick={onAdd}>
        <Plus /> Ajouter une galerie
      </button>
    </div>
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
        {galeries.map(galerie => (
          <tr key={galerie.idGalerie}>
            <td>{galerie.titre}</td>
            <td>{galerie.description}</td>
            <td>{galerie.statut}</td>
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

export default GalerieTable;