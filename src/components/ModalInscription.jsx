import { Modal, Box, Typography, TextField, Button, Stack, FormControlLabel, Checkbox, Link } from "@mui/material";
import { createUser } from "../services/UserService";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ModalInscription({ open, onClose }) {
  const [acceptedRGPD, setAcceptedRGPD] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!acceptedRGPD) {
      alert("Vous devez accepter la politique de confidentialité et les conditions d'utilisation pour vous inscrire.");
      return;
    }

    const formData = new FormData(event.target);

    const inscriptionUtilisateur = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: 0
    };

    try {
      const result = await createUser(inscriptionUtilisateur);
      alert("Inscription réussie !");
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Inscription
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField name="nom" label="Nom" type='text' fullWidth required />
            <TextField name="prenom" label="Prénom" type='text' fullWidth required />
            <TextField name="email" label="Email" type='email' fullWidth required />
            <TextField name="password" label="Mot de passe" type='password' fullWidth required />

            {/* Checkbox RGPD */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedRGPD}
                  onChange={(e) => setAcceptedRGPD(e.target.checked)}
                  required
                />
              }
              label={
                <Typography variant="body2">
                  J'accepte la{' '}
                  <Link href="/politique-confidentialite" target="_blank">politique de confidentialité</Link> et les{' '}
                  <Link href="/conditions-utilisation" target="_blank">conditions d'utilisation</Link>.
                </Typography>
              }
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button onClick={onClose} color="inherit">
                Annuler
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#3c5a76",
                  color: "white",
                  "&:hover": { backgroundColor: "#2f4960" }
                }}
              >
                Inscription
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
