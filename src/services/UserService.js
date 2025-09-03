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

export const passwordOublie = async (userdata)=> {
    try {
        const response =await API.post('/passwordOublie',userdata);
        return response.data;
        
    } catch (error) {
        console.error("erreur password oublie",error);
        throw error;
        
    }
}

export const passwordReset = async(userdata,tokenReset) => {
    try {
        console.log('Réinitialisation du mot de passe avec token',tokenReset);
        const response = await API.post('/passwordReset',userdata,
            {
                headers:{
                    Authorization:tokenReset
                }
            }
        )
        return response.data;
        
    } catch (error) {
        console.error("erreur pour passwordReset",error)
        throw error;
        
    }
}

export default {
    loginUser,
    createUser,
    passwordOublie,
    passwordReset
}


