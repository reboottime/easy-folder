import { createRoot } from 'react-dom/client';

import './style.css';

import { Sidebar } from './components/Sidebar';

function init() {
  const div = document.createElement('div');
  div.id = '__root';
  document.body.appendChild(div);

  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Content root element");

  const root = createRoot(rootContainer);
  root.render(
    <Sidebar />
  );

  try {
    console.log('content script loaded');
  } catch (e) {
    console.error(e);
  }
}

init();