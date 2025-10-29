import chroma from 'chroma-js';
import project from '../assets/projects';
import MenuItem from "../components/menu-item/menu-item";
import styles from './app.module.css'

export function App() {
  return (
    <div className={styles.container}>
      <h1>My projects</h1>
      <div role="navigation" className={styles.list}>
        {project.map(project =>
          <ul key={project.href}>
            <MenuItem {...project} color={chroma.random()} />
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
