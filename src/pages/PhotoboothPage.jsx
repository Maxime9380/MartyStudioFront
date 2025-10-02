
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";


const BookingForm = () => {
  const [lieu, setLieu] = useState("");
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [photobooths, setPhotobooths] = useState([]);
  const [photoboothId, setPhotoboothId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      setIsLoggedIn(true);

      try {
        const resUser = await fetch("http://localhost:3000/api/me", {
          headers: { Authorization: token },
        });
        if (!resUser.ok) throw new Error("Impossible de récupérer l'utilisateur");
        const dataUser = await resUser.json();
        setUserInfo(dataUser);

        const res = await fetch("http://localhost:3000/api/photobooths");
        if (!res.ok) throw new Error("Impossible de récupérer le photobooth");
        const data = await res.json();

        const libres = data.filter((pb) => pb.statut === "libre");
        setPhotobooths(libres);

        if (libres.length > 0) setPhotoboothId(libres[0].idPhotobooth);
      } catch (err) {
        console.error("Erreur lors de la récupération des photobooths", err);
        toast.error("Erreur lors du chargement des données");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoboothId) {
      toast.warn("Veuillez sélectionner un photobooth.");
      return;
    }
    if (!dateRange || !dateRange[0]) {
      toast.warn("Veuillez sélectionner une date valide.");
      return;
    }

    const [dateDebut, dateFin] = dateRange;
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Vous devez être connecté pour réserver un Photobooth.");
      return;
    }

    try {
      const pb = photobooths.find(pb => pb.idPhotobooth === photoboothId);
      if (!pb) throw new Error("Photobooth introuvable");

      const res = await fetch("http://localhost:3000/api/createlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          lieu,
          dateDebut: moment(dateDebut).format("YYYY-MM-DD"),
          dateFin: moment(dateFin).format("YYYY-MM-DD"),
          userId: userInfo.idUser,
          photoboothId: parseInt(photoboothId),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Location créée avec succès !");
        setLieu("");
        setDateRange([new Date(), new Date()]);
        setPhotobooths(prev => prev.filter(pb => pb.idPhotobooth !== photoboothId));
        setPhotoboothId(prev => {
          const remaining = photobooths.filter(pb => pb.idPhotobooth !== prev);
          return remaining.length > 0 ? remaining[0].idPhotobooth : "";
        });
      } else {
        toast.error(data.message || "Erreur lors de la réservation");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="booking-container">
        <div className="overlay"></div>
        <div className="booking-card">
          <h2>Réserver un Photobooth</h2>
          <p>⚠️ Vous devez être connecté pour réserver un photobooth.</p>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="overlay"></div>

      <div className="booking-card">
        <h2 className="title">Réserver un Photobooth</h2>
        <form onSubmit={handleSubmit} className="form">
          {userInfo && (
            <>
              <input type="text" value={userInfo.nom || ""} readOnly className="input" />
              <input type="text" value={userInfo.prenom || ""} readOnly className="input" />
              <input type="email" value={userInfo.email || ""} readOnly className="input" />
            </>
          )}

          <input
            type="text"
            placeholder="Lieu"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            required
            className="input"
          />

          <label className="label">Choisir les dates :</label>
          <div className="datepicker-container">
            <DatePicker
              selected={dateRange[0]}
              onChange={(dates) => setDateRange(dates)}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              selectsRange
              inline
            />
          </div>

          <select
            value={photoboothId}
            onChange={(e) => setPhotoboothId(parseInt(e.target.value))}
            required
            className="input"
          >
            {photobooths.map((pb) => (
              <option key={pb.idPhotobooth} value={pb.idPhotobooth}>
                {pb.nomPhotobooth}
              </option>
            ))}
          </select>

          <button type="submit" className="button">
            Réserver
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BookingForm;
