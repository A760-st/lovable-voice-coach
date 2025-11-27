export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  bodyPart: string;
  youtubeUrl: string;
  videoId: string;
}

export const exercises: Exercise[] = [
  {
    id: 'chest-beginner',
    title: 'Chest Workout for Beginners',
    description: 'Complete chest workout routine for building strength and muscle',
    duration: '15 min',
    difficulty: 'Beginner',
    bodyPart: 'Chest',
    youtubeUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    videoId: 'IODxDxX7oi4'
  },
  {
    id: 'back-intermediate',
    title: 'Back Workout at Home',
    description: 'Effective back exercises you can do without equipment',
    duration: '20 min',
    difficulty: 'Intermediate',
    bodyPart: 'Back',
    youtubeUrl: 'https://www.youtube.com/watch?v=B9OCxe2gBRY',
    videoId: 'B9OCxe2gBRY'
  },
  {
    id: 'legs-intermediate',
    title: 'Leg Workout Without Equipment',
    description: 'Complete leg workout targeting quads, hamstrings, and calves',
    duration: '25 min',
    difficulty: 'Intermediate',
    bodyPart: 'Legs',
    youtubeUrl: 'https://www.youtube.com/watch?v=mGvzVjudzXI',
    videoId: 'mGvzVjudzXI'
  },
  {
    id: 'glutes-beginner',
    title: 'Glute Activation Exercises',
    description: 'Targeted glute exercises for strength and activation',
    duration: '15 min',
    difficulty: 'Beginner',
    bodyPart: 'Glutes',
    youtubeUrl: 'https://www.youtube.com/watch?v=Sp0VbPVHP_E',
    videoId: 'Sp0VbPVHP_E'
  },
  {
    id: 'shoulders-intermediate',
    title: 'Shoulder Workout for Strength',
    description: 'Build strong and defined shoulders with this workout',
    duration: '18 min',
    difficulty: 'Intermediate',
    bodyPart: 'Shoulders',
    youtubeUrl: 'https://www.youtube.com/watch?v=A4hnCsuhKWc',
    videoId: 'A4hnCsuhKWc'
  },
  {
    id: 'biceps-beginner',
    title: 'Bicep Workout at Home',
    description: 'Effective bicep exercises for arm strength and definition',
    duration: '12 min',
    difficulty: 'Beginner',
    bodyPart: 'Biceps',
    youtubeUrl: 'https://www.youtube.com/watch?v=SALxEARiMkw',
    videoId: 'SALxEARiMkw'
  },
  {
    id: 'triceps-intermediate',
    title: 'Triceps Dips Workout',
    description: 'Master triceps dips and other tricep-focused exercises',
    duration: '10 min',
    difficulty: 'Intermediate',
    bodyPart: 'Triceps',
    youtubeUrl: 'https://www.youtube.com/watch?v=JhDQwU5dGuo',
    videoId: 'JhDQwU5dGuo'
  },
  {
    id: 'abs-beginner',
    title: '10-Minute Abs Workout',
    description: 'Quick and effective core strengthening routine',
    duration: '10 min',
    difficulty: 'Beginner',
    bodyPart: 'Core/Abs',
    youtubeUrl: 'https://www.youtube.com/watch?v=DHD1-2P94DI',
    videoId: 'DHD1-2P94DI'
  }
];
