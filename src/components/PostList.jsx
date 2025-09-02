import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Importamos la configuración de Supabase
import Post from "./Post"; // Componente que representa un post individual

const PostList = () => {
  // Estado local para guardar la lista de posts
  const [posts, setPosts] = useState([]);

  // Función que obtiene los posts desde la base de datos Supabase
  const fetchPosts = async () => {
    // Consulta a la tabla "Post" para seleccionar todos los registros
    // Ordenados por fecha de creación de forma descendente (más recientes primero)
    const { data, error } = await supabase
      .from("Post")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Si hay un error, lo mostramos por consola
      console.error("Error loading posts:", error.message);
    } else {
      // Si la consulta es exitosa, actualizamos el estado con los posts recibidos
      setPosts(data);
    }
  };

  // useEffect para llamar a fetchPosts una vez cuando el componente se monta
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Recorremos la lista de posts y para cada uno renderizamos el componente Post */}
      {posts.map((post) => (
        <Post
          key={post.id}               // Usamos la id del post como key única para React
          username={post.user_name}   // Pasamos el nombre del usuario que hizo el post
          caption={post.caption}      // Pasamos el texto o descripción del post
          image_url={post.image_url}  // Pasamos la URL de la imagen del post
        />
      ))}
    </div>
  );
};

export default PostList;
