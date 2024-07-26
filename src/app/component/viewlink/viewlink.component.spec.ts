import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlinkComponent } from './viewlink.component';

describe('ViewlinkComponent', () => {
  let component: ViewlinkComponent;
  let fixture: ComponentFixture<ViewlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
