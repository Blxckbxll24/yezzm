import React, { useEffect, useState } from 'react';
import '../styles/buscador.css';
import { Link } from 'react-router-dom';
import Player from './reproductor';
import YouTubeMusicSearch from './youtube';

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
                    <Link className="active" to="/inicio"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                    <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                    <Link to="/likeit"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                    <Link to="/agregados"><span><img src={require('../images/add.svg')} alt="" /></span>Albumes & Playlist guardadas</Link>
                </div>
            </aside>
            <div className="center-container">

                {searchOption === "videos" ?
                    <div className="search-container">
                        <Link to='/inicio'><span><img className='icon' src={require('../images/simbolo-menor-que.jpeg')} alt="" placeholder='volver' title='Volver' /></span></Link>
                        <Link to=''><span><img className='icon' src={require('../images/mayor-que-el-simbolo.jpeg')} alt="" placeholder='Avanzar' title='Avanzar' /></span></Link>
                        <YouTubeMusicSearch />
                        <button onClick={() => handleSearchOptionChange("videos")}>Buscar Videos</button>
                        <button onClick={() => handleSearchOptionChange("songs")}>Buscar Canciones</button>
                    </div> : (

                        <><div className="search-container">
                            <section class="middle-section">
                                <Link to='/inicio'><span><img className='icon' src={require('../images/simbolo-menor-que.jpeg')} alt="" placeholder='volver' title='Volver' /></span></Link>
                                <Link to=''><span><img className='icon' src={require('../images/mayor-que-el-simbolo.jpeg')} alt="" placeholder='Avanzar' title='Avanzar' /></span></Link>
                                <input type="input" className="search-input" placeholder='¿Qué gustas escuchar?' value={searchInput} onChange={event => setSearchInput(event.target.value)} />
                                <button onClick={() => handleSearchOptionChange("videos")}>Buscar Videos</button>
                                <button onClick={() => handleSearchOptionChange("songs")}>Buscar Canciones</button>
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
                                        <div className="result-row">
                                            <h2>Artists</h2>
                                            {results.artists && results.artists.map((result, i) => (
                                                <Link to={`/embed/artist/${result.id}`} key={i}>
                                                    <div className="result-cards" key={i}>
                                                        <img
                                                            className="result-image"
                                                            src={result.images?.[0]?.url || sinFotoImage}
                                                            alt={result.name} />
                                                        <p className="result-title">{result.name}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="result-row">
                                            <h2>Songs</h2>
                                            {results.songs && results.songs.map((result, i) => (
                                                <div className="song-card" key={i}>
                                                    <Link to={`/embed/playlist/${result.id}`} key={i}>
                                                        <img className="song-image" src={result.album?.images?.[0]?.url || sinFotoImage} alt={result.name} />
                                                        <div className="song-details">
                                                            <div className="song-title">{result.name}</div>
                                                            <div className="song-artist">{result.artists[0].name}</div>
                                                            {/* Agregué un ejemplo para la duración, ajusta según tus necesidades */}
                                                            <div className="song-duration">Duración: {result.duration_ms} ms</div>
                                                        </div>
                                                    </Link>
                                                    <button className="like-button" onClick={() => handleLikeClick(result)}>Me gusta</button>
                                                    {/* Agregué un botón de reproducción, ajusta según tus necesidades */}
                                                    <button className="play-button" onClick={(e) => handlePlayClick(e, result)}>Reproducir</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="result-row">
                                            <h2>Albums</h2>
                                            {results.albums && results.albums.map((result, i) => (
                                                <div className="song-card" key={i}>
                                                    <Link to={`/embed/album/${result.id}`} key={i}>
                                                        <img className="song-image" src={result.images?.[0]?.url || sinFotoImage} alt={result.name} />
                                                        <div className="song-details">
                                                            <div className="song-title">{result.name}</div>
                                                            <div className="song-artist">{result.artists[0].name}</div>
                                                            <div className="song-duration">Salió: {result.release_date}</div>
                                                        </div>
                                                    </Link>
                                                    <button className="like-button" onClick={() => handleLikeClickArtist(result)}>Me gusta</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="result-row">
                                            <h2>Playlists</h2>
                                            {results.playlists && results.playlists.map((result, i) => (
                                                <div className="song-card" key={i}>
                                                    <Link to={`/embed/playlist/${result.id}`} key={i}>
                                                        <img className="song-image" src={result.images?.[0]?.url || sinFotoImage} alt={result.name} />
                                                        <div className="song-details">
                                                            <div className="song-title">{result.name}</div>
                                                            <div className="song-artist">{result.owner.display_name}</div>
                                                            {/* Agregué un ejemplo para la cantidad de canciones en la playlist, ajusta según tus necesidades */}
                                                            <div className="song-duration">Canciones: {result.tracks.total}</div>
                                                        </div>
                                                    </Link>
                                                    <button className="like-button" onClick={() => handleLikeClickAlbum(result)}>Me gusta</button>
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
