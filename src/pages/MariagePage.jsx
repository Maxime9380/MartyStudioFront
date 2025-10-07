
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
        { src: "/public/mariéJardin.jpg", alt: "Image 4", caption: "Légende 4" },
        { src: "/public/mariéJeux.png", alt: "Image 5", caption: "Légende 5" },
        { src: "/public/mariétémoin.png", alt: "Image 6", caption: "Légende 6" },
    ];

    const buttonStyle = {
        backgroundColor: "#3c5a76",
        borderColor: "#3c5a76",
        color: "white"
    };

    return (
        <div className="text-center my-12 space-y-8">
            {/* Titre */}
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide">
                Mariages 
            </h1>

            {/* Paragraphe */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Bienvenue sur la page dédiée aux mariages. Découvrez des instants uniques, capturés avec émotion et élégance.
            </p>

      {/* Carousel */}
{/* Carousel */}
<div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
  <Carousel fade interval={5000} controls indicators>
    {images.map((item, i) => (
      <Carousel.Item key={i}>
        <div className="bg-black flex justify-center items-center">
          <img
            className="w-full max-w-full h-auto max-h-[60vh] object-contain brightness-90"
            src={item.src}
            alt={item.alt}
          />
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
</div>



            {/* Section description */}
           <div className="max-w-2xl mx-auto text-justify space-y-8 leading-relaxed text-gray-700">
    <h2 className="text-3xl md:text-4xl font-serif text-center tracking-wide mb-6">
        Capturer l'Essence de Votre Journée Spéciale
    </h2>

    <p>
        Chez <span className="font-semibold text-pink-500">Marty Studio</span>, chaque mariage est une histoire unique, emplie d'émotions, de rires et de moments précieux. Notre mission est de capturer ces instants magiques avec une approche authentique et artistique.
    </p>

    <ul className="list-disc list-inside space-y-3">
        <li>🌸 <strong>Préparatifs :</strong> le doux parfum des fleurs, les rubans délicats, les éclats de rire des proches. Chaque détail est un souvenir en devenir.</li>
        <li>💍 <strong>Cérémonie :</strong> les regards échangés, les mains qui se rejoignent, les émotions palpables. Nos photographes capturent ces moments intimes et éternels.</li>
        <li>🎉 <strong>Célébration :</strong> rires, danses et toasts joyeux. Les lumières scintillantes, les bouquets colorés et la joie contagieuse sont sublimés par notre approche artistique.</li>
    </ul>

    <p>
        Nous utilisons des techniques modernes et un œil créatif pour créer des images qui racontent votre histoire d'amour de manière intemporelle. Chaque sourire, chaque larme de bonheur, chaque regard complice devient un souvenir précieux.
    </p>

    <p>
        Explorez notre Galerie pour découvrir comment nous avons aidé d'autres couples à revivre leur journée magique à travers des photographies vibrantes et pleines de vie.
    </p>

    <div className="text-center mt-6">
        <Button style={{ backgroundColor: "#3c5a76", borderColor: "#3c5a76", color: "white" }} onClick={() => navigate('/contact')}>
            Contactez-nous
        </Button>
    </div>
</div>
        </div>
    );
}
