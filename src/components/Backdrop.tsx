import classes from './Backdrop.module.css';

import { createPortal } from 'react-dom';

const backdrop = document.querySelector('#backdrop')!;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClose: ()=>void,
}

const Backdrop = ({
  children,
  onClose,
}: Props)=> {
  return (createPortal((
    <div
      className={classes.backdrop}
      onPointerUp={(e)=> {
        e.currentTarget===e.target && (()=> {
          onClose();
        })();
      }}
    >
      {children}
    </div>
  ),backdrop))
}

export default Backdrop;