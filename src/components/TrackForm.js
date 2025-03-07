import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { 
        state: { name, recording, locations }, 
        startRecording, 
        stopRecording, 
        changeName 
    } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();

    return (
        <>
            <Spacer>
                <Input 
                    placeholder="Adicione um nome à rota"
                    onChangeText={changeName}
                    value={name}
                />
                {recording 
                    ? <Button
                        title="Parar" 
                        onPress={stopRecording}
                        buttonStyle={{ backgroundColor: 'red' }}
                    /> 
                    : <Button 
                        title="Começar a rastrear" 
                        onPress={startRecording}
                    />
                }
                <Spacer />
                {!recording && locations.length > 0 
                    ? <Button  
                        title="Salvar rastro"
                        onPress={saveTrack}
                    />
                    : null
                }
            </Spacer>
        </>
    );
};

export default TrackForm;
