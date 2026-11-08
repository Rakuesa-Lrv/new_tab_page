import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { engine } from "@/utils/searchEngine";
import { wxtLocalStorage } from "@/utils/storage";

export interface Shortcut {
  id: string,
  url: string,
  iconUrl: string,
  name: string,
}

interface State {
  defaultEngine: engine,
  shortCutList: Shortcut[],
}

type changeShortcutAction = 
| { type: 'PUSH', shortcut: Omit<Shortcut, 'id'> }
| { type: 'UPDATE', shortcut: Shortcut }
| { type: 'REMOVE', id: Shortcut['id'] }

;

const useConfigStore = create(persist(immer(combine(
  {
    defaultEngine: 'Google',
    shortCutList: [],
  } as State,
  (set)=> ({
    setEngine: (engine: engine)=> {
      set(draft=> {
        draft.defaultEngine = engine;
      })
    },
    changeShortcut: (action: changeShortcutAction)=> {
      set(draft=> {
        switch(action.type) {
          case "PUSH": {
            draft.shortCutList.push({
              ...action.shortcut, 
              id: crypto.randomUUID(),
            })
            break;
          }
          case "UPDATE": {
            const sc = draft.shortCutList;
            const idx = sc.findIndex(item=> item.id===action.shortcut.id);
            draft.shortCutList[idx] = {...action.shortcut};
            break;
          }
          case "REMOVE": {
            const sc = draft.shortCutList;
            const idx = sc.findIndex(item=> item.id===action.id);
            draft.shortCutList.splice(idx, 1);
            break;
          }
        }
      })
    }
  })
)), { 
  name: '_ZN_config_storge',
  version: 1,
  storage: wxtLocalStorage<State>(),
  skipHydration: true,
}));

export default useConfigStore;