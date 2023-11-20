import React from "react";

function Playlistembed({trackId}){
    const embedUrl = `https://open.spotify.com/embed/playlist/${trackId}`;

    return (
      <div className="spotify-embed">
        <iframe
          title="Spotify Embed: Recommendation Playlist "
          src={embedUrl}
          //   src={`https://open.spotify.com/embed/playlist/4d7JtovGW5iCH9KdWpHTyd?utm_source=generator&theme=0`}
          width="398%"
          height="99.9%"
          style={{
            minHeight: '500px',
            borderRadius: '0px'
          }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    )
  
  }
  
  export default Playlistembed;