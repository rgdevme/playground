import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShadesList } from './shadesList';

describe('ShadesList', () => {
  let component: ShadesList;
  let fixture: ComponentFixture<ShadesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadesList],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
