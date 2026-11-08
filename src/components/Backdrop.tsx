import classes from './Backdrop.module.css';

import { createPortal } from 'react-dom';

const backdrop = document.querySelector('#backdrop')!;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  option?: {
    onClose: ()=>void,
  }
}

const Backdrop = ({
  children,
  option,
}: Props)=> {
  return (createPortal((
    <div
      className={classes.backdrop}
      onPointerUp={
        option
        ? ((e)=> {
          e.currentTarget===e.target && (()=> {
            option.onClose();
          })();
        })
        : undefined
      }
    >
      {children}
    </div>
  ),backdrop))
}

export default Backdrop;