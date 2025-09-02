import {jwtDecode} from "jwt-decode";   

export const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // en secondes 
    if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        return false;
    }else {
        return token;
    }
}

export const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    if (!checkToken()) return null;
    const decodedToken = jwtDecode(token);
    return decodedToken;
    
}