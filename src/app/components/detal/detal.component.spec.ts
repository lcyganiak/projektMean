import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalComponent } from './detal.component';

describe('DetalComponent', () => {
  let component: DetalComponent;
  let fixture: ComponentFixture<DetalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
