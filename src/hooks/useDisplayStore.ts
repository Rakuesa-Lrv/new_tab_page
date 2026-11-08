import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Shortcut } from "./useConfigStore";

const actC = ['close', 'open'] as const;
type display = typeof actC[number];

const displayItemC = ['add', 'update', 'delete'] as const;
type act = typeof displayItemC[number];

type CapDisplayItem = Capitalize<act>;

type show = `show${CapDisplayItem}`

type State = Record<show, boolean> & { tar: Shortcut['id'] };

type Action = { display: display, act: act, tar?: Shortcut['id'] }

const useDisplayStore = create(immer(combine(
  {
    showAdd: false,
    showUpdate: false,
    tar: '',
  } as State,
  (set)=> ({
    dispatch: (action: Action)=> {
      set(draft=> {
        const show = `show${action.act.replace(/^./, f=>f.toUpperCase())}` as show;
        switch(action.display) {
          case "close":
            draft[show] &&= false;
            break;
          case "open":
            draft[show] ||= true;
            break;
        }
        draft.tar = action.tar ?? '';
      })
    },
  })
)));

export default useDisplayStore;