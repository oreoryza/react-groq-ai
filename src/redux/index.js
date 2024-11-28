import { configureStore } from "@reduxjs/toolkit";
import groqReducer from "./async/groqSlice";
import themeReducer from "./slices/themeSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const encryptor = encryptTransform({
    secretKey: import.meta.env.VITE_SECRET_KEY,
    onError: function (error) {
      console.log(error);
    },
  });

const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryptor]
  };

const persistedGroq = persistReducer(persistConfig, groqReducer);
const persistedTheme = persistReducer(persistConfig, themeReducer);

const store = configureStore({
  reducer: {
    groq: persistedGroq,
    theme: persistedTheme
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };