import React, { useState, useEffect } from "react";
import axios from "axios";

function DetalleCancion() {
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const searchTerm = 'Killer Queen';

    axios({
      method: 'get',
      url: `http://localhost:3001/api/genius-search?q=${encodeURIComponent(searchTerm)}`,
    })
      .then(response => {
        const hits = response.data.response.hits;
        if (hits.length > 0) {
          const song = hits[0].result;
          setSongInfo(song);
        } else {
          console.log('Canción no encontrada.');
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, []);

  return (
    <div>
      <h2>Detalles de la canción</h2>
      {songInfo && (
        <div>
          <p>Título: {songInfo.title}</p>
          <p>Artista: {songInfo.primary_artist.name}</p>
          {/* Otros detalles que desees mostrar */}
        </div>
      )}
    </div>
  );
}

export default DetalleCancion;
