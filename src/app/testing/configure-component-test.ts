import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

export function configureComponentTest<T>(component: Type<T>): Promise<void> {
  return TestBed.configureTestingModule({
    declarations: [component],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      RouterTestingModule,
      NoopAnimationsModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
  }).compileComponents();
}
