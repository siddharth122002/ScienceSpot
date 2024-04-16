import {createContext,useState} from "react"

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [name,setName] = useState(null);
    return (
        <UserContext.Provider value = {{name,setName}}>
            {children}
        </UserContext.Provider>
    )
}
