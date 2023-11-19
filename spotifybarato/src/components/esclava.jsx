import React from "react";
import styles from'../styles/inicio.module.css';
import { Link } from "react-router-dom";

function Esclava(){
    return(
        <>
        <div className={styles.container}>
<aside>
                        <div className={styles.menu}>
                            <Link className={styles.active} to="/inicio"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                            <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                            <Link to="#"><span><img src={require('../images/library.svg')} alt="" /></span>Tu biblioteca</Link> <br />
                            <Link to="#"><span><img src={require('../images/add.svg')} alt="" /></span>Crear lista</Link>
                            <Link to="#"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                        </div>
                    </aside>
                    <section>
               <iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/episode/6tAhwNlKd3wXoWANPaeFAE?si=f2ac9e88522c4df2`}
//   src={`https://open.spotify.com/embed/playlist/4d7JtovGW5iCH9KdWpHTyd?utm_source=generator&theme=0`}
  width="100%"
  height="200%"
  style={{ minHeight: '2000px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
</section>
</div>
        </>
    )
}
export default Esclava;