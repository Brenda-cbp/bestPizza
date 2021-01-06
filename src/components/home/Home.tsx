import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import pizza from '../../assets/pizza.png';
import logo from '../../assets/logo_white.png';
import logoWhite from '../../assets/logo_all_white.png';
import logOutIcon from '../../assets/log_out.png';
import facebook from '../../assets/facebook_icon.png';
import instagram from '../../assets/instagram_icon.png';
import { logOut } from '../../services/auth.service';
import './Home.scss';
import { getStores } from '../../services/http.service';
import { Store } from 'antd/lib/form/interface';
export function Home() {
  const emptyStores: Store[] = [];
  const imagesList: (typeof import("*.png"))[] = [];
  const [stores, setStores] = useState(emptyStores);
  const [images, setImages] = useState(imagesList);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    getStores().then( res => {
      if(res.stores) {
        loadImages(res.stores);
        setStores(res.stores); 
      } else {
        setError(res.message!!);
      } 
    
    });
  },[]);

  const loadImages = async (stores: Store[]) => {
    const images: (typeof import("*.png"))[] = [];
    for(let i = 0; i < stores.length; i++) {
      images.push(await import(`../../assets/${stores[i].name}.png`))
    }
    console.log(images)
    setImages(images);
  };

  const loadStores = () =>
  stores.map((store, index) => {
    return (
      <div className="card-container" key={index}>
        <div className="card">
          <img src={images[index].default} className="store-img" />
        </div>
        <h3>{store.name}</h3>
        <p className="store-address">{store.address}</p>
      </div>
    );
  });

  return (
    <div className="home">
      <div className="home-image-section">
          <img src={logo} id="logo" alt="logo" />
          <img src={pizza} id="home-image" alt="pizza" />
      </div>
      <div className="home-form-section">
        <div className="log-out" onClick={() => {logOut(); history.push('/login')}}>
          <img src={logOutIcon} alt="logo de Logout" /><span > Salir</span>
        </div>
        <div className="container">
            <h1>Tiendas</h1>
            <h4>Escoge tu pizzería favorita</h4>
            <div className="stores">
              {error === '' ? loadStores(): error}
            </div>
        </div>
        <footer>
          <img src={facebook} className="footer-icon"  alt="Facebook" />
          <img src={instagram} className="footer-icon" alt="instagram" />
          <img src={logoWhite} id="logo-all-white" alt="logo" />
        </footer>
      </div>
    </div>
  );
}
