import React, { useContext, useState } from 'react'

// Contexts declaration
const AuthContext = React.createContext()
const AuthUpdateContext = React.createContext()
const AuthLogoffContext = React.createContext()
const AuthUserContext = React.createContext('')

// Custom Hooks
export const useAuth = () => {
    return useContext( AuthContext )
}

export const useUpdateAuth = () => {
    return useContext( AuthUpdateContext )
}

export const useLogoffAuth = () => {
    return useContext( AuthLogoffContext )
}

export const useUsername = () => {
    return useContext( AuthUserContext )
}

/**
 * Component AuthProvider
 * @param {Object} children
 * @returns JSX.Element
 */
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(false)

    const authenticate = () => setIsAuthenticated(true)

    const logoff = () => {
        setIsAuthenticated(false)
        localStorage.clear()
    }

    return (
        <AuthContext.Provider value={isAuthenticated}>
            <AuthUpdateContext.Provider value={authenticate}>
                <AuthLogoffContext.Provider value={logoff}>
                    <AuthUserContext.Provider value={username}>
                        {children}
                    </AuthUserContext.Provider>
                </AuthLogoffContext.Provider>
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}