import React from 'react';
import SpotifyEmbed from '../components/embedalbum.jsx';
import Playlistembed from '../components/playlistembed';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/inicio.module.css'

const PlayEmb = () => {

const { id } = useParams();

return (
    <>   
    <div className={styles.container}>
        <aside>
     <div className={styles.menu}>
        <Link className={styles.active} to="/inicio"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
        <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
        <Link to="/likeit"><span><img src={require('../images/library.svg')} alt="" /></span>Tus me gusta</Link> <br />
        <Link to="#"><span><img src={require('../images/add.svg')} alt="" /></span>Crear lista</Link>
        <Link to="#"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
        
    </div>
    </aside>
    <Playlistembed trackId={id} />
    
    </div>
    </>

  
);
};
export default PlayEmb;