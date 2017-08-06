import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeagueDialogComponent } from './create-league-dialog.component';

describe('CreateLeagueDialogComponent', () => {
  let component: CreateLeagueDialogComponent;
  let fixture: ComponentFixture<CreateLeagueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeagueDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
