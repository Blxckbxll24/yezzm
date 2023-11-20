import React, { useEffect, useState } from "react";
import styles from '../styles/inicio.module.css';
import { Link } from "react-router-dom";
import estilo from '../styles/cancion.module.css'
import Player from "./reproductor";

function Megusta() {
    const [likedSongs, setLikedSongs] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);

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
    const handlePlayClick = (e, song) => {
        e.preventDefault();
        setSelectedTrack(song);

        // Almacena la información de la canción seleccionada en el localStorage
        localStorage.setItem('selectedTrack', JSON.stringify({ uri: song.uri, name: song.name, artist: song.artists[0].name }));
        window.location.reload();
    };

    return (
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

                <div style={{
                    backgroundColor: '#252525',
                    paddingBottom: '100px',
                    width: '80%'
                }}
                    className={styles.content}>
                    <h1>Tus canciones favoritas</h1>
                    <ul className={estilo.songlist}>
                        <div className={estilo.xxx}>
                            {likedSongs.map((song, index) => (
                                <li className={estilo.songitem} key={index}>
                                    <img className={estilo.songimage} src={song.album?.images?.[0]?.url} alt={song.name} />
                                    <div className={estilo.songtitle}>{song.name}</div>
                                    <div className={estilo.songartist}>
                                        {song.artists.map((artist) => (
                                            <div className={estilo.songtitle} key={artist.id}> {artist.name}</div>
                                        ))}
                                    </div>
                                   
                                    <button className={estilo.likebutton} onClick={() => handleDislikeClick(index)}>No me gusta</button>
                                    <button onClick={(e) => handlePlayClick(e, song)}>play</button>
                                </li>
                            ))}
                        </div>
                    </ul>
                </div>

            </div>
            <Player></Player>


        </>
    );
}

export default Megusta;
