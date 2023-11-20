import React from "react";
import styles from'../styles/inicio.module.css';
import { Link } from "react-router-dom";

function Acosta(){
    const playlistId = '4d7JtovGW5iCH9KdWpHTyd';
    return(
        <>
<div className={styles.container}>
<aside>
                        <div className={styles.menu}>
                        <Link className={styles.active} to="/inicio"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                    <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                    <Link to="/likeit"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                    <Link to="/agregados"><span><img src={require('../images/add.svg')} alt="" /></span>Albumes & Playlist guardadas</Link>
                        </div>
                    </aside>
                    <section>
<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/6ESWwnGTZPqoVCOm1M0F8u?si=912105f7b9e244ae`}
//   src={`https://open.spotify.com/embed/playlist/4d7JtovGW5iCH9KdWpHTyd?utm_source=generator&theme=0`}
  width="100%"
  height="200%"
  style={{ minHeight: '900px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
</section>
</div>

        </>
    )
}

export default Acosta;
