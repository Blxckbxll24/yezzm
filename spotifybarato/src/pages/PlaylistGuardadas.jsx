import React, { useEffect, useState } from "react";
import styles from '../styles/inicio.module.css';
import { Link } from "react-router-dom";
import style from'../styles/cartaaplayalbum.module.css'
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
                    <div className={style.song_cards}>
                        {likedPlaylist.map((song, index) => (
                            <div className={style.song_card} key={index}>
                                <Link to={`/embed/album/${song.id}`} key={index}>
                                <img className={style.song_image} src={song.images?.[0]?.url} alt={song.name} />
                                <div className={style.song_details}>
                                    <div className={style.song_title}>{song.name}</div>
                                    <div className={style.song_artist}>{song.artists && song.artists.length > 0 ? song.artists[0].name : 'Desconocido'}</div>

                                    <div className={style.song_duration}>Salió: {song.release_date}</div>
                                </div>
                                </Link>
                                <button className={style.like_button} onClick={() => handleDislikeClick(index)}><svg width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z" fill="#535353"/>
</svg></button>
                            </div>
                        ))}
                        {likedAlbum.map((song, index) => (
                            <div className={style.song_card} key={index}>
                                <Link to={`/embed/playlist/${song.id}`} key={index}>
                                <img className={style.song_image} src={song.images?.[0]?.url} alt={song.name} />
                                <div className={style.song_details}>
                                    <div className={style.song_title}>{song.name}</div>
                                    <div className={style.song_artist}>{song.artist}</div>
                                    <div className={style.song_duration}>De:  {song.owner.display_name}</div>
                                </div>
                                </Link>
                                <button className={style.like_button} onClick={() => handleDislikeClick(index)}><svg width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z" fill="#535353"/>
</svg></button>
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
