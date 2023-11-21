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
    <div style={{ position: 'fixed', bottom: 0, width: '100%' }} >
      {token && <SpotifyPlayer token='BQA-1ABOP8xctb7GgRbjl6xlbWj7te1Pt8kYiM5pbzb1aqh8HlZ-y3Mayz9W4EMR-nW0-K4v5R6AGK_imlFpM6_-5ApowS7RQ4-2amwG6PH55fyhKRUU_6xTnPEUQ6878vpQSPAA5yXUXVIWrr3c2OIxbbaw08TsUYLstfCQQoCOpIDziImKUlpQ7YuGWzrypEmyL8enCAfSB9Delhl0rDuInLZbZURZ
' 
      uris={trackUri ? [trackUri] : []}
      styles={
        {
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
