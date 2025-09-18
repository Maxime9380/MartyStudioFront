import { useEffect, useState } from "react"

export const GaleriePrive =() => {

    const  [photo,setPhoto]=useState ([]);
    const  [token,setToken]=useState(localStorage.getItem("token"))
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();
        const email=formData.get('email');
        const password=formData.get('password');

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
            fetchPhotos(data.token);
            


            
        } catch (error) {
            console.err("erreur lors de la connexion :", error);
            alert("une erreur est survenue. Veuillez réessayer.");
            
        }
      
    }
    const fetchPhotos = async (token) => {
        try {
            const res=await fetch("http://localhost:3000/api/galerie", {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
            if (!res.ok) {
                throw new Error('Erreur lors de la récupération des photos');
            }
            const data = await res.json();
            setPhoto(data);
            console.log(data);
            
        } catch (error) {
            console.error("erreur lors de la récupération des photos :", error);
            alert("une erreur est survenue. Veuillez réessayer.");
        }
    }
    useEffect(() => {
        if (token) {
            fetchPhotos(token);
        }
    }, [token]);
        


    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Galerie Privée</h1>
            {!token ? (
                <form onSubmit={handleLogin} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                </form>
            ) : (
                <div className="row">
                    {photo.map((img) => (
                        <div className="col-md-4 mb-4" key={img.titre}>
                            <div className="card">
                                <img src={`http://localhost:3000/uploads/${img.url}`} className="card-img-top" alt={img.description} />
                                <div className="card-body">
                                    <p className="card-text">{img.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}