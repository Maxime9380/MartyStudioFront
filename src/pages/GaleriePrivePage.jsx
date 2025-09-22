import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GaleriePrive =() => {
    const [galeries,setGaleries]=useState([]);
   
    const  [token,setToken]=useState(localStorage.getItem("token"))
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();
       

        try {
            const res=await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            if (!res.ok) {
                throw new Error('Erreur lors de la connexion');
            }
            const data = await res.json();
            setToken(data.token);
            localStorage.setItem("token", data.token);
            fetchGaleries(data.token);
            


            
        } catch (error) {
            console.err("erreur lors de la connexion :", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
            
        }
      
    }
    const fetchGaleries = async (token) => {
        try {
            const res=await fetch("http://localhost:3000/api/galerie", {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            
            });
            if (!res.ok) {
               console.error("Erreur lors de la récupération des galeries");
               return;
            }
            const data = await res.json();
            setGaleries(data);
            console.log(data);

             
            
        } catch (error) {
            console.error("erreur lors de la récupération des photos :", error);
            
        }
    }
    useEffect(() => {
        if (galeries && galeries.length ===0 && token) {
            toast.info("Vous n'avez pas encore de galerie privée.");
            fetchGaleries(token);
        }
    }, [galeries,token]);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setGaleries([]);
    }
        


    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Galerie Privée</h1>

         <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
    />


            {!token ? (
                <form onSubmit={handleLogin} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={(e)=> setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                </form>
            ) : (
              <div>
          <div className="mb-3 text-end">
            <button className="btn btn-secondary" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>

          {galeries.length === 0 ? (
            <p>Aucune galerie privée disponible.</p>
          ) : (
            galeries.map((galerie) => (
              <div key={galerie.idGalerie} className="mb-5">
                <h2 className="mb-3">{galerie.titre}</h2>
                <div className="row">
                  {galerie.photos && galerie.photos.length > 0 ? (
                    galerie.photos.map((img) => (
                      <div className="col-md-4 mb-4" key={img.idPhoto}>
                        <div className="card shadow-sm">
                          <img
                            src={`http://localhost:3000${img.url}`}
                            className="card-img-top"
                            alt={img.description || img.titre}
                          />
                          <div className="card-body">
                            <p className="card-text">
                              {img.description || "Aucune description"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="ms-3">Aucune photo dans cette galerie.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
            )}
        </div>
    );
}