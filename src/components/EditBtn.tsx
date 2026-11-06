import classes from './EditBtn.module.css';

import { Pencil1Icon } from '@radix-ui/react-icons'; 


const EditBtn = ()=> {
  return (
    <div 
      className={classes.edit}
      onClick={()=> {

      }}
    >
      <Pencil1Icon />
      <span>编辑</span>
    </div>
  )
}

export default EditBtn;