import { useState, useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface VoiceAssistantOptions {
  onCommand?: (command: string) => void;
}

export const useVoiceAssistant = ({ onCommand }: VoiceAssistantOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        const command = transcriptText.toLowerCase();
        console.log('Voice command:', command);
        
        if (command.includes('alexa') || command.includes('hey fitness')) {
          const cleanCommand = command.replace(/alexa|hey fitness/gi, '').trim();
          processCommand(cleanCommand);
          onCommand?.(cleanCommand);
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use voice commands.",
          variant: "destructive",
        });
      }
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Restart if still listening
      }
    };

    recognitionRef.current = recognition;
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, onCommand]);

  const speak = (text: string) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to use a female voice
    const voices = synthRef.current.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') ||
      voice.name.includes('Victoria')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    console.log('Alexa:', text);
    synthRef.current.speak(utterance);
  };

  const processCommand = (command: string) => {
    if (!command) return;

    if (command.includes('time')) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      speak(`The current time is ${timeStr}`);
    } 
    else if (command.includes('date')) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      speak(`Today is ${dateStr}`);
    }
    else if (command.includes('joke')) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I'm reading a book about anti-gravity. It's impossible to put down!",
        "Why did the gym close down? It just didn't work out!",
        "I told my trainer I wanted to try a tough workout. He said, 'Try running 5 miles!' I said, 'I'll think about it while I'm sitting here.'"
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      speak(randomJoke);
    }
    else if (command.includes('workout') || command.includes('exercise')) {
      speak("I can help you find the perfect workout. Try saying 'show me chest exercises' or 'I want to work on my legs'");
    }
    else if (command.includes('chest')) {
      speak("I found a great chest workout for you. Check out the chest workout for beginners - it's a complete routine for building strength and muscle.");
    }
    else if (command.includes('leg') || command.includes('legs')) {
      speak("I found a leg workout without equipment for you. It targets quads, hamstrings, and calves.");
    }
    else if (command.includes('back')) {
      speak("I found a back workout at home for you. These are effective exercises you can do without equipment.");
    }
    else if (command.includes('abs') || command.includes('core')) {
      speak("I found a 10-minute abs workout for you. It's a quick and effective core strengthening routine.");
    }
    else if (command.includes('help')) {
      speak("I can help you find workouts, tell you the time, tell jokes, and more. Just say 'Hey Alexa' followed by your command.");
    }
    else if (command) {
      speak(`I heard you say: ${command}. I can help with workouts, time, jokes, and more. Say 'help' to learn what I can do.`);
    }
  };

  const startListening = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        speak("Voice assistant activated. How can I help you with your fitness today?");
        
        toast({
          title: "Voice Assistant Active",
          description: "Say 'Hey Alexa' or 'Hey Fitness' followed by your command",
        });
      }
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      toast({
        title: "Error",
        description: "Failed to start voice recognition. Please check microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      speak("Voice assistant deactivated");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    toggleListening,
    speak
  };
};
