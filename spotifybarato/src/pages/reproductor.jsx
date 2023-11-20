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
      {token && <SpotifyPlayer token='BQDv6Lwv0dTLFeORWaRVQdcOJt_vuzwuoZM2Rlr4uvDIENudpGaz93CjJ7Tw0Ul2rEfngX8iG5qqGa853Mi_xJF-dgFnPNljWt-dFKzSwVF7SmFQ5ZJFI-xQCgGNpQiuRMukoAZ7bClgR3omD8TTWus5gRXZKZrIj-U3ziGysZoya2qMyzLD7kSBYSGGPGFhjrAarctEXfYCM0-4eUnr63O9_y5Ubtu-
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
