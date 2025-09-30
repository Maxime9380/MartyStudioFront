import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AppointmentModal = ({ show, handleClose, service }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
    service: service || "",
  });

  const [statusMessage, setStatusMessage] = useState(null); // pour afficher le message
  const [statusType, setStatusType] = useState(""); // "success" ou "danger"

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: service || "" }));
  }, [service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null); // reset message à chaque soumission

    try {
      const response = await fetch("http://localhost:3000/api/rendezvous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Rendez-vous confirmé ! Un email a été envoyé.");
        setStatusType("success");
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          message: "",
          service: "",
        });
      } else {
        setStatusMessage("Erreur lors de la réservation : " + data.message);
        setStatusType("danger");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setStatusMessage("Erreur lors de la réservation. Veuillez réessayer.");
      setStatusType("danger");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Prendre un rendez-vous</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {statusMessage && (
          <Alert variant={statusType} className="text-center">
            {statusMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Choisissez une séance</Form.Label>
            <Form.Select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionnez une séance --</option>
              <option value="noel">Séance Noël</option>
              <option value="halloween">Séance Halloween</option>
              <option value="printemps">Séance Printemps</option>
              <option value="carnaval">Séance Carnaval</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Heure</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message (optionnel)</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ajoutez un commentaire..."
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Confirmer le rendez-vous
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentModal;
