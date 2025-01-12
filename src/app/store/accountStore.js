import { create } from "zustand";


const accountStore = create((set) => ({
  middleColumn: "profile",
  rightColumn: "default",
  authorName: null,
  chapterId: null,

  setMiddleColumn: async (middleColumn) => {
    set({
      middleColumn: middleColumn,
    });
  },
  setLeftColumn: async (rightColumn) => {
    set({
      rightColumn: rightColumn,
    });
  },
  setAuthorName: async (authorName) => {
    set({
      authorName: authorName,
    });
  },
  setChapterId: async(chapterId) => {
    set({
        chapterId: chapterId
    })
  }
}));

export default accountStore