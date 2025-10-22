import { TestBed } from '@angular/core/testing';
import { Calculator } from '../components/calculator';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Calculator],
    }).compileComponents();
  });

  it('should render calculator', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#calculator')).toBeDefined();
  });
});
