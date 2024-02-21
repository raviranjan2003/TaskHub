import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
    const user = useContext(AuthContext);
    return user;
}

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState({_id:"",username:"",name:"",email:""});
    return (
        <AuthContext.Provider value={{user, setUser}}>
            { props.children }
        </AuthContext.Provider>
    )
}