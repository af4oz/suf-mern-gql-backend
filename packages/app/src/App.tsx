import NavBar from './components/NavBar';
import ToastNotification from './components/ToastNotification';
import Routes from './pages/Routes';

import { Paper } from './components/CompStore';

const App = () => {
  return (
    <Paper>
      <ToastNotification />
      <NavBar />
      <Routes />
    </Paper>
  );
};

export default App;
