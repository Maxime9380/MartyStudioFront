import API from "./API"


export const loginUser = async (userData) => {
    try{    
        const response = await
    API.post('/login', userData);
    console.log(response.data);
    
    return response.data;
}catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
    
}
}

export const createUser = async (userData) => {
    try{
        const response = await API.post('/createUser', userData);
        // console.log(response);
    return response.data;
} catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return error;
}
}

