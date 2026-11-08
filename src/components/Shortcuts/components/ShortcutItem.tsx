import classes from './ShortcutItem.module.css';

import globeIcon from '@/assets/globe.svg';
import { TextAlignJustifyIcon ,TrashIcon, Pencil1Icon } from '@radix-ui/react-icons';

import useConfigStore, { type Shortcut } from '@/hooks/useConfigStore';
import useDisplayStore from '@/hooks/useDisplayStore';
import useStoreField from '@/hooks/useStoreField';

interface Props extends React.HTMLAttributes<HTMLDivElement>, Omit<Shortcut, 'id'> {
  tar: Shortcut['id'],
  isAdd?: boolean,
};

const ShortcutItem = ({
  url,
  iconUrl,
  name,
  tar,
  isAdd,
}: Props)=> {
  const { dispatch } = useStoreField(useDisplayStore, [
    'dispatch'
  ]);

  return (
    <div
      className={classes.item}
      onClick={
        isAdd
        ? (()=> {dispatch({ display: 'open', act: 'add' })})
        : ((e)=> {
          e.preventDefault();
          URL.canParse(url) && (location.href = url);
        })
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
          className={classes.more}
          onClick={(e)=> {
            e.stopPropagation();
            dispatch({ display: 'open', act: 'update', tar: tar });
          }}
        >
          <TextAlignJustifyIcon />
        </div>
      )}
    </div>
  )
}

export default ShortcutItem;