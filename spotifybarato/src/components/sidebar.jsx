import React from "react";
import styles from '../styles/inicio.module.css'
import { Link } from "react-router-dom";

function Barraspotify(){
    return(
        <>
        
        <aside>
                            <div className={styles.menu}>
                                <Link className={styles.active} to="#"><span><img src={require('../images/home.svg')} alt="" /></span>Inicio</Link>
                                <Link to='/buscador'><span><img src={require('../images/search.svg')} alt="" /></span>Buscar</Link>
                                <Link to="#"><span><img src={require('../images/library.svg')} alt="" /></span>Me gusta</Link> <br />
                                <Link to="#"><span><img src={require('../images/add.svg')} alt="" /></span>Crear lista</Link>
                                <Link to="#"><span><img src={require('../images/heart.svg')} alt="" /></span>Canciones que te gustan</Link>
                            </div>
                        </aside>
                        
        </>
    )
}
export default Barraspotify;
