import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const BookingForm = () => {
  const [lieu, setLieu] = useState("");
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [photobooths, setPhotobooths] = useState([]);
  const [photoboothId, setPhotoboothId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userInfo,setUserInfo]=useState(null);

  useEffect(() => {
    const fetchData= async()=>{
    const token = localStorage.getItem("token");
    if (!token) return;
    
    
        setIsLoggedIn(true);
        try {
            const resUser = await fetch("http://localhost:3000/api/me",{
                headers:{Authorization:token}
            });
            if(!resUser.ok) throw new error("impossible de récupérer l'utilisateur");
            const dataUser =await resUser.json();
            setUserInfo(dataUser);
       
        
    

    
        const res = await fetch("http://localhost:3000/api/photobooths");
        if(!res.ok) throw new error("impossible de récupérer le photobooth");
        const data = await res.json();
        setPhotobooths(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des photobooths", err);
      }
    };


    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [dateDebut, dateFin] = dateRange;
    const token = localStorage.getItem("token");

    if(!token){
        setMessage("Vous devez être connecté pour réserver un Photobooth.");
        return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/createlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `${token}`,
        },
        body: JSON.stringify({
          lieu,
          dateDebut: dateDebut.toISOString().split("T")[0],
          dateFin: dateFin.toISOString().split("T")[0],
          photoboothId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Location créée avec succès !");
        setLieu("");
        setDateRange([new Date(), new Date()]);
        setPhotoboothId("");
      } else {
        setMessage(data.message || "Erreur lors de la réservation");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur serveur");
    }
  };
  if (!isLoggedIn){
    return(
         <div
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: "url('/public/caravane.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: "rgba(255,255,255,0.9)",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "300px",
            maxWidth: "500px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            textAlign: "center",
          }}
        >
          <h2>Réserver un Photobooth</h2>
          <p>⚠️ Vous devez être connecté pour réserver un photobooth.</p>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/public/caravane.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
          maxWidth: "500px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Réserver un Photobooth</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {userInfo && (
            <>
              <input
                type="text"
                value={userInfo.nom || ""}
                readOnly
                style={{ backgroundColor: "white", color: "black", border: "1px solid black", padding: "8px", borderRadius: "6px" }}
              />
              <input
                type="text"
                value={userInfo.prenom || ""}
                readOnly
                style={{ backgroundColor: "white", color: "black", border: "1px solid black", padding: "8px", borderRadius: "6px" }}
              />
              <input
                type="email"
                value={userInfo.email || ""}
                readOnly
                style={{ backgroundColor: "white", color: "black", border: "1px solid black", padding: "8px", borderRadius: "6px" }}
              />
            </>
          )}

          <input
            type="text"
            placeholder="Lieu"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            required
            style={{ backgroundColor: "white", color: "black", border: "1px solid black", padding: "8px", borderRadius: "6px" }}
          />

          <label style={{ color: "black" }}>Choisir les dates :</label>
          <Calendar selectRange={true} value={dateRange} onChange={setDateRange} />

          <select
            value={photoboothId}
            onChange={(e) => setPhotoboothId(e.target.value)}
            required
            style={{ backgroundColor: "white", color: "black", border: "1px solid black", padding: "8px", borderRadius: "6px" }}
          >
            {photobooths.map((pb) => (
              <option key={pb.idPhotobooth} value={pb.idPhotobooth}>
                Photobooth {pb.idPhotobooth} - {pb.statut === "disponible" ? "Disponible" : "Indisponible"} - {pb.prix}€
              </option>
            ))}
          </select>

          <button type="submit" style={{ padding: "10px", borderRadius: "6px", cursor: "pointer" }}>
            Réserver
          </button>
        </form>
        {message && <p style={{ color: "black", marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
};

export default BookingForm;