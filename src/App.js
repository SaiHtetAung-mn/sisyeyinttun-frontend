import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Theme from './provider/theme';

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
