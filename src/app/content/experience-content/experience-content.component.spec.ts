import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceContentComponent } from './experience-content.component';

describe('ExperienceContentComponent', () => {
  let component: ExperienceContentComponent;
  let fixture: ComponentFixture<ExperienceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
