import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonesComponent } from './pokemones-component';

describe('PokemonesComponent', () => {
  let component: PokemonesComponent;
  let fixture: ComponentFixture<PokemonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
