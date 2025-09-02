import React, { useEffect, useState } from 'react';
import './Profile.css';
import { supabase } from '../supabaseClient';

const Profile = () => {
  // Estados
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // Obtener sesión actual
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error obteniendo usuario:", error);
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  // Obtener posts del usuario
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      // El nombre lo obtenemos de user.user_metadata
      const userName = user.user_metadata?.full_name || user.email;

      const { data, error } = await supabase
        .from('Post')
        .select('*')
        .eq('user_name', userName)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al obtener posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div className="profilePage">
      {/* Encabezado */}
      <div className="profileHeader">
        <img
          src="https://i.pinimg.com/736x/74/a7/bf/74a7bf3e184a689c975cc5a4b43bcb79.jpg"
          className="profileImgLarge"
          alt="profile"
        />
        <div className="profileInfo">
          <h2 className="username">
            {user ? user.user_metadata?.full_name || user.email : "Cargando..."}
          </h2>
          <div className="stats">
            <span><b>{posts.length}</b> posts</span>
            <span><b>828</b> followers</span>
            <span><b>163</b> following</span>
          </div>
          <p className="bio">developer web jr | I love coffee ☕</p>
        </div>
      </div>

      {/* Publicaciones */}
      <div className="profilePosts">
        {posts.map((post) => (
          <div key={post.id} className="postItem">
            <img src={post.image_url} alt="post" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
