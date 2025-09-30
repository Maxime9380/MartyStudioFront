import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { loginUser } from '../services/UserService';
import ModalInscription from '../components/ModalInscription';

const LoginPage = () => {
  const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openInscription, setOpenInscription] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (userData.password !== userData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setIsLoggedIn(true);
      navigate('/apropos');
    } catch (error) {
      setError('Échec de la connexion. Veuillez vérifier vos informations.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate('/connexion');
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center">
      <div className="row w-100 align-items-center">

        {/* Colonne gauche : Formulaire */}
        <div className="col-lg-6 col-md-6 d-flex justify-content-center">
          <div
            className="login-container card shadow-lg border-0 rounded-4 p-4"
            style={{ maxWidth: "500px", width: "95%" }}
          >
            <h2 className="text-center form-title mb-4">Connexion</h2>

            {!isLoggedIn ? (
              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="form-input-group mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Votre adresse email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                </Form.Group>

                {/* Mot de passe */}
                <Form.Group className="form-input-group mb-3" controlId="formBasicPassword">
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      required
                    />
                    <Button
                      style={{ backgroundColor: "#547897", borderColor: "#547897", color: "white" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Confirmation mot de passe */}
                <Form.Group className="form-input-group mb-3" controlId="formConfirmPassword">
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      value={userData.confirmPassword}
                      onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                      required
                    />
                    <Button
                      style={{ backgroundColor: "#547897", borderColor: "#547897", color: "white" }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "🙈" : "👁"}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Message d'erreur */}
                {error && <div className="error-message text-danger mb-2">{error}</div>}

                {/* Bouton Connexion */}
                <Button
                  type="submit"
                  className="w-100 login-button mt-2"
                  style={{ backgroundColor: "#3c5a76", borderColor: "#3c5a76", color: "white" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>

                {/* Liens secondaires */}
                <div className="mt-3 text-center">
                  <span
                    onClick={() => setOpenInscription(true)}
                    className="link-text me-2"
                    style={{ cursor: "pointer", color: "#547897", fontWeight: "500" }}
                    onMouseOver={e => e.currentTarget.style.color = "#3c5a76"}
                    onMouseOut={e => e.currentTarget.style.color = "#547897"}
                  >
                    Créer un compte
                  </span>
                  <span style={{ color: "#aaa" }}>|</span>
                  <a
                    href="/passwordOublie"
                    className="link-text ms-2"
                    style={{ color: "#547897", fontWeight: "500" }}
                    onMouseOver={e => e.currentTarget.style.color = "#3c5a76"}
                    onMouseOut={e => e.currentTarget.style.color = "#547897"}
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
              </Form>
            ) : (
              <div className="text-center">
                <h3>Vous êtes connecté</h3>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="mt-3"
                >
                  Se déconnecter
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite : Image */}
        <div className="col-lg-6 col-md-6 d-none d-md-block">
          <img
            src="/couplemain.jpeg"
            alt="Couple"
            className="img-fluid vh-100"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>

      {/* Modal inscription */}
      <ModalInscription
        open={openInscription}
        onClose={() => setOpenInscription(false)}
      />
    </div>
  );
};

export default LoginPage;

