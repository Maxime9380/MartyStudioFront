import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material";
import { createUser } from "../services/UserService";

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



export default function ModalInscription({open, onClose}) {

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logique de soumission du formulaire
        const formData = new FormData(event.target);

        const inscriptionUtilisateur = {
            nom: formData.get('nom'),
            prenom: formData.get('prenom'),
            email: formData.get('email'),
            password: formData.get('password'),
            role:0

            
        };
        
    try {
       const result= await createUser(inscriptionUtilisateur);
    //    console.log(result);
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

            <TextField
              name="nom"
              label="nom"
              type='text'
              fullWidth
              required
              />

              <TextField
                name="prenom"
                label="prenom"
                type='text'
                fullWidth
                required
                />

            <TextField
              name="email"
              label="email"
              type='email'
              fullWidth
              required
            />

            
            <TextField
              name="password"
              label="password"
              type='password'
              fullWidth
              required
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button onClick={onClose} color="inherit">
                Annuler
              </Button>
              <Button type="submit" variant="contained" color="primary">
                inscription
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );

    }