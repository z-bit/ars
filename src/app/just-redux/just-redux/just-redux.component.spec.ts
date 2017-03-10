import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustReduxComponent } from './just-redux.component';

describe('JustReduxComponent', () => {
  let component: JustReduxComponent;
  let fixture: ComponentFixture<JustReduxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustReduxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustReduxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
