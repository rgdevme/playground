import chroma from 'chroma-js';
import { CSSProperties } from 'react';
import styles from './menu-item.module.css';
import projects from '../../assets/projects';

export const MenuItem = ({
  name,
  description,
  href,
  color = chroma('#595959')
}: typeof projects[number] & {
  color?: chroma.Color
}) => {
  let base = color.set('hsl.s', 1).set('hsl.l', 0.5)
  if (chroma.contrast(base, 'white') < 4.5) {
    base = base.set('hsl.s', 1).set('hsl.l', 0.38)
  }
  const c = base.hex()
  const b = base.alpha(0.5)
  const s = base.alpha(0.15).hex()

  return (
    <li className={styles.container} style={{ '--c': c, '--b': b, '--s': s } as CSSProperties}>
      <a href={href}>
        <div className={styles.wrapper}>
          <h2 className='label'>{name}</h2>
          {!description ? null : <p className='label'>{description}</p>}
        </div>
      </a>
    </li>
  );
}

export default MenuItem;
