import classes from './ShortcutItem.module.css';

import globeIcon from '@/assets/globe.svg';
import { TextAlignJustifyIcon ,TrashIcon, Pencil1Icon, ResetIcon } from '@radix-ui/react-icons';

import useConfigStore, { type Shortcut } from '@/hooks/useConfigStore';
import useDisplayStore from '@/hooks/useDisplayStore';
import useStoreField from '@/hooks/useStoreField';

interface Props extends React.HTMLAttributes<HTMLDivElement>, Omit<Shortcut, 'id'> {
  tar: Shortcut['id'],
  isAdd?: boolean,
  isExample?: boolean,
  isReversed?: boolean,
};

const Positive = ({
  url,
  iconUrl,
  name,
  tar,
  isAdd,
}: Omit<Props, 'isReversed'>)=> {
  const { tar: reversedTar, dispatch } = useStoreField(useDisplayStore, [
    'tar',
    'dispatch'
  ]);

  return (
    <a
      href={url}
      className={classes.item}
      onClick={
        isAdd
        ? ((e)=> { 
          e.preventDefault(); 
          dispatch({ display: 'open', act: 'add' })
        })
        : undefined
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
    </a>
  )
}

const Negative = ({tar}: Pick<Props, 'tar'>)=> {
  const { tar: reversedTar, dispatch } = useStoreField(useDisplayStore, [
    'tar',
    'dispatch'
  ]);

  return (
    <div
      className={`${classes.item} ${classes.reversed}`}
    >
      <button 
        type='button'
        onClick={(e)=> {
          e.stopPropagation();
          dispatch({ display: 'open', act: 'update', tar: tar });
        }}
      >
        <Pencil1Icon /> <span>编辑</span>
      </button>
      <hr className={classes.separator} />
      <button 
        type='button'
        className={classes.deleteBtn}
        onClick={(e)=> {
          e.stopPropagation();
          dispatch({ display: 'open', act: 'delete', tar: tar });
        }}
      >
        <TrashIcon /> <span>删除</span>
      </button>
    </div>
  )
}

const ShortcutItem = (props: Props)=> {
  const isReversed = props.isReversed;
  
  const { showReverse, dispatch } = useStoreField(useDisplayStore, [
    'showReverse',
    'dispatch',
  ]);

  return (
    <div
      className={classes.card}
    >
      <div
        className={classes.contain}
        data-reversed={isReversed}
      >
        <Positive { ...props }/>
        {isReversed && <Negative tar={props.tar} />}
      </div>

      {props.isAdd || props.isExample || (
        <div
          className={classes.more}
          onClick={(e)=> {
            e.stopPropagation();
            dispatch({ display: 'swap', act: 'reverse', tar: props.tar });
          }}
        >
          {isReversed
            ? <ResetIcon />
            : <TextAlignJustifyIcon />
          }
        </div>
      )}
    </div>
  )
}

export default ShortcutItem;