import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import '../styles/buscador.css';

const YouTubeMusicSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchOption, setSearchOption] = useState('videos');

  const searchMusic = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            q: query,
            type: 'video',
            videoCategoryId: '10',
            key: 'AIzaSyDhTRyheUKZUzQTVy_5NfAZ8Hxm7DAicB8',
          },
        }
      );
      setResults(response.data.items);
      setSelectedVideo(null);
    } catch (error) {
      console.error('Error al buscar música:', error);
    }
  };

  const opts = {
    height: '590',
    width: '940',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="grende">
      <div className="search-contenedor">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Que Video Deseas Ver?"
          className="search-inputt"
        />
        <button className="buscar" onClick={searchMusic}>
          Buscar
        </button>
        
      </div>
      <div className="results-containerr">
        <ul className="list">
        
          {results.map((item) => (
            <li
              key={item.id.videoId}
              className="teme"
              onClick={() => setSelectedVideo(item.id.videoId)}
            >
              {item.snippet.title} - {item.snippet.channelTitle}
            </li>
          ))}
        </ul>
      </div>
      <div className="video-container">
      
        {selectedVideo && (
          <p className='selection'>Video Selecionado
          <YouTube videoId={selectedVideo} className="ventana" opts={opts} />
          </p>
        )}
      </div>
    </div>
  );
};

export default YouTubeMusicSearch;