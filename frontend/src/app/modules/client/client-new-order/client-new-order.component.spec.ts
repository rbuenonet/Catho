import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNewOrderComponent } from './client-new-order.component';

describe('ClientNewOrderComponent', () => {
  let component: ClientNewOrderComponent;
  let fixture: ComponentFixture<ClientNewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientNewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
