import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviReceptiComponent } from './svi-recepti.component';

describe('SviReceptiComponent', () => {
  let component: SviReceptiComponent;
  let fixture: ComponentFixture<SviReceptiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SviReceptiComponent]
    });
    fixture = TestBed.createComponent(SviReceptiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
