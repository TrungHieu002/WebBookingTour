// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";
// enum CUSTOM {
//   THEME = 99,
// }
// Define a type for the slice state

// const langFromLocalStorage = localStorage.getItem("lang");
// const themeFromLocalStorage = localStorage.getItem("theme");
// const paletteFromLocalStorage = localStorage.getItem("palette");
// Define the initial state using that type
// const initialState: themeState = {
//   lang: langFromLocalStorage
//     ? (JSON.parse(langFromLocalStorage) as Language)
//     : Language.EN,
//   theme: themeFromLocalStorage
//     ? (JSON.parse(themeFromLocalStorage) as Themes)
//     : Themes.Cobalt,
//   palette: paletteFromLocalStorage
//     ? (JSON.parse(paletteFromLocalStorage) as Partial<IExtendedPalette>)
//     : getAllurePalettes(Themes.Cobalt).palette,
// };

// export const themeSlice = createSlice({
//   name: "ChangeTheme",
//   initialState,
//   reducers: {
//     changeLanguage: (state, action: PayloadAction<Language>) => {
//       state.lang = action.payload;
//       localStorage.setItem("lang", JSON.stringify(state.lang));
//     },
//     changeTheme: (state, action: PayloadAction<Themes>) => {
//       state.theme = action.payload;
//       localStorage.setItem("theme", JSON.stringify(state.theme));
//     },
//     changePalette: (
//       state,
//       action: PayloadAction<Partial<IExtendedPalette>>
//     ) => {
//       state.palette = action.payload;
//       localStorage.setItem("palette", JSON.stringify(state.palette));
//     },
//   },
// });

// export const { changeLanguage, changeTheme, changePalette } =
//   themeSlice.actions;

// export const selectLang = (state: RootState) => state.theme.lang;
// export const selectTheme = (state: RootState) => state.theme.theme;
// export const selectPalette = (state: RootState) => state.theme.palette;

// export default themeSlice.reducer;