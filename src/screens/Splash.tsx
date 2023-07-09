import { StyleSheet } from 'react-native';
import { ResizeMode, Video } from "expo-av";
import { AVPlaybackStatus } from 'expo-av/build/AV.types';
import { useState } from 'react';
import { hideAsync } from 'expo-splash-screen';

type Props = {
    onComplete: (status: boolean) => void;
}

export function Splash({ onComplete }: Props){

    const [lastStatus, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);

function onPlaybackStatusUpdate(status: AVPlaybackStatus){

    if(status.isLoaded){
        if(lastStatus.isLoaded !== status.isLoaded){
            hideAsync();
        }

        if(status.didJustFinish){
            onComplete(true);
        }
    }

    setStatus(() => status);
}

    return (
        <Video 
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            source={require('../../assets/Splash.mp4')}
            isLooping={false}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        	shouldPlay={true}
            />
    )
}
