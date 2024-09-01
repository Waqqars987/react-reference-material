import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Router } from './App';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={Router} />);
