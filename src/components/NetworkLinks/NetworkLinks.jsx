import NetworkLink from '../NetworkLink/NetworkLink';
import css from './NetworkLinks.module.css'; 

const NetworkLinks = () => {
  return (
    <ul className={css.wrapper}>
      <li>
        <NetworkLink href='https://www.facebook.com/goITclub/' icon={`/networks.svg#facebook`} alt='Facebook'/>
      </li>
      <li>
        <NetworkLink href='https://www.instagram.com/goitclub/' icon={`/networks.svg#instagram`} alt='Instagram'/>
      </li>
      <li>
        <NetworkLink href='https://www.youtube.com/c/GoIT' icon={`/networks.svg#youtube`} alt='YouTube'/>
      </li>
    </ul>
  );
};

export default NetworkLinks;
