import { Link } from 'react-router-dom';
import css from './PathInfo.module.css';
import { ROUTERS } from '../../const';

const PathInfo = ({ breadcrumbs }) => {
  return (
    <ul className={css.wrapper}>
      <li>
        <Link to={ROUTERS.HOME}>HOME</Link>
      </li>
      {breadcrumbs.map((path, index) => {
        return (
          <li key={path?.name || index}>
            {path.to ? (
              <Link to={ROUTERS.HOME}>HOME</Link>
            ) : (
              <span className={css.current}>{path.name}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PathInfo;
