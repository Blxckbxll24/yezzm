import React, { useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import '../styles/buscador.css'


const YouTubeMusicSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchOption, setSearchOption] = useState("videos");
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
      setSelectedVideo(null); // Reinicia el video seleccionado al realizar una nueva búsqueda
    } catch (error) {
      console.error('Error al buscar música:', error);
    }
  };

  const opts = {
    height: '590',
    width: '940',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  
  return (
    <div className='grende'>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar Video"
        className="search-video"
      />
      <button className='buscar' onClick={searchMusic}>Buscar</button>
      

      <ul className='list'>
        {results.map((item) => (
          <li key={item.id.videoId} className='teme'  onClick={() => setSelectedVideo(item.id.videoId)}>
            {item.snippet.title} - {item.snippet.channelTitle}
          </li>
        ))}
      </ul>

      {selectedVideo && (
        <YouTube videoId={selectedVideo} className='ventana' opts={opts} />
      )}
    </div>
  );
};

export default YouTubeMusicSearch;