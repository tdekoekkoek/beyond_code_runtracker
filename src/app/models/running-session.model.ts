export interface RunningSession {
  id: string;
  distance: number;
  minutes: number;
  seconds: number;
  feeling: 'Strenuous' | 'Okay' | 'Good' | 'Great';
  date: string;
  createdAt: number;
}

