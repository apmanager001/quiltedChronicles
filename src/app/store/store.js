import { create } from "zustand";
import axiosInstance from "../../comps/utility/axios";

const useStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,

  validateSession: async (forceFetch = false) => {
    const storedUser = localStorage.getItem("user");
    const currentUser = get().user;

    if (!forceFetch && currentUser) {
      return;
    }

    if (!forceFetch && storedUser) {
      set({ user: JSON.parse(storedUser), loading: false });
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get("/profile");
      //   if (!response) throw new Error("Network response issue");

      const data = response.data;
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        set({ session: data, user: data, loading: false });
      } else {
        localStorage.removeItem("user");
        set({ user: null, loading: false });
      }
    } catch {
      localStorage.removeItem("user");
      set({ user: null, loading: false });
    }
  },

  updateUser: async () => {
    try {
      const response = await axiosInstance.get("/profile");
      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
  logout: async () => {
    localStorage.removeItem("user");
    set({ session: null, user: null });
  },
}));

export default useStore;
