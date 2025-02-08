'use client'
import React, { useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "regenerator-runtime/runtime";
import Listening from "@/components/Listening";

const SpeechToText = ({ onTranscriptChange, onResetRef,setListening }) => {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const silenceTimer = useRef(null); 
    const restartTimer = useRef(null);
    useEffect(()=>{
        setListening(listening);
    },[listening])
    useEffect(() => {
        onTranscriptChange(transcript);
        if (transcript.trim()) {
            clearTimeout(silenceTimer.current);
            silenceTimer.current = setTimeout(() => {
                console.log("Stopping due to silence...");
                SpeechRecognition.stopListening();
            }, 5000); // Stop after 5 seconds of silence
        }
    }, [transcript, onTranscriptChange]);

    useEffect(() => {
        onResetRef(resetTranscript);
    }, [onResetRef, resetTranscript]);

    // useEffect(() => {
    //     if (!listening && transcript.trim() === "") {
    //         restartTimer.current = setTimeout(() => {
    //             console.log("Restarting due to recognition failure...");
    //             SpeechRecognition.startListening({ continuous: true, interimResults: true });
    //         }, 1000); // Restart after 1 second if no speech was detected
    //     }
    //     return () => clearTimeout(restartTimer.current);
    // }, [listening, transcript]);

    if (!browserSupportsSpeechRecognition) {
        console.log("Speech recognition not supported...");
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="flex justify-center items-center">
            {!listening ? (
                <img
                    onClick={() => {
                        // resetTranscript();
                        SpeechRecognition.startListening({ continuous: true, interimResults: true });
                    }}
                    width={20}
                    height={20}
                    src="/mic.svg"
                    alt="mic"
                    className="mic-btn w-5 h-5 cursor-pointer"
                />
            ) : (
                <Listening
                    onClick={() => {
                        clearTimeout(silenceTimer.current);
                        clearTimeout(restartTimer.current);
                        SpeechRecognition.stopListening();
                    }}
                />
            )}
        </div>
    );
};

export default SpeechToText;
