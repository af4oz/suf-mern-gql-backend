import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './apolloClient'
import { AuthProvider } from './context/auth'
import { AppProvider } from './context/state'
import GlobalStyles from './styles/GlobalStyles'
import ToastNotification from './components/ToastNotification'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Router>
        <AuthProvider>
          <AppProvider>
            <GlobalStyles />
            <ToastNotification />
            <App />
          </AppProvider>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
)
