import useStoreField from '@/hooks/useStoreField';
import classes from './Background.module.css';

import defbg from '@/assets/EV_A07.png'
import useDisplayStore from '@/hooks/useDisplayStore';
import useConfigStore from '@/hooks/useConfigStore';
import { getAllBg, getBg } from '@/utils/db';
import { useEffect, useState } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Background = ({
  children,
}: Props)=> {

  const { dispatch } = useStoreField(useDisplayStore, ['dispatch']);

  const { background } = useStoreField(useConfigStore, [
    'background'
  ])

  const [bg, setBg] = useState('');

  const fetchBg = async (key: string)=> {
    const bg = await getBg(key);
    bg && setBg(URL.createObjectURL(bg?.blob));
  }

  useEffect(()=> {
    fetchBg(background);
  },[background])

  return (
    <div
      className={classes.bg}
      style={{
        backgroundImage: `url(${bg? bg: defbg})`
      }}
      onClick={(e)=> {
        e.stopPropagation();
        e.currentTarget===e.target && (dispatch({ display: 'close', act: 'reverse' }));
      }}
    >
      {children}
    </div>
  )
}

export default Background;