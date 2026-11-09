import Backdrop from '@/components/Backdrop';

import SimpleForm from './SimpleForm';

const AddForm = ()=> {

  return (
    <Backdrop>
      <SimpleForm act='add' title='添加快捷方式'>
        <button type='submit'>
          <span>添加</span>
        </button>
      </SimpleForm>
    </Backdrop>
  )
}

export default AddForm;