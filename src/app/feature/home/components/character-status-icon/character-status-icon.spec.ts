import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStatusIcon } from './character-status-icon';

describe('CharacterStatusIcon', () => {
  let component: CharacterStatusIcon;
  let fixture: ComponentFixture<CharacterStatusIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterStatusIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterStatusIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
