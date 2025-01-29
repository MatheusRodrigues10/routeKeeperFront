import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

//reducer
const demoReducer = (state, action) => {
    switch (action.type) {
        case "fetch_tracks":
            return action.payload;
        case "add_track":
            return [...state, action.payload]
        case 'clear_data':
            return [];
        default:
            return state;
    }
};

//busca as rotas se elas existirem na memória
const fetchTracks = dispatch => async () => {
    const savedTracks = await AsyncStorage.getItem("demo_tracks");
    //se houver ele converte com json.parse se não exister ele retorna um array nulo.
    const allTracks = savedTracks ? JSON.parse(savedTracks) : [];
    dispatch({ type: "fetch_tracks", payload: allTracks })
};

//salva as rotas junto com as anteriores.
const saveDemoTrack = dispatch => async (name, locations) => {
    const newTrack = { name: name || "Sem nome", locations, _id: Date.now().toString() };
    const savedTracks = await AsyncStorage.getItem("demo_tracks");
    const allTracks = savedTracks ? JSON.parse(savedTracks) : [];
    const updatedTracks = [...allTracks, newTrack];
    //AsyncStorage salva apenas em string.
    await AsyncStorage.setItem("demo_tracks", JSON.stringify(updatedTracks));
    dispatch({ type: "add_track", payload: newTrack })
};

//remove a data, essencialmente usado ao sair do modo demo para otimização geral.
const clearData = dispatch => async () => {
    await AsyncStorage.removeItem("demo_tracks");
    dispatch({ type: 'clear_data' })
};

export const { Provider, Context } = createDataContext(
    demoReducer,
    { fetchTracks, saveDemoTrack, clearData },
    []
);