import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, Mail, Award, Users, TrendingUp } from 'lucide-react';

interface CoachProfileProps {
  name: string;
  title: string;
  specialty: string;
  experience: string;
  certifications: string[];
  linkedinUrl?: string;
  email?: string;
  stats: {
    athletes: number;
    successRate: string;
    yearsExperience: number;
  };
  avatarUrl?: string;
}

export const CoachProfile = ({ 
  name, 
  title, 
  specialty, 
  experience, 
  certifications,
  linkedinUrl,
  email,
  stats,
  avatarUrl
}: CoachProfileProps) => {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <Card className="p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-300 border-border">
      <div className="flex items-start gap-4">
        <Avatar className="h-20 w-20 border-2 border-primary">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-bold text-xl text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1">
              <Award className="h-3 w-3" />
              {specialty}
            </Badge>
            <Badge variant="outline">{experience}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 py-3 border-y border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary">
                <Users className="h-4 w-4" />
                <span className="font-bold">{stats.athletes}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Athletes</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-fitness-green">
                <TrendingUp className="h-4 w-4" />
                <span className="font-bold">{stats.successRate}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="font-bold text-secondary">{stats.yearsExperience}+</div>
              <p className="text-xs text-muted-foreground mt-1">Years Exp</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Certifications
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            {linkedinUrl && (
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
                onClick={() => window.open(linkedinUrl, '_blank')}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </Button>
            )}
            {email && (
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
                onClick={() => window.location.href = `mailto:${email}`}
              >
                <Mail className="h-4 w-4" />
                Contact
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
