import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureComponentTest } from '../../testing/configure-component-test';

import { NotfoundComponent } from './notfound.component';

describe('NotfoundComponent', () => {
  let component: NotfoundComponent;
  let fixture: ComponentFixture<NotfoundComponent>;

  beforeEach(async () => {
    await configureComponentTest(NotfoundComponent);

    fixture = TestBed.createComponent(NotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
