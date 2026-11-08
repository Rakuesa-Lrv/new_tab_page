import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style.css';
import useConfigStore from '@/hooks/useConfigStore.ts';

;(async ()=> {
  try {
    await useConfigStore.persist.rehydrate();
  }catch(e) {
    console.error('rehydrate failed', e);
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
})();