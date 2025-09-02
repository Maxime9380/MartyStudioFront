import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'



export default function HomePage() {
    
  return (
    <div>
      {/* Hero Section */}
      <div className="position-relative"
      style={{width:"100%", height:"auto", overflow:"hidden"}}>
        <img
          src="/public/mariesmontagne.jpg"
          alt="hero"
          
          style={{ height: "auto",
            maxWidth: "100%",
             objectFit: "cover" }}
        />
        <h1
          
          style={{
            position:"absolute",
             top: "20%",
              left: "50%",
               transform: "translateX(-50%)",
              color: "#000000",
               fontSize: "5rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",fontFamily:"inspiration,cursive",
                padding:"10px",
           }}
        >
          Chez Marty Studio
        </h1>
      </div>

      {/* Présentation */}
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Texte */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h2>Présentation</h2>
            <p style={{ lineHeight: "1.6" }}>
                Bienvenue chez Marty Studio, votre destination de choix pour des
                photographies exceptionnelles. Je suis Lucie Marty, une
                photographe passionnée avec plus de 10 ans d'expérience dans le
                domaine. Mon objectif est de capturer vos moments les plus précieux
                avec authenticité et créativité. Que ce soit pour des mariages,
                des portraits, des événements spéciaux ou des séances en studio, je
                m'engage à fournir un service personnalisé et des images de haute
                qualité qui racontent votre histoire unique.
            </p>
          </div>

          {/* Image */}
          <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
            <img
              src="/lucie.jpeg"
              alt="portrait"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "300px", width: "80%" }}
            />
          </div>
        </div>
      </div>

{/* Mes Prestations */}
<div className="container py-5" style={{ backgroundColor: "#cde3c3", borderRadius: "16px" }}>
  <h2 className="mb-4 text-center">Mes Prestations</h2>
  <div className="row justify-content-center">

    {/* Card 1 */}
    <div className="col-12 col-md-6 mb-4 d-flex">
      <Card className="mx-auto h-100" style={{  borderRadius:"16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }}>
        <Card.Img variant="top" src="/public/couplemain.jpeg" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px",width:"100%", height: "200px", objectFit: "cover",objectPosition:"center" }}/>
        <Card.Body>
          <Card.Title>Mariages</Card.Title>
          <Card.Text>
            Capturer les moments magiques de votre journée spéciale avec des photos intemporelles et authentiques.
          </Card.Text>
          <Link to="/mariages">
          <Button variant="primary">En savoir plus</Button>
            </Link>
        </Card.Body>
      </Card>
    </div>

    {/* Card 2 */}
    <div className="col-12 col-md-6 mb-4 d-flex">
      <Card className="mx-auto h-100" style={{  borderRadius:"16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }}>
        <Card.Img variant="top" src="/public/couple.jpeg" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px", height: "200px", objectFit: "cover",width:"100%",objectPosition:"center" }}/>
        <Card.Body>
          <Card.Title>Séances Photo</Card.Title>
          <Card.Text>
            Des séances photo personnalisées pour capturer votre personnalité et votre style unique.
          </Card.Text>
          <Link to="/seance">
          <Button variant="primary">En savoir plus</Button>
            </Link>
        </Card.Body>
      </Card>
    </div>

    {/* Card 3 */}
    <div className="col-12 col-md-6 mb-4 d-flex">
      <Card className="mx-auto h-100" style={{  borderRadius:"16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }}>
        <Card.Img variant="top" src="/public/granderoue.jpeg" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px",width:"100%" ,height: "200px", objectFit: "cover",objectPosition:"center" }}/>
        <Card.Body>
          <Card.Title>Galeries</Card.Title>
          <Card.Text>
            Explorez mes galeries pour découvrir une variété de styles et d'approches photographiques.
          </Card.Text>
          <Link to="/galerie">
          <Button variant="primary">En savoir plus</Button>
            </Link>
        </Card.Body>
      </Card>
    </div>

    {/* Card 4 */}
    <div className="col-12 col-md-6 mb-4 d-flex">
      <Card className="mx-auto h-100" style={{  borderRadius:"16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }}>
        <Card.Img variant="top" src="/public/caravane.jpeg" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px",width:"100%" ,height: "200px", objectFit: "cover",objectPosition:"center" }}/>
        <Card.Body>
          <Card.Title>Photobooth</Card.Title>
          <Card.Text>
            Ajoutez une touche de fun à vos événements avec mon service de photobooth interactif.
          </Card.Text>
          <Link to="/photobooth">
          <Button variant="primary">En savoir plus</Button>
            </Link>
        </Card.Body>
      </Card>
    </div>

  </div>
</div>
        
        



      {/* Mon travail */}
      <div className="container py-5">
        <h2 className="mb-5 text-center">Mon travail de photographe</h2>
      
          {[
            {
              title: "🏠 Domicile",
              desc: "Shoot chez vous pour un rendu plus intimiste.",
              img: "/public/portraitinterieur.png",
            },
            {
              title: "🌳 Extérieur",
              desc: "Séances photos en extérieur, naturelles et spontanées.",
              img: "/public/photoextérieur.png",
            },
            {
              title: "📸 Studio",
              desc: "Séances photos en studio avec mise en scène.",
              img: "/public/photostudio.png",
            },
          ].map((item, index) => (
    <div className={"row align-items-center mb-5 fade-in-up"} key={index}
        style={{animationDelay: `${index * 0.3}s`}}>
      {index % 2 === 0 ? (
        <>
          {/* Image à gauche */}
          <div className="col-md-6 d-flex justify-content-start">
            <img
              src={item.img}
              alt={item.title}
             className="portfolio-img rounded-3 img-fluid w-100"
            />
          </div>
          {/* Texte à droite */}
          <div className="col-md-6 text-start">
            <h5>{item.title}</h5>
            <p>{item.desc}</p>
          </div>
        </>
      ) : (
        <>
          {/* Texte à gauche */}
          <div className="col-md-6 text-md-end text-start">
            <h5>{item.title}</h5>
            <p>{item.desc}</p>
          </div>
          {/* Image à droite */}
          <div className="col-md-6 d-flex justify-content-end">
            <img
              src={item.img}
              alt={item.title}
              className="portfolio-img rounded-3"
            />
          </div>
        </>
      )}
    </div>
  ))}
</div>

      {/* Call to Action */}
      <div className="container py-5 text-center">
        <Link to="/contact" style={{ textDecoration: 'none' }}>
        <button className="btn btn-secondary btn-lg">Prenez Contact</button>
        </Link>
      </div>
    </div>
    
  );
}

