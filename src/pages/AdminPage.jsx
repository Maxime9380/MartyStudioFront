import { useEffect, useState } from "react";
import axios from "axios";
import { PencilFill, TrashFill, Plus } from "react-bootstrap-icons";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  // --- Filtre utilisateurs ---
  const filteredUsers = users.filter((u) =>
    u.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page p-4">
      <h1>Admin Dashboard</h1>

      {/* Section Utilisateurs */}
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
          <button
            className="btn btn-primary"
            onClick={() => {
              setCurrentUser(null);
              setShowUserModal(true);
            }}
          >
            <Plus /> Ajouter
          </button>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.idUser}>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      setCurrentUser(user);
                      setShowUserModal(true);
                    }}
                  >
                    <PencilFill /> Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      console.log("Supprimer utilisateur", user.idUser)
                    }
                  >
                    <TrashFill /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Utilisateur */}
      {showUserModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentUser ? "Modifier Utilisateur" : "Nouvel Utilisateur"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowUserModal(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nom"
                  className="form-control mb-2"
                  value={currentUser?.nom || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, nom: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-2"
                  value={currentUser?.email || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={currentUser?.role || "user"}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, role: e.target.value })
                  }
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUserModal(false)}
                >
                  Annuler
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    console.log("Sauvegarder utilisateur", currentUser);
                    setShowUserModal(false);
                  }}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;