import React from "react";
import Player from "./reproductor";

function Salma(){
    return(
        <>
        <iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/show/2JOxR4SNoqC5yEXXOWWqdc?si=36c1e16ac10a471a`}
//   src={`https://open.spotify.com/embed/playlist/4d7JtovGW5iCH9KdWpHTyd?utm_source=generator&theme=0`}
  width="100%"
  height="200%"
  style={{ minHeight: '900px' }}
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
<Player></Player>
        </>
    )
}

export default Salma;