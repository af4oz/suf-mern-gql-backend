import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './apolloClient'
import { AuthProvider } from './context/auth'
import { AppProvider } from './context/state'
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <AuthProvider>
        <AppProvider>
          <GlobalStyles />
          <App />
        </AppProvider>
      </AuthProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
