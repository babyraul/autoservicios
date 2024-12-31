import { useEffect, useState } from 'react';
import './App.css'; 
import logo from './assets/images/mifacturaperublanco.png'; 
import { Link } from 'react-router-dom';
import { isString } from 'lodash';

const LastLogoRefreshToken = "last_logo_refresh"

function App() {
  const [sessionInfo, setSessionInfo] = useState({
    Ruc: '',
    imagenesUrl: '',
  });

  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    fetchSessionInfo();
  }, []);

  useEffect(() => {
    if (!isString(sessionInfo.Ruc) || !isString(sessionInfo.imagenesUrl)) {
      setLogoUrl("");
      return;
    }

    if (sessionInfo.Ruc == "" || sessionInfo.imagenesUrl == "") {
      setLogoUrl("");
      return;
    }

    if (refreshLogo()) {
      fetch(`${sessionInfo.imagenesUrl}/api/empresa/${sessionInfo.Ruc}`);
      localStorage.setItem(LastLogoRefreshToken, new Date().toISOString())
    }

    setLogoUrl(`${sessionInfo.imagenesUrl}/media/${sessionInfo.Ruc}/logo.png`)
  }, [sessionInfo])

  const refreshLogo = () => {
    const lastRefresh = localStorage.getItem(LastLogoRefreshToken);

    if (lastRefresh == null) {
      return true;
    }

    const sincesMs = new Date() - new Date(lastRefresh)

    return Math.floor(sincesMs / (1000 * 60)) > 5;
  }

  const fetchSessionInfo = async () => {
    const req = await fetch('/api/auth/sesion');

    if (!req.ok) {
      return;
    }

    const data = await req.json();
    setSessionInfo(data);
  }

  return (
    <div>
      <div className="navbar1">
        <div className="navbar-left1">
          <img src={logo} alt="Mi Factura Perú" className="logo" />
        </div>
      </div>
      <div className='main'>
        {logoUrl != "" && <div className="navbar-left1">
          <img src={logoUrl} alt="LOGO EMPRESA" className="logo-empresa" />
        </div>}
      </div>
      <footer className="footer1">
        <Link to="/productos" className="btn-continue1">CONTINUAR</Link>
      </footer>
    </div>
  );
}

export default App;