import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptDetaljnoComponent } from './recept-detaljno.component';

describe('ReceptDetaljnoComponent', () => {
  let component: ReceptDetaljnoComponent;
  let fixture: ComponentFixture<ReceptDetaljnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptDetaljnoComponent]
    });
    fixture = TestBed.createComponent(ReceptDetaljnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
