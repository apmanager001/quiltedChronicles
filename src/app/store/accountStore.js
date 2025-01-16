import { create } from "zustand";


const accountStore = create((set) => ({
  middleColumn: "chapter",
 
  setMiddleColumn: async (middleColumn) => {
    set({
      middleColumn: middleColumn,
    });
  },
}));

export default accountStore