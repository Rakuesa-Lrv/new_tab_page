import classes from './DeleteForm.module.css';

import Backdrop from '@/components/Backdrop';

import SimpleForm from './SimpleForm';
import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';
import useConfigStore from '@/hooks/useConfigStore';


const DeleteForm = ()=> {
  const { tar, dispatch } = useStoreField(useDisplayStore, [
    'tar',
    'dispatch',
  ])

  const { shortCutList, changeShortcut } = useStoreField(useConfigStore, [
    'shortCutList',
    'changeShortcut',
  ])

  const initial = shortCutList.find(item=> item.id===tar);

  return (
    <Backdrop>
      <SimpleForm act='delete' initial={initial} title='删除快捷方式'>
        <button 
          type='button'
          className={classes.deleta}
          onClick={()=> {
            initial && changeShortcut({ type: 'DELETE', id: initial?.id })
            dispatch({ display: 'close', act: 'delete' })
          }}
        >
          <span>删除</span>
        </button>
      </SimpleForm>
    </Backdrop>
  )
}

export default DeleteForm;