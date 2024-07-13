import { createContext, useContext, useEffect, useState } from "react";

export const AuthContest = createContext();

export const AuthProvider = ({children}) =>{
    
    const [user, setUser] = useState("");
    const [listings, setListing] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const storetokenInLS = (serverToken) =>{
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    // console.log(user);

    const LogoutUser = () =>{
        setToken("");
        return localStorage.removeItem("token");
    };

    // Authentication - to get the current user data

    const userAuthentication = async () =>{
        try {
            const response = await fetch("http://localhost:3000/user/user",{
                method: "GET",
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            if(response.ok)
            {
                const data = await response.json();
                console.log("user data",data.userData);
                setUser(data.userData);
            }

        } catch (error) {
            console.error("Error fetching user data")
            
        }
    }


    useEffect(() =>{
        userAuthentication();
    },[]);

    return <AuthContest.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user}}>
        {children}
    </AuthContest.Provider>
}

export const useAuth = () =>{
    const AuthContestValue = useContext(AuthContest);
    if(!AuthContestValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return AuthContestValue;
}