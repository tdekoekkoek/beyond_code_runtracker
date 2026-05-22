# Angular v21 Project Guidelines

This project uses **Angular v21** with the following modern patterns and technologies:

- **Standalone Components** (no NgModules)
- **Signals** for reactive state management
- **Signal-based Inputs/Outputs** (`input()`, `output()`)
- **Vitest** for unit testing
- **SCSS** for styling

---

## ✅ DO: Use Standalone Components

All components should be standalone with explicit imports.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  // Component logic
}
```

### ❌ DON'T: Use NgModules

```typescript
// ❌ AVOID - Don't create NgModules
@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule],
  exports: [UserProfileComponent]
})
export class UserModule { }
```

---

## ✅ DO: Use Signals for State Management

Signals are the modern way to handle reactive state in Angular.

```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <p>Count: {{ count() }}</p>
      <p>Double: {{ doubleCount() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  // Writable signal
  count = signal(0);

  // Computed signal (derived state)
  doubleCount = computed(() => this.count() * 2);

  // Effect (side effects)
  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }

  increment() {
    this.count.update(value => value + 1);
  }
}
```

### Signal Patterns

```typescript
// Update signal
count.set(10);                          // Set to specific value
count.update(current => current + 1);   // Update based on current value

// Read signal value
const currentCount = count();

// Computed signals (automatically update when dependencies change)
const doubled = computed(() => count() * 2);
const isEven = computed(() => count() % 2 === 0);

// Effects (run side effects when signals change)
effect(() => {
  console.log('Current count:', count());
});
```

### ❌ DON'T: Use RxJS Observables for Simple State

```typescript
// ❌ AVOID - Don't use BehaviorSubject/Observables for simple state
import { BehaviorSubject } from 'rxjs';

export class OldCounterComponent {
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  increment() {
    this.countSubject.next(this.countSubject.value + 1);
  }
}
```

**Note:** RxJS is still useful for HTTP requests, complex async operations, and event streams. Use signals for component state.

---

## ✅ DO: Use Signal-based Input/Output

Use `input()`, `input.required()` for inputs and `output()` for outputs. These are signal-based and provide better type safety.

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div (click)="handleClick()">
      <h3>{{ name() }}</h3>
      <p>Age: {{ age() }}</p>
      <p>Email: {{ email() }}</p>
    </div>
  `
})
export class UserCardComponent {
  // Required signal input
  name = input.required<string>();

  // Optional signal input with default value
  age = input<number>(0);

  // Optional signal input (undefined if not provided)
  email = input<string>();

  // Signal-based output
  userClicked = output<string>();

  handleClick() {
    this.userClicked.emit(this.name());
  }
}
```

### Using the Component

```typescript
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent],
  template: `
    <app-user-card
      [name]="userName"
      [age]="25"
      [email]="userEmail"
      (userClicked)="onUserClick($event)"
    />
  `
})
export class UserListComponent {
  userName = 'John Doe';
  userEmail = 'john@example.com';

  onUserClick(name: string) {
    console.log('Clicked user:', name);
  }
}
```

### Input Signals in Computed Values

```typescript
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div>
      <p>Price: {{ price() }}</p>
      <p>Discount: {{ discount() }}%</p>
      <p>Final Price: {{ finalPrice() }}</p>
    </div>
  `
})
export class ProductCardComponent {
  price = input.required<number>();
  discount = input<number>(0);

  // Computed signal derived from input signals
  finalPrice = computed(() => {
    const discountAmount = this.price() * (this.discount() / 100);
    return this.price() - discountAmount;
  });
}
```

### ❌ DON'T: Use Decorator-based @Input/@Output

```typescript
// ❌ AVOID - Old decorator syntax
import { Input, Output, EventEmitter } from '@angular/core';

export class OldUserCardComponent {
  @Input() name: string = '';
  @Input() age: number = 0;
  @Output() userClicked = new EventEmitter<string>();
}
```

---

## ✅ DO: Use SCSS for Styling

Use `styleUrl` (singular) and SCSS features like nesting and variables.

```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'  // Note: styleUrl, not styleUrls
})
export class CardComponent { }
```

**card.component.scss:**
```scss
.card {
  padding: 1rem;
  border-radius: 8px;
  background: white;

  &__header {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__body {
    color: #666;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}
```

### ❌ DON'T: Use styleUrls (old plural form)

```typescript
// ❌ AVOID - Old syntax
@Component({
  styleUrls: ['./card.component.scss']  // Plural form is deprecated
})
```

---

## ✅ DO: Use Vitest for Testing

