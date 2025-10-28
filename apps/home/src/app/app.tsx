import MenuItem from "../components/menu-item/menu-item";

export function App() {
  return (
    <div>
      <h1>My projects</h1>
      <div role="navigation">
        <ul>
          <MenuItem
            href="/apps/shades/browser/index.html"
            label="CSSvar Shades generator"
            description="Generate css variables for the main colors in your application. Made with Angular 2"
            color="#ff0080" />
        </ul>
      </div>
    </div>
  );
}

export default App;
