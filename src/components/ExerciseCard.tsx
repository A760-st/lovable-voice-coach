import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink, Clock } from 'lucide-react';
import type { Exercise } from '@/data/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const openVideo = () => {
    window.open(exercise.youtubeUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden group hover:shadow-[var(--shadow-glow)] transition-all duration-300 border-border">
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img 
          src={`https://img.youtube.com/vi/${exercise.videoId}/maxresdefault.jpg`}
          alt={exercise.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to medium quality thumbnail
            e.currentTarget.src = `https://img.youtube.com/vi/${exercise.videoId}/mqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            size="lg" 
            onClick={openVideo}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Play className="h-5 w-5" fill="currentColor" />
            Watch Now
          </Button>
        </div>
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm"
        >
          {exercise.bodyPart}
        </Badge>
        <Badge 
          className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm"
        >
          {exercise.difficulty}
        </Badge>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {exercise.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {exercise.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{exercise.duration}</span>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
          >
            Track Progress
          </Button>
          <Button 
            onClick={openVideo}
            className="flex-1 gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Watch Video
          </Button>
        </div>
      </div>
    </Card>
  );
};
