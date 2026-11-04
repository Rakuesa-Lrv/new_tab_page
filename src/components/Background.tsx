import classes from './Background.module.css';

import bg from '@/assets/EV_A07.png'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Background = ({
  children,
}: Props)=> {
  return (
    <div
      className={classes.bg}
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      {children}
    </div>
  )
}

export default Background;