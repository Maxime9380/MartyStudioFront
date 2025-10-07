import { useState } from "react";
import { ImageList, ImageListItem, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const GaleriePublic = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (item) => {
    setSelectedImage(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const itemData = [
    { img: "/public/couplemain.jpeg", title: "Couple se tenant la main dans un moment romantique" },
    { img: "/public/famillechienjardin.jpg", title: "Famille jouant avec leur chien dans un jardin ensoleillé" },
    { img: "/public/robemariepetit.jpeg", title: "Détail d’une robe de mariée élégante" },
    { img: "/public/mariéJardin.jpg", title: "Mariés souriants dans un jardin fleuri" },
    { img: "/public/mariéJeux.png", title: "Mariés s’amusant à un jeu lors de la réception" },
    { img: "/public/mariétémoin.png", title: "Mariée entourée de ses témoins joyeuses" },
    { img: "/public/luciepetit.jpeg", title: "Portrait lumineux d’une jeune femme souriante" },
    { img: "/public/mecmer.jpg", title: "Homme regardant la mer au coucher du soleil" },
    { img: "/public/famillejardin.jpg", title: "Famille réunie dans un jardin verdoyant" },
    { img: "/public/tableColoré.jpg", title: "Table colorée dressée pour une fête estivale" },
    { img: "/public/granderouepetit.jpeg", title: "Grande roue illuminée en arrière-plan d’un couple" },
    { img: "/public/potes2cv.jpg", title: "Groupe d’amis posant près d’une 2CV rétro" },
  ];

  return (
    <div>
      <h1>Galerie Publique</h1>
      <p>
        Bienvenue dans la galerie publique. Découvrez une sélection de nos plus
        belles photos, capturant des instants authentiques et chaleureux.
      </p>

      <ImageList sx={{ width: "100%", height: "auto" }} variant="woven" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              alt={item.title}
              title={item.title}
              loading="lazy"
              onClick={() => handleOpen(item)}
              style={{
                cursor: "pointer",
                objectFit: "cover",
                borderRadius: "12px",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Modal / Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        {selectedImage && (
          <div
            style={{
              position: "relative",
              padding: "16px",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            {/* Petite croix discrète */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                boxShadow: 1,
              }}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <img
              src={selectedImage.img}
              alt={selectedImage.title}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "16px",
              }}
            />
            <p style={{ marginTop: "10px", fontSize: "1.1rem" }}>{selectedImage.title}</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};
