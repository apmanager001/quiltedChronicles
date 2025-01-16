import {create} from 'zustand'
import axiosInstance from '../../comps/utility/axios'


const useStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,
  validateSession: async () => { 
    const currentUser = get().user; 
    if (currentUser) { 
        console.log("User already logged in"); return;}
    set({ loading: true }); 
    try { 
        const response = await axiosInstance.get('/profile'); 
        if (!response) { 
            throw new Error('Network response issue'); 
        } 
        const data = await response.data; 
        set({ 
            session: data, 
            user: data, 
            loading: false, 
        }); 
        console.log(data); 
        console.log("userContext logged in"); 
    } catch (error) { 
        // console.error("Error fetching user:", error); 
        set({ user: null, loading: false }); 
        }
    },
    updateUser: async () => { 
        try { 
            const response = await axiosInstance.get('/profile'); 
            const data = await response.data; 
            set({ user: data }); 
        } catch (error) { 
            // console.error("Error updating user:", error); 
        } 
    }
}));

export default useStore;