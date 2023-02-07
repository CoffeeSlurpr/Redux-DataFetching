import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersReducer from "./slices/UsersSlice";
import albumsApi from "./apis/AlbumsAPI";
import photosApi from "./apis/PhotosAPI";

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(albumsApi.middleware).concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./thunks/UsersThunk";
export { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } from "./apis/AlbumsAPI";
export { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } from "./apis/PhotosAPI";
export default store;
