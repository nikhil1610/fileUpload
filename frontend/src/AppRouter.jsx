import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';

const AppRouter = () => (
  <BrowserRouter>
    <div className="main">
        <Header/>
        <Routes>
          <Route element={<App/>} path="/" exact={true} />
        </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;