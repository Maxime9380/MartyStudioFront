import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import { useState } from "react";



export const passwordReset = () => {

    const [password,setPassword] = useState("");
    const tokenReset = useParams().resetToken;

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setPassword(formData.get("password"));

        console.log('réinitialisation du mot de passe',password);
        console.log("token de réinitialisation",tokenReset);

        UserService.passwordReset({password},tokenReset);
        
        
    }
      return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Réinitialiser le mot de passe
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Veuillez entrer votre nouveau mot de passe.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  );


}
export default passwordReset

