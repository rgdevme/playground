import { TestBed } from '@angular/core/testing';
import { ShadesList } from '../components/shadesList/shadesList';
import { Topbar } from '../components/topbar/topbar';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Topbar, ShadesList],
    }).compileComponents();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toBeDefined();
  });
});
