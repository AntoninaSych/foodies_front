import css from './TabsList.module.css';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectUser } from '../../redux/auth/selectors';
import { PRIVATE_TABS, USER_TABS } from './const';
import { useParams } from 'react-router-dom';

const TabsList = ({ currentTab, onChange }) => {
  const { id } = useParams();
  const authUser = useSelector(selectUser);
  const current = authUser.id === id;
  const tabs = current ? PRIVATE_TABS : USER_TABS;

  const handleOnTabClick = tab => () => {
    onChange && onChange(tab);
  };

  return (
    <div className={css.wrapper}>
      <div className={css.tabs}>
        {tabs.map(({ tab, label }) => (
          <button
            key={tab}
            onClick={handleOnTabClick(tab)}
            className={clsx(css.tab, { [css.active]: currentTab === tab })}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsList;
