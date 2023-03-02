import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearconductorComponent } from './crearconductor.component';

describe('CrearconductorComponent', () => {
  let component: CrearconductorComponent;
  let fixture: ComponentFixture<CrearconductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearconductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearconductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