Write tests using Vitest instead of Karma/Jasmine.

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]  // Import standalone component
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CounterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should increment count', () => {
    const fixture = TestBed.createComponent(CounterComponent);
    const component = fixture.componentInstance;

    component.increment();
    expect(component.count()).toBe(1);
  });

  it('should compute double count', () => {
    const fixture = TestBed.createComponent(CounterComponent);
    const component = fixture.componentInstance;

    component.count.set(5);
    expect(component.doubleCount()).toBe(10);
  });
});
```

### Testing Components with Signal Inputs

```typescript
import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  it('should display user name', () => {
    const fixture = TestBed.createComponent(UserCardComponent);

    // Set input signals using setInput
    fixture.componentRef.setInput('name', 'John Doe');
    fixture.componentRef.setInput('age', 30);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toBe('John Doe');
  });

  it('should compute final price with discount', () => {
    const fixture = TestBed.createComponent(ProductCardComponent);

    fixture.componentRef.setInput('price', 100);
    fixture.componentRef.setInput('discount', 20);
    fixture.detectChanges();

    expect(fixture.componentInstance.finalPrice()).toBe(80);
  });
});
```

### ❌ DON'T: Use Jasmine/Karma patterns

```typescript
// ❌ AVOID - Don't configure NgModule declarations in tests
TestBed.configureTestingModule({
  declarations: [CounterComponent]  // Wrong for standalone components
});
```

---

## ✅ DO: Use inject() Function for Dependency Injection

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-view',
  standalone: true,
  template: `<div>{{ data() }}</div>`
})
export class DataViewComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  data = signal<string>('');

  loadData() {
    this.http.get('/api/data').subscribe(result => {
      this.data.set(result);
    });
  }
}
```

### ❌ DON'T: Use Constructor Injection (unless necessary)

```typescript
// ❌ LESS PREFERRED - Constructor injection is more verbose
constructor(
  private http: HttpClient,
  private router: Router
) { }
```

---

## Route Configuration

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)
  }
];
```

---

## Quick Reference

| Feature | ✅ Use | ❌ Avoid |
|---------|--------|----------|
| Components | `standalone: true` | `@NgModule` declarations |
| State | `signal()`, `computed()` | `BehaviorSubject` for simple state |
| Inputs | `input()`, `input.required()` | `@Input()` decorator |
| Outputs | `output()` | `@Output()` decorator |
| DI | `inject()` function | Constructor injection (when possible) |
| Styling | `styleUrl: './file.scss'` | `styleUrls: ['./file.scss']` |
| Testing | Vitest (`describe`, `it`, `expect`) | Jasmine/Karma |
| Reactivity | Signals + Effects | RxJS for everything |

---

## Common Patterns

### Service with Signals

```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users = signal<User[]>([]);

  readonly userCount = computed(() => this.users().length);
  readonly activeUsers = computed(() =>
    this.users().filter(u => u.active)
  );

  addUser(user: User) {
    this.users.update(current => [...current, user]);
  }

  removeUser(id: string) {
    this.users.update(current =>
      current.filter(u => u.id !== id)
    );
  }
}
```

### Form Handling with Signal Inputs

```typescript
import { Component, signal, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="username" name="username" [placeholder]="usernamePlaceholder()" />
      <input [(ngModel)]="password" name="password" type="password" />
      <button type="submit" [disabled]="submitDisabled()">Login</button>
    </form>
  `
})
export class LoginFormComponent {
  // Signal inputs
  usernamePlaceholder = input<string>('Enter username');
  submitDisabled = input<boolean>(false);

  // Signal outputs
  loginSubmit = output<{ username: string; password: string }>();

  // Local state
  username = signal('');
  password = signal('');

  onSubmit() {
    this.loginSubmit.emit({
      username: this.username(),
      password: this.password()
    });
  }
}
```

### Parent Component Using Signal Inputs/Outputs

```typescript
import { Component, signal } from '@angular/core';
import { LoginFormComponent } from './login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <app-login-form
      [usernamePlaceholder]="placeholder()"
      [submitDisabled]="isLoading()"
      (loginSubmit)="handleLogin($event)"
    />
  `
})
export class LoginPageComponent {
  placeholder = signal('Enter your username');
  isLoading = signal(false);

  handleLogin(credentials: { username: string; password: string }) {
    this.isLoading.set(true);
    console.log('Login with:', credentials);
    // Perform login logic
  }
}
```

---

Remember: Angular v21 emphasizes **simplicity**, **signals**, and **standalone components**. Always use signal-based inputs (`input()`, `input.required()`) and outputs (`output()`) instead of decorators.
