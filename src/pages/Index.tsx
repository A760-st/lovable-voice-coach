import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExerciseCard } from '@/components/ExerciseCard';
import { CoachProfile } from '@/components/CoachProfile';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { exercises } from '@/data/exercises';
import { Activity, Target, Zap, Users, Dumbbell, TrendingUp } from 'lucide-react';

const Index = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const filteredExercises = selectedBodyPart
    ? exercises.filter(ex => ex.bodyPart === selectedBodyPart)
    : exercises;

  const handleVoiceCommand = (command: string) => {
    console.log('Processing voice command:', command);
    
    // Handle workout-related commands
    if (command.includes('chest')) {
      setSelectedBodyPart('Chest');
    } else if (command.includes('back')) {
      setSelectedBodyPart('Back');
    } else if (command.includes('leg')) {
      setSelectedBodyPart('Legs');
    } else if (command.includes('abs') || command.includes('core')) {
      setSelectedBodyPart('Core/Abs');
    } else if (command.includes('show all') || command.includes('reset')) {
      setSelectedBodyPart(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Voice Assistant */}
      <VoiceAssistant onCommand={handleVoiceCommand} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Athletic Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              Your Digital{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Fitness Twin
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-driven performance tracking, gamified training leagues, and personalized coaching—all in one revolutionary platform
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg px-8 shadow-[var(--shadow-glow)]">
                <Zap className="h-5 w-5" />
                Start Training
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              {[
                { icon: Users, label: 'Active Athletes', value: '10k+' },
                { icon: Target, label: 'Sports Covered', value: '25+' },
                { icon: TrendingUp, label: 'Performance Boost', value: '98%' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Library */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Dumbbell className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Exercise Library</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Targeted Workout Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional workout videos with proper form guidance. Try saying "Hey Alexa, show me chest exercises"
            </p>
          </div>

          {/* Body Part Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Button
              variant={selectedBodyPart === null ? "default" : "outline"}
              onClick={() => setSelectedBodyPart(null)}
            >
              All Exercises
            </Button>
            {Array.from(new Set(exercises.map(ex => ex.bodyPart))).map(bodyPart => (
              <Button
                key={bodyPart}
                variant={selectedBodyPart === bodyPart ? "default" : "outline"}
                onClick={() => setSelectedBodyPart(bodyPart)}
              >
                {bodyPart}
              </Button>
            ))}
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExercises.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Meet Your Expert Coaches
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Certified professionals ready to help you reach your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <CoachProfile
              name="Sarah Johnson"
              title="Head Strength & Conditioning Coach"
              specialty="Olympic Weightlifting"
              experience="12+ Years"
              certifications={['NSCA-CSCS', 'USAW Level 2', 'Precision Nutrition']}
              linkedinUrl="https://www.linkedin.com/in/example"
              email="sarah.johnson@fitness.com"
              stats={{
                athletes: 150,
                successRate: '96%',
                yearsExperience: 12
              }}
            />
            <CoachProfile
              name="Mike Chen"
              title="Performance & Recovery Specialist"
              specialty="Sports Rehabilitation"
              experience="10+ Years"
              certifications={['NASM-PES', 'CSCS', 'FMS Level 2']}
              linkedinUrl="https://www.linkedin.com/in/example"
              email="mike.chen@fitness.com"
              stats={{
                athletes: 120,
                successRate: '94%',
                yearsExperience: 10
              }}
            />
          </div>
        </div>
      </section>

      {/* Voice Assistant Info */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Voice Commands Available
          </h3>
          <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
            {[
              'Hey Alexa, show me chest exercises',
              'Hey Alexa, what time is it?',
              'Hey Alexa, tell me a joke',
              'Hey Alexa, help',
            ].map((command, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground"
              >
                "{command}"
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
