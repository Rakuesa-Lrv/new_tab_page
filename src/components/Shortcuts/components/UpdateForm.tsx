import classes from './AddForm.module.css';

import Backdrop from '@/components/Backdrop';

import SimpleForm from './SimpleForm';
import useStoreField from '@/hooks/useStoreField';
import useDisplayStore from '@/hooks/useDisplayStore';
import useConfigStore from '@/hooks/useConfigStore';

const UpdateForm = ()=> {

  const { tar } = useStoreField(useDisplayStore, [
    'tar'
  ])

  const { shortCutList } = useStoreField(useConfigStore, [
    'shortCutList',
  ])

  const initial = shortCutList.find(item=> item.id===tar);

  return (
    <Backdrop>
      <SimpleForm act='update' initial={initial} />
    </Backdrop>
  )
}

export default UpdateForm;