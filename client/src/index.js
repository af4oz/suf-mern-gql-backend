import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'typeface-montserrat'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './apolloClient'
import { AuthProvider } from './context/auth'
import { StateProvider } from './context/state'
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <AuthProvider>
        <StateProvider>
          <GlobalStyles />
          <App />
        </StateProvider>
      </AuthProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
