import { Component, inject, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RunningSessionService } from '../services/running-session.service';

@Component({
  selector: 'app-add-session',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-session.component.html',
  styleUrl: './add-session.component.scss'
})
export class AddSessionComponent {
  private router = inject(Router);
  private sessionService = inject(RunningSessionService);

  form = new FormGroup({
    distance: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0.1), Validators.max(999)],
      nonNullable: true
    }),
    minutes: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0), Validators.max(999)],
      nonNullable: true
    }),
    seconds: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0), Validators.max(59)],
      nonNullable: true
    }),
    feeling: new FormControl<string>('good', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  get isFormValid(): boolean {
    const isValid = this.form.valid;
    const minutesValue = this.form.controls.minutes.value;
    const secondsValue = this.form.controls.seconds.value;
    const hasTime = minutesValue > 0 || secondsValue > 0;

    return isValid && hasTime;
  }

  onSubmit(): void {
    if (!this.isFormValid) {
      return;
    }

    const formValue = {
      distance: this.form.controls.distance.value,
      minutes: this.form.controls.minutes.value,
      seconds: this.form.controls.seconds.value,
      feeling: this.form.controls.feeling.value as 'Strenuous' | 'Okay' | 'Good' | 'Great',
      date: new Date().toISOString()
    };

    this.sessionService.addSession(formValue);
    this.router.navigate(['/home']);
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }
}
