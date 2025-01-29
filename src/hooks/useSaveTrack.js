import { useContext } from "react";
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext'
import { Context as AuthContext } from "../context/AuthContext";
import { Context as DemoContext } from "../context/DemoContext";
import { navigate } from "../navigatorRef";

export default () => {
    const { createTrack } = useContext(TrackContext);
    const { 
        state: { locations, name },
        reset
    } = useContext(LocationContext);

    const { state: { demoMode } } = useContext(AuthContext);
    const { saveDemoTrack } = useContext(DemoContext);

    const saveTrack = async () => {
        try {
            //salva no asyncStorage
            if (demoMode) {
                await saveDemoTrack(name, locations);
            } 
            //salva na nuvem.
            else {
                await createTrack(name, locations);
            }
            reset();
            navigate('TrackList');
        } catch (err) {
            console.log(err)
        }   
    };
    //qualquer componente pode usar para salvar.
    return [saveTrack];
};