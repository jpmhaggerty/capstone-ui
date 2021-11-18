import { createContext } from 'react'

export const AppContext = createContext(null);

const baseURL = 'https://localhost:3000';

const AppContextProvider = ({children}) => {

    const patch = (url, input) => {
        fetch(baseURL + url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(input)
        });
    };

    const valueObj = {
        patch
    }

    return(
        <AppContext.Provider value={valueObj}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;