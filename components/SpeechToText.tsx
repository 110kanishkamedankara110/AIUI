'use client'
import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "regenerator-runtime/runtime"; // Fix for async issues
import Listening from "@/components/Listening";

const SpeechToText = ({ 
    onTranscriptChange, 
    onResetRef 
}: { 
    onTranscriptChange: (text: string) => void; 
    onResetRef: (resetFn: () => void) => void; // Send reset function to parent
}) => {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        onTranscriptChange(transcript); // Send transcript to parent
    }, [transcript, onTranscriptChange]);

    useEffect(() => {
        onResetRef(resetTranscript); // Pass reset function to parent
    }, [onResetRef, resetTranscript]);

    if (!browserSupportsSpeechRecognition) {
        console.log("not supported...")
        alert("not Supported...")
    }

    return (
        <div className="flex justify-center items-center">
            {!listening ? (
                <img
                    onClick={() => {
                        SpeechRecognition.startListening();
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
                        SpeechRecognition.stopListening();
                    }}
                />
            )}
        </div>
    );
};

export default SpeechToText;
