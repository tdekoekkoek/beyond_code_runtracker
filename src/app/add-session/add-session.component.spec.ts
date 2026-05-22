import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AddSessionComponent } from './add-session.component';

describe('AddSessionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSessionComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AddSessionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
