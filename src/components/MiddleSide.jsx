import React, { useEffect, useState } from 'react';
import './MiddleSide.css';  // Estilos del componente
import story from '../story.json';  // Importa las historias del archivo JSON
import Post from './Post.jsx';  // Componente para mostrar cada post
import { supabase } from '../supabaseClient';  // Cliente Supabase para DB
import instagramLogo from '../assets/instagramLogo.png';
const MiddleSide = () => {
    const storys = story.story;  // Array de historias desde el JSON
    const [posts, setPosts] = useState([]);  // Estado para guardar posts traídos de Supabase
    const [selectedStory, setSelectedStory] = useState(null); // Estado para guardar la historia seleccionada (pop-up)

    // useEffect para traer los posts desde la base de datos cuando el componente carga
    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Post') // Tabla Post
                .select('*') // Seleccionar todas las columnas
                .order('created_at', { ascending: false }); // Ordenar de más recientes a más viejos

            if (error) {
                console.error('Error al obtener posts:', error); // Mostrar error si falla
            } else {
                setPosts(data);  // Guardar posts en el estado
            }
        };

        fetchPosts();  // Llamar a la función para cargar posts
    }, []);  // El arreglo vacío [] hace que se ejecute sólo una vez al montar el componente

    return (
        <div className="middleHomeSide">
            <div className="mobileTopBar">
                <div className="instalogo">
                    <img className='instaLogoMobile' src={instagramLogo} />
                </div>
            </div>
            {/* Bloque de historias */}
            <div className="storyBlock">
                {/* Mapear cada historia para mostrarla */}
                {storys?.map((item, index) => (
                    <div
                        className="storyParticular"
                        key={index}
                        onClick={() => setSelectedStory(item)} // Cuando se clickea una historia, la guardamos en selectedStory
                    >
                        <div className="imageDIv">
                            <img className="statusImg" src={item.img} alt="story" />
                        </div>
                        <div className="profileName">{item.name}</div>
                    </div>
                ))}
            </div>

            {/* Pop-up para mostrar la historia seleccionada */}
            {selectedStory && (
                // Fondo oscuro que cubre la pantalla, clic para cerrar pop-up (pone selectedStory en null)
                <div className="storyOverlay" onClick={() => setSelectedStory(null)}>
                    {/* Popup de la historia, evitamos que el clic en esta zona cierre el pop-up */}
                    <div className="storyPopup" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedStory.img} alt="story" className="popupImage" />
                        <p className="popupName">{selectedStory.name}</p>
                    </div>
                </div>
            )}

            {/* Sección de posts */}
            <div className="postSection">
                {/* Si hay posts, mapear y mostrar cada uno con el componente Post */}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            username={post.user_name}
                            caption={post.caption}
                            image_url={post.image_url}
                        />
                    ))
                ) : (
                    // Por si no hay posts
                    <p>Loading posts</p>
                )}
            </div>
        </div>
    );
};

export default MiddleSide;

