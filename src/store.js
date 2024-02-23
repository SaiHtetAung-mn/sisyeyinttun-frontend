import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import { persistReducer, createMigrate } from 'redux-persist'

import { scheduleReducer } from './feature'

const reducer = combineReducers({
    schedule: scheduleReducer
});

const migrations = {
    0: (state) => {
          // migration clear out device state
          console.log('Previous State:', ...state)
          return {
                ...state,
                device: undefined
          }
    },
    1: (state) => {
          // migration to keep only device state
          console.log("Migrated State:", state)
          return {
                device: state.device
          }
    }
}

const persistConfig = {
    key: 'sisYeYintTun',
    storage,
    version: 1,
    migrate: createMigrate(migrations, { debug: true }),
};

const rootReducer = (state, action) => {
    return reducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
                serializableCheck: false,
          }),
});
export default store