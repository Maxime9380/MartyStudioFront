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

  const [showPassword, setShowPassword] = useState(false); // 👈 état pour afficher/masquer
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 pour confirmation aussi

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
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
                <Form.Group className="form-input-group mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Votre adresse email"
                    value={userData.email}
                    onChange={(event) =>
                      setUserData({ ...userData, email: event.target.value })
                    }
                    required
                  />
                </Form.Group>

                {/* Mot de passe avec bouton 👁 */}
                <Form.Group className="form-input-group mb-3" controlId="formBasicPassword">
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Votre mot de passe"
                      value={userData.password}
                      onChange={(event) =>
                        setUserData({ ...userData, password: event.target.value })
                      }
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Confirmation mot de passe avec bouton 👁 */}
                <Form.Group className="form-input-group mb-3" controlId="formConfirmPassword">
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmez votre mot de passe"
                      value={userData.confirmPassword}
                      onChange={(event) =>
                        setUserData({ ...userData, confirmPassword: event.target.value })
                      }
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "🙈" : "👁"}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {error && <div className="error-message text-danger mb-2">{error}</div>}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 login-button mt-2"
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

                <div className="mt-3 text-center">
                  <span
                    onClick={() => setOpenInscription(true)}
                    className="link-text me-2"
                    style={{ cursor: "pointer", color: "#0d6efd" }}
                  >
                    Créer un compte
                  </span>
                  <span style={{ color: "#aaa" }}>|</span>
                  <a href="/passwordOublie" className="link-text ms-2">
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