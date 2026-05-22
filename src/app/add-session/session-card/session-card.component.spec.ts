import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SessionCardComponent } from './session-card.component';

describe('SessionCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCardComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SessionCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
