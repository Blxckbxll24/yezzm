import React, { useEffect, useState } from "react";
import styles from '../styles/inicio.module.css';
import { Link } from "react-router-dom";
import '../styles/cartaaplayalbum.css'
import Player from "./reproductor";

function SavedPlaylist() {
    const [likedPlaylist, setLikedPlaylist] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [likedAlbum, setLikedAlbum] = useState([]);

    useEffect(() => {
        // Obtener la lista de "Me gusta" desde localStorage al cargar el componente
        const storedLikedSongs = localStorage.getItem('likedPlaylist');
        if (storedLikedSongs) {
            setLikedPlaylist(JSON.parse(storedLikedSongs));
        }
    }, []);

    const handleDislikeClick = (index) => {
        // Crear una copia de la lista actual de "Me gusta"
        const updatedLikedPlaylist = [...likedPlaylist];
        // Eliminar la canción en el índice dado
        updatedLikedPlaylist.splice(index, 1);
        // Actualizar el estado y localStorage
        setLikedPlaylist(updatedLikedPlaylist);
        localStorage.setItem('likedPlaylist', JSON.stringify(updatedLikedPlaylist));
    };

    useEffect(() => {
        // Obtener la lista de "Me gusta" desde localStorage al cargar el componente
        const storedLikedAlbum = localStorage.getItem('likedAlbum');
        if (storedLikedAlbum) {
            setLikedAlbum(JSON.parse(storedLikedAlbum));
        }
    }, []);



    return (
        <>
            <div style={{
                backgroundColor: '#252525',
                paddingBottom: '100px'
            }} className={styles.container}>
                <aside>
                    <div className={styles.menu}>
                        <Link className={styles.active} to="/inicio"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                        <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                        <Link to="/likeit"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                        <Link to="/agregados"><span><img src={require('../images/add.svg')} alt="" /></span>Albumes & Playlist guardadas</Link>
                    </div>
                </aside>

                <div className={styles.content}>
                    <h1>Tus playlist y Albumes favoritos</h1>
                    <div className="song-cards">
                        {likedPlaylist.map((song, index) => (
                            <div className="song-card" key={index}>
                                <Link to={`/embed/album/${song.id}`} key={index}>
                                <img className="song-image" src={song.images?.[0]?.url} alt={song.name} />
                                <div className="song-details">
                                    <div className="song-title">{song.name}</div>
                                    <div className="song-artist">{song.artists && song.artists.length > 0 ? song.artists[0].name : 'Desconocido'}</div>

                                    <div className="song-duration">Salió: {song.release_date}</div>
                                </div>
                                </Link>
                                <button className="like-button" onClick={() => handleDislikeClick(index)}>No me gusta</button>
                            </div>
                        ))}
                        {likedAlbum.map((song, index) => (
                            <div className="song-card" key={index}>
                                <Link to={`/embed/playlist/${song.id}`} key={index}>
                                <img className="song-image" src={song.images?.[0]?.url} alt={song.name} />
                                <div className="song-details">
                                    <div className="song-title">{song.name}</div>
                                    <div className="song-artist">{song.artist}</div>
                                    <div className="song-duration">De:  {song.owner.display_name}</div>
                                </div>
                                </Link>
                                <button className="like-button" onClick={() => handleDislikeClick(index)}>No me gusta</button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Player></Player>


        </>
    );
}

export default SavedPlaylist;
