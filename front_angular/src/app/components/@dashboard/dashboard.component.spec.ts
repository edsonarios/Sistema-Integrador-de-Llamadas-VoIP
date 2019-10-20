import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComp } from './dashboard.component';

describe('DashboardComp', () => {
  let component: DashboardComp;
  let fixture: ComponentFixture<DashboardComp>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComp ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
