import classes from './Shortcuts.module.css';

import plusIcon from '@/assets/plus.svg'

import useConfigStore, { type Shortcut } from '@/hooks/useConfigStore';
import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';

import AddForm from './components/AddForm';
import UpdateForm from './components/UpdateForm';
import ShortcutItem from './components/ShortcutItem';
import DeleteForm from './components/DeleteForm';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number,
  rows?: number,
}
const Shortcuts = ({
  columns = 6,
  rows = 2,
}: Props)=> {
  const { showAdd, showUpdate, showDelete, showReverse, tar } = useStoreField(useDisplayStore, [
    'showAdd',
    'showUpdate',
    'showDelete',
    'showReverse',
    'tar'
  ])

  const { shortCutList } = useStoreField(useConfigStore, [
    'shortCutList',
  ])

  return (
    <>

    { showAdd && <AddForm /> }
    { showUpdate && <UpdateForm /> }
    { showDelete && <DeleteForm /> }

    <div
      className={classes.shortcuts}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {shortCutList.map((item)=>(
        <ShortcutItem 
          {...item} 
          key={item.id} 
          tar={item.id} 
          isReversed={tar===item.id && showReverse}
        />
      ))}
      {shortCutList.length<columns*rows && (
        <ShortcutItem 
          tar='_ZN_add_shortcut'
          isAdd
          url='' 
          iconUrl={plusIcon} 
          name='添加快捷方式'
        />
      )}
    </div>

    </>
  )
}

export default Shortcuts;