import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShadeSelector } from './shadeSelector';

describe('ShadeSelector', () => {
  let component: ShadeSelector;
  let fixture: ComponentFixture<ShadeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadeSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadeSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
