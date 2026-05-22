import { Component, input, output } from '@angular/core';
import { RunningSession } from '../../models/running-session.model';

@Component({
  selector: 'app-session-card',
  standalone: true,
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.scss'
})
export class SessionCardComponent {
  session = input.required<RunningSession>();
  deleteClicked = output<string>();

  formatTime(minutes: number, seconds: number): string {
    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  onDeleteClick(): void {
    if (confirm('Are you sure you want to delete this running session?')) {
      this.deleteClicked.emit(this.session().id);
    }
  }
}
