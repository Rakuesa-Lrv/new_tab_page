import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Shortcut } from "./useConfigStore";
import { configItem } from "@/types/config";
import { act } from "react";

const displayC = ['close', 'open', 'swap'] as const;
type display = typeof displayC[number];

const actC = ['add', 'update', 'delete', 'reverse', 'config', 'crop'] as const;
export type act = typeof actC[number];

type CapDisplayItem = Capitalize<act>;

type show = `show${CapDisplayItem}`
interface cropImg {
  url: string,
  name: string,
}
type State = Record<show, boolean> & { tar: Shortcut['id'], cropImg: cropImg };


/* 
  'add'
    'close', 'open'
  'update'
    'close', 'open'
    'tar'
  'delete'
    'close', 'open'
    'tar'
  'reverse'
    'close', 'swap'
    'tar'
  'config'
    'close', 'open'
  'crop'
    'close', 'open'
    'cropImg'
*/
type Action = 
| { display: Extract<display, 'open'>, act: Extract<act, 'crop'>, cropImg: cropImg }
| { display: Extract<display, 'close'>, act: act }
| { display: Extract<display, 'open' | 'close'>, act: Extract<act, 'add' | 'config'> }
| { display: Extract<display, 'open' | 'close'>, act: Extract<act, 'update' | 'delete'>, tar: Shortcut['id'] }
| { display: Extract<display, 'close' |'swap'>, act: Extract<act, 'reverse'>, tar: Shortcut['id'] }
;

const useDisplayStore = create(immer(combine(
  {
    showAdd: false,
    showUpdate: false,
    showDelete: false,
    showReverse: false,
    showConfig: false,
    showCrop: false,
    tar: '',
    cropImg: {url: '', name: ''},
  } as State,
  (set)=> ({
    dispatch: (action: Action)=> {
      set(draft=> {
        const show = `show${action.act.replace(/^./, f=>f.toUpperCase())}` as show;
        switch(action.display) {
          case "close": {
            draft[show] &&= false;
            draft.tar = '';
            break;
          }
          case "open": {
            draft[show] ||= true;
            (action.act==='update' || action.act==='delete') && (draft.tar = action.tar);
            break;
          }
          case "swap": {
            action.act==='reverse' && (
              !draft.tar
              ? (draft[show] ||= true)
              : (draft.tar===action.tar
                ?(draft[show] = !draft[show])
                :(draft[show] ||= true))
            );
            break;
          }
        }
        (action.act==='crop' && action.display!=='close') && (draft.cropImg = action.cropImg);
        (action.act==='reverse' && action.display!=='close') && (draft.tar = action.tar ?? '');
      })
    },
  })
)));

export default useDisplayStore;