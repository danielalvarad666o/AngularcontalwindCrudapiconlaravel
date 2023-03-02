import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerconductorComponent } from './verconductor.component';

describe('VerconductorComponent', () => {
  let component: VerconductorComponent;
  let fixture: ComponentFixture<VerconductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerconductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerconductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
