import './App.css'; 
import logo from './assets/images/mifacturaperublanco.png'; 
import empresaLogo from './assets/images/milka-removebg-preview.png';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className="navbar1">
        <div className="navbar-left1">
          <img src={logo} alt="Mi Factura Perú" className="logo" />
        </div>
      </div>
      <div className='main'>
        <img src={empresaLogo} alt="LOGO EMPRESA" className="logo-empresa" />
      </div>
      <footer className="footer1">
        <Link to="/productos" className="btn-continue1">CONTINUAR</Link>
      </footer>
    </div>
  );
}

export default App;