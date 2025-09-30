import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AppointmentModal from '../components/ModalRendezVous';

export const SeancePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleShow = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const buttonStyle = {
    backgroundColor: "#3c5a76",
    borderColor: "#3c5a76",
    color: "white"
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Séances Photo</h1>
      <p className="text-center mb-5">
        Découvrez nos différentes formules de séances photo adaptées à vos besoins et envies. 
        Que ce soit en extérieur pour des clichés naturels ou en studio pour des portraits plus 
        travaillés, nous capturons vos moments précieux avec créativité et professionnalisme.
      </p>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {/* Mariage */}
        <div className="col">
          <div className="card h-100 d-flex flex-column">
            <img src="/public/couplemainpetit.jpeg" className="card-img-top" alt="Mariage" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Mariage</h5>
              <p className="card-text">
                Des séance photo de mariage pour capturer les moments magiques de votre journée spéciale avec des photos intemporelles et authentiques.
                Prix: 1000€
              </p>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Button style={buttonStyle} className="w-100" onClick={() => navigate('/contact')}>
                Prenez contact
              </Button>
            </div>
          </div>
        </div>

        {/* Portraits */}
        <div className="col">
          <div className="card h-100 d-flex flex-column">
            <img src="/public/luciepetit.jpeg" className="card-img-top" alt="Portraits" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Portraits</h5>
              <p className="card-text">
                Des séances photo de portraits pour capturer votre personnalité et votre style unique.
                Prix: 200€
              </p>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Button style={buttonStyle} className="w-100" onClick={() => navigate('/contact')}>
                Prenez contact
              </Button>
            </div>
          </div>
        </div>

        {/* Familles */}
        <div className="col">
          <div className="card h-100 d-flex flex-column">
            <img src="/public/couplepetit.jpeg" className="card-img-top" alt="Familles" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Familles</h5>
              <p className="card-text">
                Des séances photo de famille pour immortaliser vos liens précieux et créer des souvenirs durables.
                Prix: 300€
              </p>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Button style={buttonStyle} className="w-100" onClick={() => navigate('/contact')}>
                Prenez contact
              </Button>
            </div>
          </div>
        </div>

        {/* Événements */}
        <div className="col">
          <div className="card h-100 d-flex flex-column">
            <img src="/public/granderouepetit.jpeg" className="card-img-top" alt="Événements" />
            <div className="card-body flex-grow-1">
              <h5 className="card-title">Événements</h5>
              <p className="card-text">
                Des séances photo d'événements pour capturer l'ambiance et les moments forts de vos occasions spéciales.
                Prix: 400€
              </p>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Button style={buttonStyle} className="w-100" onClick={() => handleShow("Événements")}>
                Prenez Rendez-Vous
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal reliée uniquement à la card Événements */}
      <AppointmentModal show={showModal} handleClose={handleClose} service={selectedService} />
    </div>
  );
};
