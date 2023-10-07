import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <div className="main-content">
        <Routes>
          <Route element={<App/>} path="/" exact={true} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;