import React, { useEffect, useState } from 'react';
import '../styles/buscador.css';
import { Link } from 'react-router-dom';
import Player from './reproductor';
import YouTubeMusicSearch from './youtube';
import style from '../styles/buscadorr.module.css'

const CLIENT_ID = "453d6c17658a4a4a8498f17cb1b22b75";
const CLIENT_SECRET = "6d243006672b46cea52da45f4fa7b0f7";
const sinFotoImage = require('../images/sinimagen.png');

function Buscador() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [results, setResults] = useState({});
    const [genres, setGenres] = useState([]);
    const [showGenres, setShowGenres] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [likedSongs, setLikedSongs] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [likedPlaylist, setLikedPlaylist] = useState([]);
    const [likedAlbum, setLikedAlbum] = useState([]);
    const [searchOption, setSearchOption] = useState("songs");

    useEffect(() => {
        // Obtener la lista de "Me gusta" desde localStorage al cargar el componente
        const storedLikedSongs = localStorage.getItem('likedSongs');
        if (storedLikedSongs) {
            setLikedSongs(JSON.parse(storedLikedSongs));
        }
    }, []);

    useEffect(() => {
        const storedLikedPlaylist = localStorage.getItem('likedPlaylist');
        if (storedLikedPlaylist) {
            setLikedPlaylist(JSON.parse(storedLikedPlaylist));
        }
    }, []);

    useEffect(() => {
        const storedLikedAlbum = localStorage.getItem('likedAlbum');
        if (storedLikedAlbum) {
            setLikedAlbum(JSON.parse(storedLikedAlbum));
        }
    }, []);

    useEffect(() => {
        // Recuperar géneros desde el almacenamiento local
        const storedGenres = localStorage.getItem('storedGenres');
        if (storedGenres) {
            setGenres(JSON.parse(storedGenres));
        } else {
            setGenres();
        }
    }, []);

    useEffect(() => {
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        };
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token));
    }, []);

    useEffect(() => {
        search();
    }, [searchInput, accessToken]);

    async function search() {
        if (!accessToken || searchInput.trim() === "") {
            setResults({});
            setShowResults(false);
            setShowGenres(true);
            return;
        }

        setShowResults(true);
        setShowGenres(false);

        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        };

        var artistsData, songsData, albumsData, playlistsData;

        if (searchOption === "songs") {
            artistsData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
                .then(response => response.json())
                .then(data => data.artists.items);

            songsData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters)
                .then(response => response.json())
                .then(data => data.tracks.items);

            albumsData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=album', searchParameters)
                .then(response => response.json())
                .then(data => data.albums.items);

            playlistsData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=playlist', searchParameters)
                .then(response => response.json())
                .then(data => data.playlists.items);
        }

        setResults({ artists: artistsData, songs: songsData, albums: albumsData, playlists: playlistsData });
    }

    const handleLikeClick = (song) => {
        if (!likedSongs.some((likedSong) => likedSong.id === song.id)) {
            setLikedSongs([...likedSongs, song]);
            localStorage.setItem('likedSongs', JSON.stringify([...likedSongs, song]));
        }
    };

    const handleLikeClickArtist = (song) => {
        if (!likedPlaylist.some((likedPlaylist) => likedPlaylist.id === song.id)) {
            setLikedPlaylist([...likedPlaylist, song]);
            localStorage.setItem('likedPlaylist', JSON.stringify([...likedPlaylist, song]));
        }
    };

    const handleLikeClickAlbum = (song) => {
        if (!likedAlbum.some((likedAlbum) => likedAlbum.id === song.id)) {
            setLikedAlbum([...likedAlbum, song]);
            localStorage.setItem('likedAlbum', JSON.stringify([...likedAlbum, song]));
        }
    };

    const handlePlayClick = (e, song) => {
        e.preventDefault();
        setSelectedTrack(song);
        localStorage.setItem('selectedTrack', JSON.stringify({ uri: song.uri, name: song.name, artist: song.artists[0].name }));
        window.location.reload();
    };

    const getGenreImage = (genre) => {
        const imagePathJpg = `../images/${genre}.jpg`;
        const imagePathJpeg = `../images/${genre}.jpeg`;
        const defaultImagePath = sinFotoImage;

        try {
            return require(imagePathJpg).default;
        } catch (error) {
            try {
                return require(imagePathJpeg).default;
            } catch (error) {
                return defaultImagePath;
            }
        }
    };

    const handleSearchOptionChange = (option) => {
        setSearchOption(option);
        setShowGenres(option !== "videos");
    };

    return (
        <div className="main-container">
            <aside className='asi'>
                <div className="menu">
                    <Link  to="/inicio"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                    <Link className="active" to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                    <Link to="/likeit"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                    <Link to="/agregados"><span><img src={require('../images/add.svg')} alt="" /></span>Albumes & Playlist guardadas</Link>
                </div>
            </aside>
            <div className="center-container">
                <div    className='dibo'>
                <button className='bot' onClick={() => handleSearchOptionChange("videos")}>Buscar Videos</button>
                <button className='bot' onClick={() => handleSearchOptionChange("songs")}>Buscar Canciones</button>
                </div>
                
               
                {searchOption === "videos" ?
                    <div className="search-container">
                        
                        <YouTubeMusicSearch />

                    </div> : (

                        <><div className="search-container">
                            <section class="middle-section">
                                <Link to='/inicio'><span><img className='icon' src={require('../images/simbolo-menor-que.jpeg')} alt="" placeholder='volver' title='Volver' /></span></Link>
                                <input type="input" className="search-input" placeholder='¿Qué gustas escuchar?' value={searchInput} onChange={event => setSearchInput(event.target.value)} />

                            </section>
                        </div><div className="results-container">
                                {showGenres && genres.map((genre, index) => (
                                    <div className="result-card" key={index}>
                                        <p className="result-title">{genre}</p>
                                        <img className='generos' src={require(`../images/${genre}.jpg`) || require(`../images/${genre}.jpeg`) || sinFotoImage} alt="" />
                                    </div>
                                ))}
                                {showResults && (
                                    <div className="result-section">
                                        <div className="result-cards">
                                            <h2>Artists</h2>
                                            {results.artists && results.artists.map((result, i) => (
                                                <Link to={`/embed/artist/${result.id}`} key={i}>
                                                    <div className={style.song_card1} key={i}>
                                                        <img
                                                            className={style.song_image}
                                                            src={result.images?.[0]?.url || sinFotoImage}
                                                            alt={result.name} />
                                                        <p className={style.song_title}>{result.name}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="result-cards">
                                            <h2>Songs</h2>
                                            {results.songs && results.songs.map((result, i) => (

                                                <div className={style.song_card3} key={i}>

                                                    <img className={style.song_image} src={result.album?.images?.[0]?.url || sinFotoImage} alt={result.name} />
                                                    <div className={style.song_details}>
                                                        <div className={style.song_title}>{result.name}</div>
                                                        <div className={style.song_artist}>{result.artists[0].name}</div>
                                                        {/* Agregué un ejemplo para la duración, ajusta según tus necesidades */}
                                                        <div className={style.song_duration}>Duración: {result.duration_ms} ms</div>
                                                    </div>

                                                    <button className={style.like_button} onClick={() => handleLikeClick(result)}><svg width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z" fill="#535353" />
                                                    </svg>
                                                    </button>
                                                    {/* Agregué un botón de reproducción, ajusta según tus necesidades */}
                                                    <button className={style.play_button} onClick={(e) => handlePlayClick(e, result)}><svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M36 18C36 22.7739 34.1036 27.3523 30.7279 30.7279C27.3523 34.1036 22.7739 36 18 36C13.2261 36 8.64773 34.1036 5.27208 30.7279C1.89642 27.3523 0 22.7739 0 18C0 13.2261 1.89642 8.64773 5.27208 5.27208C8.64773 1.89642 13.2261 0 18 0C22.7739 0 27.3523 1.89642 30.7279 5.27208C34.1036 8.64773 36 13.2261 36 18V18ZM15.2775 11.4592C15.1093 11.3395 14.9113 11.2683 14.7054 11.2536C14.4994 11.2388 14.2933 11.281 14.1098 11.3756C13.9262 11.4702 13.7722 11.6135 13.6646 11.7897C13.5571 11.966 13.5001 12.1685 13.5 12.375V23.625C13.5001 23.8315 13.5571 24.034 13.6646 24.2103C13.7722 24.3865 13.9262 24.5298 14.1098 24.6244C14.2933 24.719 14.4994 24.7612 14.7054 24.7464C14.9113 24.7317 15.1093 24.6605 15.2775 24.5407L23.1525 18.9157C23.2983 18.8117 23.4172 18.6743 23.4992 18.515C23.5812 18.3557 23.624 18.1792 23.624 18C23.624 17.8208 23.5812 17.6443 23.4992 17.485C23.4172 17.3257 23.2983 17.1883 23.1525 17.0842L15.2775 11.4592V11.4592Z" fill="#1DB954" />
                                                        <path d="M24.1579 16.9036C24.9474 17.3909 24.9474 18.6091 24.1579 19.0964L15.2763 24.5785C14.4868 25.0658 13.5 24.4567 13.5 23.4821V12.5179C13.5 11.5433 14.4868 10.9342 15.2763 11.4215L24.1579 16.9036Z" fill="white" />
                                                    </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="result-cards">
                                            <h2>Albums</h2>
                                            {results.albums && results.albums.map((result, i) => (
                                                <div className={style.song_card2} key={i}>
                                                    <Link to={`/embed/album/${result.id}`} key={i}>
                                                        <img className={style.song_image} src={result.images?.[0]?.url || sinFotoImage} alt={result.name} />
                                                        <div className={style.song_details}>
                                                            <div className={style.song_title}>{result.name}</div>
                                                            <div className={style.song_artist}>{result.artists[0].name}</div>
                                                            <div className={style.song_duration}>Salió: {result.release_date}</div>
                                                        </div>
                                                    </Link>
                                                    <button className={style.like_button} onClick={() => handleLikeClickArtist(result)}><svg width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z" fill="#535353" />
                                                    </svg></button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="result-cards">
                                            <h2>Playlists</h2>
                                            {results.playlists && results.playlists.map((result, i) => (
                                                <div className={style.song_card} key={i}>
                                                    <Link to={`/embed/playlist/${result.id}`} key={i}>
                                                        <img className={style.song_image} src={result.images?.[0]?.url || sinFotoImage} alt={result.name} />
                                                        <div className={style.details}>
                                                            <div className={style.song_title}>{result.name}</div>
                                                            <div className={style.song_artist}>{result.owner.display_name}</div>
                                                            {/* Agregué un ejemplo para la cantidad de canciones en la playlist, ajusta según tus necesidades */}
                                                            <div className={style.song_duration}>Canciones: {result.tracks.total}</div>
                                                        </div>
                                                    </Link>
                                                    <button className={style.like_button} onClick={() => handleLikeClickAlbum(result)}><svg width="30" height="30" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z" fill="#535353" />
                                                    </svg></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div></>
                    )}
            </div>
            <Player></Player>
        </div>
    );
}

export default Buscador;
