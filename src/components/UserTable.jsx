import { PencilFill, TrashFill } from "react-bootstrap-icons";

const UserTable = ({ users, locations, onEdit, onDelete, search, setSearch }) => {
  const filteredUsers = users.filter(u =>
    u.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>
      <div className="mb-3 d-flex">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control me-2"
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Locations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => {
            const locationCount = locations.filter(loc => loc.userId === user.idUser).length;
            return (
              <tr key={user.idUser}>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{locationCount || "Aucune"}</td>
                <td>
                
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(user.idUser)}>
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

export default UserTable;