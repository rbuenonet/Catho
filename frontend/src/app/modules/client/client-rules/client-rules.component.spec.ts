import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRulesComponent } from './client-rules.component';

describe('ClientRulesComponent', () => {
  let component: ClientRulesComponent;
  let fixture: ComponentFixture<ClientRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
