import useStoreField from '@/hooks/useStoreField';
import classes from './Background.module.css';

import bg from '@/assets/EV_A07.png'
import useDisplayStore from '@/hooks/useDisplayStore';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Background = ({
  children,
}: Props)=> {

  const { dispatch } = useStoreField(useDisplayStore, ['dispatch']);

  return (
    <div
      className={classes.bg}
      style={{
        backgroundImage: `url(${bg})`
      }}
      onClick={(e)=> {
        e.stopPropagation();
        dispatch({ display: 'close', act: 'reverse' })
      }}
    >
      {children}
    </div>
  )
}

export default Background;