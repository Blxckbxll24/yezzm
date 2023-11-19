import React, { useState, useEffect } from 'react';
import '../styles/AudioPlayer.css';

const CLIENT_ID = "453d6c17658a4a4a8498f17cb1b22b75";
const CLIENT_SECRET = "6d243006672b46cea52da45f4fa7b0f7";

const Player = () => {
    const [audioSource, setAudioSource] = useState('audio.mp3');
    const [songInfo, setSongInfo] = useState({
        name: 'Nombre de la canción',
        artist: 'Artista',
        albumCover: 'album-cover.jpg',
    });

    const changeAudio = (newAudioSource, newSongInfo) => {
        setAudioSource(newAudioSource);
        setSongInfo(newSongInfo);
    };

  return (
    <div className="audio-container">
    <div className="song-info">
        <img src={songInfo.albumCover} alt="Album Cover" />
        <div className="song-details">
            <h3>{songInfo.name}</h3>
            <p>{songInfo.artist}</p>
        </div>
    </div>
    <div className="custom-audio">
        <audio controls>
            <source src={audioSource} type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
        </audio>
    </div>
    <button className='x' onClick={() => changeAudio('otro-audio.mp3', { name: 'Otra Canción', artist: 'Otro Artista', albumCover: 'otro-cover.jpg' })}>
        Cambiar Audio
    </button>
</div>
  );
};

export default Player;
