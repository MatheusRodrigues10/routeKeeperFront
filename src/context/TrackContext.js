import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker"; 

//reducer
const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;
        default:
            return state;
    }
};

//busca as localizações do usuario.
const fetchTracks = dispatch => async () => {
    const response = await trackerApi.get('/tracks');
    dispatch({ type: 'fetch_tracks', payload: response.data });
};

//cria as rotas dentro do banco de dados e se não tiver nome coloca: sem nome
const createTrack = dispatch => async (name, locations) => {
    await trackerApi.post('/tracks', { name: name || "Sem Nome", locations });
};

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
);