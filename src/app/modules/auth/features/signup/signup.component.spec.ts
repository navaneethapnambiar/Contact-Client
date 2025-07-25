import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
