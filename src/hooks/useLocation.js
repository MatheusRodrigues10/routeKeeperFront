import { useState, useEffect } from "react";
import { 
    Accuracy, 
    requestForegroundPermissionsAsync,  
    watchPositionAsync
} from "expo-location";

export default (shouldTrack, callback) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        let subscriber;
        //pede a permissão para rastrear.
        const startWatching = async () => {
            try {
                const { granted: foregroundGranted } = await requestForegroundPermissionsAsync();
                if (!foregroundGranted) {
                    throw new Error("Permissão de localização em primeiro plano não foi concedida.");
                }
    
                subscriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000, //update a cada segundo
                        distanceInterval: 10, //update a cada 10 metros.
                    }, 
                    callback    
                );
            } catch (e) {
                setError(e);
            }
        };
        
        //rastreia se shouldTrack for true
        if (shouldTrack) {
            startWatching();
        } else {
            //para de rastrear e limpa a função
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        //limpa sempre ao chamar novamente para não duplicar.
        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        }

    }, [shouldTrack, callback]);

    //seguindo a convenção
    return [error];
};