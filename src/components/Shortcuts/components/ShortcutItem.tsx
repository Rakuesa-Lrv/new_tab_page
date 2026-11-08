import classes from './ShortcutItem.module.css';

import globeIcon from '@/assets/globe.svg';

import useConfigStore, { type Shortcut } from '@/hooks/useConfigStore';
import useDisplayStore from '@/hooks/useDisplayStore';
import useStoreField from '@/hooks/useStoreField';

interface Props extends React.HTMLAttributes<HTMLDivElement>, Omit<Shortcut, 'id'> {
  isAdd?: boolean,
};

const ShortcutItem = ({
  url,
  iconUrl,
  name,
  isAdd
}: Props)=> {
  const { changeAdd } = useStoreField(useDisplayStore, ['changeAdd']);

  return (
    <a
      href={url}
      className={classes.item}
      onClick={
        isAdd
        ? (()=> {changeAdd('open')})
        : ((e)=> {e.preventDefault()})
      }
    >
      <div
        className={classes.icon}
      >
        <img 
          src={
            URL.canParse(iconUrl)
            ? iconUrl
            : globeIcon
          } 
          alt={name} />
      </div>
      <p
        className={classes.name}
      >{name}
      </p>
      {isAdd || (
        <div
          className={classes.operator}
        >

        </div>
      )}
    </a>
  )
}

export default ShortcutItem;