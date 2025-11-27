import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { cn } from '@/lib/utils';

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
}

export const VoiceAssistant = ({ onCommand }: VoiceAssistantProps) => {
  const { isListening, isSpeaking, transcript, toggleListening } = useVoiceAssistant({ onCommand });

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {transcript && isListening && (
        <div className="bg-card border border-border rounded-lg p-4 max-w-xs shadow-lg animate-in slide-in-from-bottom-4">
          <p className="text-sm text-muted-foreground mb-1">You said:</p>
          <p className="text-foreground">{transcript}</p>
        </div>
      )}
      
      <Button
        onClick={toggleListening}
        size="lg"
        className={cn(
          "rounded-full h-16 w-16 shadow-[var(--shadow-glow)] transition-all duration-300",
          isListening && "animate-pulse bg-accent hover:bg-accent/90",
          !isListening && "bg-primary hover:bg-primary/90"
        )}
      >
        {isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>

      {isSpeaking && (
        <div className="absolute -top-16 right-0 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-secondary animate-pulse" />
          <span className="text-sm font-medium text-secondary">Alexa speaking...</span>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {isListening ? "Say 'Hey Alexa' or 'Hey Fitness'" : "Click to activate voice"}
        </p>
      </div>
    </div>
  );
};
