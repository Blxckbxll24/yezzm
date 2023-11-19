import React from "react";
import '../styles/cancion.css'


function Canciones(){
    
    return(
<>
<body class="app-body">
    <ul class="song-list">
        <div className="xxx">
        <li class="song-item">
            <img class="song-image" src="cancion1.jpg" alt="Nombre de la canción 1"/>
           
                <div class="song-title">Nombre de la Canción 1</div>

                
            
            <div class="song-artist">Artista 1</div>
            <div class="song-duration">Duración: 3:45</div>
            <button class="like-button">Me gusta</button>
            
        </li>
        </div>
    </ul>
</body>
</>
        

    )
}

export default Canciones;