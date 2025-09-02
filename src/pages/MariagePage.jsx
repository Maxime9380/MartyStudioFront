
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-bootstrap/Carousel";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';





export const MariagePage = () => {
    const navigate = useNavigate();
    const images = [
        { src: "/public/costumepetit.jpeg", alt: "Image 1", caption: "Légende 1" },
        { src: "/public/couplemainpetit.jpeg", alt: "Image 2", caption: "Légende 2" },
        { src: "/public/robemariepetit.jpeg", alt: "Image 3", caption: "Légende 3" },
    ];
    return (
        <div className="text-center my-12 space-y-6">
  {/* Titre */}
  <h1 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide">
      Mariages 
  </h1>

  {/* Paragraphe */}
  <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
    Bienvenue sur la page dédiée aux mariages.  
    Découvrez des instants uniques, capturés avec émotion et élégance.  
  </p>

  {/* Carousel */}
  <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
    <Carousel fade interval={5000} controls indicators>
      {images.map((item, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100"
            src={item.src}
            alt={item.alt}
            style={{
              height: "550px",
            objectFit: "cover",
              filter: "brightness(90%)",
              width: "100%"
            }}
          />
         
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
  <div>
   <h2 className="text-3xl md:text-4xl font-serif text-gradient-to-r from-pink-400 via-rose-300 to-gold-300 mt-8 mb-6 text-center tracking-wide">
  Capturer l'Essence de Votre Journée Spéciale
</h2>
<p className="text-md md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-justify">
  Chez <span className="font-semibold text-pink-500">Marty Studio</span>, chaque mariage est une histoire unique, emplie d'émotions, de rires et de moments précieux. Notre mission est de capturer ces instants magiques avec une approche authentique et artistique.
  <br/><br/>
  🌸 <strong>Votre journée commence</strong> par les préparatifs : le doux parfum des fleurs, les rubans délicats, les éclats de rire des proches. Chaque détail est un souvenir en devenir.  
  <br/>
  💍 <strong>La cérémonie</strong> : les regards échangés, les mains qui se rejoignent, les émotions palpables. Nos photographes capturent ces moments intimes et éternels.  
  <br/>
  🎉 <strong>La célébration</strong> : rires, danses et toasts joyeux. Les lumières scintillantes, les bouquets colorés et la joie contagieuse sont sublimés par notre approche artistique.  
  <br/><br/>
  Nous utilisons des techniques modernes et un œil créatif pour créer des images qui racontent votre histoire d'amour de manière intemporelle. Chaque sourire, chaque larme de bonheur, chaque regard complice devient un souvenir précieux.
  <br/><br/>
  Explorez notre Galerie   pour découvrir comment nous avons aidé d'autres couples à revivre leur journée magique à travers des photographies vibrantes et pleines de vie.  
  <Button className="btn-pink" onClick={() => navigate('/contact')}>
      Contactez-nous
    </Button>
</p>






  </div>
</div>


    );
}