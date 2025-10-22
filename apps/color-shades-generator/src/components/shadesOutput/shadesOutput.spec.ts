import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShadesOutput } from './shadesOutput';

describe('ShadesOutput', () => {
  let component: ShadesOutput;
  let fixture: ComponentFixture<ShadesOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadesOutput],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadesOutput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
