import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAndBalancesComponent } from './summary-and-balances.component';

describe('SummaryAndBalancesComponent', () => {
  let component: SummaryAndBalancesComponent;
  let fixture: ComponentFixture<SummaryAndBalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryAndBalancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryAndBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
