import { Injectable, signal, computed } from '@angular/core';
import { RunningSession } from '../models/running-session.model';

@Injectable({ providedIn: 'root' })
export class RunningSessionService {
  private readonly STORAGE_KEY = 'running-sessions';

  private sessionsSignal = signal<RunningSession[]>([]);

  readonly sessions = this.sessionsSignal.asReadonly();

  readonly totalSessions = computed(() => this.sessions().length);

  readonly totalDistance = computed(() =>
    this.sessions().reduce((sum, session) => sum + session.distance, 0)
  );

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const sessions = JSON.parse(stored) as RunningSession[];
        this.sessionsSignal.set(sessions);
      } catch (error) {
        console.error('Failed to load sessions from localStorage', error);
        this.sessionsSignal.set([]);
      }
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.sessions()));
  }

  addSession(session: Omit<RunningSession, 'id' | 'createdAt'>): void {
    const newSession: RunningSession = {
      ...session,
      id: this.generateId(),
      createdAt: Date.now()
    };

    this.sessionsSignal.update(sessions => [...sessions, newSession]);
    this.saveToStorage();
  }

  deleteSession(id: string): void {
    this.sessionsSignal.update(sessions => sessions.filter(session => session.id !== id));
    this.saveToStorage();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
