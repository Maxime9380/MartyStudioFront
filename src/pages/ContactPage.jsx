import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';




export default function ContactPage() {

    const[formData, setFormData] = useState({
        nom: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,[e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFeedback(null);

        try {
            const res= await fetch('http://localhost:3000/api/sendcontact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                throw new Error('Erreur lors de l\'envoi du message');
            }
            const data = await res.json();
            setFeedback({ type: 'success', message: data.message });
            
            console.log("Données du formulaire envoyées :", formData);
            
            setFormData({ nom: "", email: "", message: "" });
            alert("Message envoyé avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    }





 return (
  <div className="container my-5">
    <div className="row align-items-center">
      {/* Colonne image */}
      <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
        <img
          src="/couple.jpeg"
          alt="Couple"
          className="img-fluid rounded-4 shadow"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      {/* Colonne card */}
      <div className="col-lg-6 col-md-6">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h1 className="text-center mb-4">📩 Contactez-nous</h1>
            <p className="text-muted text-center mb-4">
              Pour toute demande, veuillez remplir le formulaire ci-dessous :
            </p>
            <form onSubmit={handleSubmit}>
              {/* Nom */}
              <div className="mb-3">
                <label htmlFor="nom" className="form-label fw-semibold">
                  Nom :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  name="nom"
                  placeholder="Entrez votre nom"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="exemple@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold">
                  Message :
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Écrivez votre message ici..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Bouton */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? "Envoi en cours..." : "Envoyer ✉️"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}