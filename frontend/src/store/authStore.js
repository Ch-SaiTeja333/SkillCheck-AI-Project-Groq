import {create} from 'zustand';
export const useAuthStore=create((set) =>({
    isAuthenticated:false,
    user:null,
    setIsAuthenticated:(value) => set({isAuthenticated:value}),
    setUser:(user) => set({user:user,isAuthenticated:true}),
    clearAuth:() => set({isAuthenticated:false,user:null})
}));