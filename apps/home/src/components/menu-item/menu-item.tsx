import chroma from 'chroma-js';
import { CSSProperties } from 'react';
import styles from './menu-item.module.css';

export const MenuItem = ({
  label,
  description,
  href,
  color = '#595959'
}: {
  label: string,
  href: string,
  description?: string,
  color?: chroma.ChromaInput
}) => {
  const c = chroma(color)
  return (
    <li className={styles.container} style={{ '--c': c.hex(), '--b': c.alpha(0.5).hex(), '--s': c.alpha(0.25).hex() } as CSSProperties}>
      <a href={href}>
        <div className={styles.wrapper}>
          <h2 className='label'>{label}</h2>
          {!description ? null : <p className='label'>{description}</p>}
        </div>
      </a>
    </li>
  );
}

export default MenuItem;
