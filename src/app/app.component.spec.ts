import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { configureComponentTest } from './testing/configure-component-test';

describe('AppComponent', () => {
  beforeEach(async () => {
    await configureComponentTest(AppComponent);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
