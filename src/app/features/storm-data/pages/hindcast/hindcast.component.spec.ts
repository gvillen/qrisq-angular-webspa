/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HindcastPageComponent } from './hindcast.component';

describe('HindcastComponent', () => {
  let component: HindcastPageComponent;
  let fixture: ComponentFixture<HindcastPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HindcastPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HindcastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
