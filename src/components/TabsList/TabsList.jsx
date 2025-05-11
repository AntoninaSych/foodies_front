import css from './TabsList.module.css';
import clsx from 'clsx';
import { PRIVATE_TABS, USER_TABS } from './const';

const TabsList = ({ isOwnProfile, currentTab, onChange }) => {
  const tabs = isOwnProfile ? PRIVATE_TABS : USER_TABS;

  const handleOnTabClick = tab => () => {
    onChange(tab);
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
