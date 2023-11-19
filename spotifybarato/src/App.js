import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login_user';
import Registro from './pages/login';

import Pago from './pages/pago';
import Dash from './pages/dashboard';
import Inicio from './pages/inicio';
import Buscador from './pages/buscador';
import { FavoriteSongsProvider } from '../src/context/favoritos.jsx';
import Player from './pages/reproductor.jsx';
import Usuarios from './pages/Usuariodash.jsx';
import Acosta from './components/acostaplaylist.jsx';
import RaRaw from './components/raraw.jsx';
import Finde from './components/findesemana.jsx';
import Buny from './components/buni.jsx';
import Doblea from './components/RHLM.jsx';
import Drake from './components/drake.jsx';
import Salma from './components/salma.jsx';
import Temerarios from './components/temerarios.jsx';
import Gato from './components/gatonoche.jsx';
import Esclava from './components/esclava.jsx';
import Torero from './components/torero.jsx';
import NotFoundPage from './pages/404.jsx';
import DetalleCancion from './pages/detallescancion.jsx';
import Megusta from './pages/megusta.jsx';

function App() {
  return (
    <BrowserRouter>
      <FavoriteSongsProvider>
        <Routes>
          <Route path='/' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/pago' element={<Pago />} />
          <Route path='/dash' element={<Dash />} />
          <Route path='/Usuariosdash' element={<Usuarios />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/buscador' element={<Buscador />} />
          <Route path='/player' element={<Player />} />
          <Route path='/acosta' element={<Acosta />} />
          <Route path='/raraw' element={<RaRaw />} />
          <Route path='/finde' element={<Finde />} />
          <Route path='/unveranosinti' element={<Buny />} />
          <Route path='/dobleaa' element={<Doblea />} />
          <Route path='/drake' element={<Drake />} />
          <Route path='/salma' element={<Salma />} />
          <Route path='/temerarios' element={<Temerarios />} />
          <Route path='/gatonoche' element={<Gato />} />
          <Route path='/esclava' element={<Esclava />} />
          <Route path='/chayanne' element={<Torero />} />
          <Route path='/notfoundpage' element={<NotFoundPage />} />
          <Route path='/detalles' element={<DetalleCancion />} />
          <Route path='/likeit' element={<Megusta />} />
        
          

        </Routes>
      </FavoriteSongsProvider>
    </BrowserRouter>
  );
}

export default App;