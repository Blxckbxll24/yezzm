import React, { useState, useEffect} from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
  const [token, setToken] = useState('BQB5tEYGUgdN7y3FrA2M3hwcguRAABbs1_JBafUi_q7iHiFJ-OWvqjo0DkO4EIn_aryMXK0Gh-ws8jaCwEVKzziYRxVo5b_zHtZlGmZg7HTk8O4NqeA1vQ0pvp4X'); // Coloca tu token aquí
  const [trackUri, setTrackUri] = useState('');
  useEffect(() => {
    // Recupera la información de la canción seleccionada desde el localStorage
    const selectedTrackInfo = localStorage.getItem('selectedTrack');

    if (selectedTrackInfo) {
        const { uri } = JSON.parse(selectedTrackInfo);
        setTrackUri(uri);
    }
}, []);


const updatePlayer = (uri) => {
  setTrackUri(uri);
};
 

  return (
    <div>
      {token && <SpotifyPlayer token='BQDFbl6-up_jhMzjcPvdMSVZtT-9baz6azy2RIwZjz109UNI5LWyc01RN5tQN8wxGT641ORDxvB2XlZDmZo2Pm3IBZpaAPbNaWBEQQQ8KaYqgeSpWe5qE4qf9SN50QZnCij2WvFa575Vcbb6L1HQWfCccpyqvm-BQZwwXy6KsREJJY4hxQ6G9UDHt_m9QqwLEDEU833ZmEf0bDbKM8OJNYqNgZQ8T31E
' 
      uris={trackUri ? [trackUri] : []}
      styles={{
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        savedColor: '#fff',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }} />}
    </div>
  );
};

export default Player;
