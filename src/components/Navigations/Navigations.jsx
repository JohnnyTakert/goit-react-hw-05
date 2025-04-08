import { NavLink } from 'react-router-dom';
import css from './Navigations.module.css';
import clsx from 'clsx';
import Container from '../Container/Container';

const getNavStyle = item => {
  return clsx(css.link, item.isActive && css.active);
};

export const Navigations = () => {
  return (
    <Container>
      <header className={css.header}>
        <div className={css.box}>
          <nav>
            <ul className={css.nav}>
              <li>
                <NavLink to="/" className={getNavStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={getNavStyle}>
                  Movies
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </Container>
  );
};
