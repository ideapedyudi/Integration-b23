import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContextProvider } from "./contexts/userContext";
import { BrowserRouter as Router} from "react-router-dom";

import { QueryClient, QueryClientProvider} from 'react-query'

const client = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
