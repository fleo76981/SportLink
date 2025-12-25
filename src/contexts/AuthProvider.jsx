import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AuthContext = createContext({
    user: null,
    loading: true,
    error: null,
    login: async () => { },
    register: async () => { },
    logout: async () => { }
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error("Login failed:", err);
            let message = "登入失敗";
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                message = "帳號或密碼錯誤";
            } else if (err.code === 'auth/invalid-email') {
                message = "電子郵件格式不正確";
            }
            setError(message);
            throw new Error(message);
        }
    };

    const register = async (email, password) => {
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error("Registration failed:", err);
            let message = "註冊失敗";
            if (err.code === 'auth/email-already-in-use') {
                message = "此電子郵件已被註冊";
            } else if (err.code === 'auth/weak-password') {
                message = "密碼強度不足（至少 6 位數）";
            }
            setError(message);
            throw new Error(message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
