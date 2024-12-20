import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailedViewComponent } from './project-detailed-view.component';

describe('ProjectDetailedViewComponent', () => {
  let component: ProjectDetailedViewComponent;
  let fixture: ComponentFixture<ProjectDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailedViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
