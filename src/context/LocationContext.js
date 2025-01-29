import createDataContext from "./createDataContext";

//valores iniciais
const defaultValues = {
    name: '',
    recording: false,
    locations: [],
    currentLocation: null
};

//reducer
const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_location':
            return { ...state, currentLocation: action.payload };
        case 'start_recording':
            return { ...state, recording: true };
        case 'stop_recording':
            return { ...state, recording: false };
        case 'add_location': 
            //pega a localização que já temos e adiciona a nova 
            return { ...state, locations: [...state.locations, action.payload] }
        case 'change_name':
            return { ...state, name: action.payload };
        case 'reset':
            return { ...state, name: '', locations: [] }
        default:
            return state;
    }
};

//reset na localização
const reset = dispatch => () => {
    dispatch({ type: 'reset' });
};

//adiciona nome a localização gravada
const changeName = dispatch => (name) => {
    dispatch({ type: 'change_name', payload: name });
};

//começa a gravar
const startRecording = dispatch => () => {
    dispatch({ type: 'start_recording' });
};

//para de gravar
const stopRecording = dispatch => () => {
    dispatch({ type: 'stop_recording' });
};

//adiciona a localização atual para rastrear o ponto inicial, se tiver gravando ele salva as localizações
const addLocation = dispatch => (location, recording) => {
    dispatch({ type: 'add_current_location', payload: location });
    if (recording) {
        dispatch({ type: 'add_location', payload: location })
    }
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation, changeName, reset },
    defaultValues
);