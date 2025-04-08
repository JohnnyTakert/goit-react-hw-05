import css from './Heading.module.css';

export const Heading = ({ title }) => {
  return <h2 className={css.box}>{title}</h2>;
};
