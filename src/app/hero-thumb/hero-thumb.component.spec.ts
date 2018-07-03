import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroThumbComponent } from './hero-thumb.component';

describe('HeroThumbComponent', () => {
  let component: HeroThumbComponent;
  let fixture: ComponentFixture<HeroThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroThumbComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
