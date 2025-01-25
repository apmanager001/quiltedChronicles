import { create } from "zustand";


const ExpandStore = create((set) => ({
  expand: false,
  setExpand: () => set((state) => ({ expand: !state.expand })),
}));

export default ExpandStore