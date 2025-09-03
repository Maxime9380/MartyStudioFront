import { useState } from "react"
import UserService from '../services/UserService'

export const passwordOublie =() => {
const [email,setEmail]= useState('');

const handleSubmit = (event)=>{
    event.preventDefault();
    const formData = new FormData(event.target);
    setEmail(formData.get("email"));

    console.log('Réinitialisation du mot de passe pour l/`email',email);

    UserService.passwordOublie({email});
    
}

 return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-3">🔑 Mot de passe oublié</h2>
          <p className="card-text text-center text-muted mb-4">
            Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Adresse e-mail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Réinitialiser le mot de passe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default passwordOublie

