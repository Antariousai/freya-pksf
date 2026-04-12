"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseVoiceRecorderOptions {
  onFinalTranscript: (text: string) => void;
  onInterimTranscript: (text: string) => void;
  lang?: string;
}

export function useVoiceRecorder({
  onFinalTranscript,
  onInterimTranscript,
  lang = "en-US",
}: UseVoiceRecorderOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      setIsSupported(!!(w.SpeechRecognition ?? w.webkitSpeechRecognition));
    }
  }, []);

  const start = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new SR();
    recognition.continuous = false;     // single utterance — more reliable on mobile
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.maxAlternatives = 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript as string;
        if (event.results[i].isFinal) final += t;
        else interim += t;
      }
      if (interim) onInterimTranscript(interim);
      if (final) {
        onFinalTranscript(final.trim());
        onInterimTranscript("");
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      onInterimTranscript("");
    };

    recognition.onerror = () => {
      setIsRecording(false);
      onInterimTranscript("");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [lang, onFinalTranscript, onInterimTranscript]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    onInterimTranscript("");
  }, [onInterimTranscript]);

  const toggle = useCallback(() => {
    if (isRecording) stop();
    else start();
  }, [isRecording, start, stop]);

  return { isRecording, isSupported, toggle, stop };
}
