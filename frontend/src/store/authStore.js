import {create} from 'zustand';
export const useAuthStore=create((set) =>({
    isAuthenticated:false,
    isLoading:true,
    user:null,
    setIsAuthenticated:(value) => set({isAuthenticated:value,isLoading:false}),
    setIsLoading:(value) => set({isLoading:value}),
    setUser:(user) => set({user:user,isAuthenticated:true , isLoading:false}),
    clearAuth:() => set({isAuthenticated:false,user:null,isLoading:false})
}));