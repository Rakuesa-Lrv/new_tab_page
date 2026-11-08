import classes from './AddForm.module.css';

import Backdrop from '@/components/Backdrop';

import SimpleForm from './SimpleForm';

const AddForm = ()=> {

  return (
    <Backdrop>
      <SimpleForm act='add' />
    </Backdrop>
  )
}

export default AddForm;