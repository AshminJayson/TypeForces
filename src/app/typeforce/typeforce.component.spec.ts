import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeforceComponent } from './typeforce.component';

describe('TypeforceComponent', () => {
  let component: TypeforceComponent;
  let fixture: ComponentFixture<TypeforceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeforceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
