import React, { useEffect, useState } from "react";
import styles from '../styles/inicio.module.css';
import { Link } from "react-router-dom";
import '../styles/cancion.css'

function Megusta() {
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        // Obtener la lista de "Me gusta" desde localStorage al cargar el componente
        const storedLikedSongs = localStorage.getItem('likedSongs');
        if (storedLikedSongs) {
            setLikedSongs(JSON.parse(storedLikedSongs));
        }
    }, []);

    const handleDislikeClick = (index) => {
        // Crear una copia de la lista actual de "Me gusta"
        const updatedLikedSongs = [...likedSongs];
        // Eliminar la canción en el índice dado
        updatedLikedSongs.splice(index, 1);
        // Actualizar el estado y localStorage
        setLikedSongs(updatedLikedSongs);
        localStorage.setItem('likedSongs', JSON.stringify(updatedLikedSongs));
    };

    return (
        <>
            <div className={styles.container}>
                <aside>
                    <div className={styles.menu}>
                        <Link className={styles.active} to="#"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                        <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                        <Link to="#"><span><img src={require('../images/library.svg')} alt="" /></span>Tus me gusta</Link> <br />
                        <Link to="#"><span><img src={require('../images/add.svg')} alt="" /></span>Crear lista</Link>
                        <Link to="#"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                    </div>
                </aside>

                <div className={styles.content}>
                    <h1>Tus canciones favoritas</h1>
                    <ul className="song-list">
                        <div className="xxx">
                            {likedSongs.map((song, index) => (
                                <li className="song-item" key={index}>
                                    <img className="song-image" src={song.album?.images?.[0]?.url} alt={song.name} />
                                    <div className="song-title">{song.name}</div>
                                    <div className="song-artist">{song.artist}</div>
                                    <div className="song-duration">Duración: {song.duration}</div>
                                    <button className="like-button" onClick={() => handleDislikeClick(index)}>No me gusta</button>
                                </li>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Megusta;
