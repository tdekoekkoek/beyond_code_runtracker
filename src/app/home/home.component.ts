import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { RunningSessionService } from '../services/running-session.service';
import { SessionCardComponent } from '../add-session/session-card/session-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SessionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);
  private sessionService = inject(RunningSessionService);

  sessions = this.sessionService.sessions;
  totalSessions = this.sessionService.totalSessions;
  totalDistance = this.sessionService.totalDistance;

  sortedSessions = computed(() => {
    return [...this.sessions()].sort((a, b) => b.createdAt - a.createdAt);
  });

  onAddSession(): void {
    this.router.navigate(['/add-session']);
  }

  onDeleteSession(id: string): void {
    this.sessionService.deleteSession(id);
  }
}
