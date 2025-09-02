import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function CreatePost({ onClose }) {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState(null);

  // Obtener usuario logueado al montar el componente
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

  const handleCreatePost = async () => {
    if (!caption || !imageUrl) {
      alert("Please fill in all fields");
      return;
    }

    if (!user) {
      alert("You must be logged in to create a post");
      return;
    }

    // Nombre desde Google o email
    const userName = user.user_metadata?.full_name || user.email;

    const { error } = await supabase
      .from("Post")
      .insert([{ user_name: userName, caption, image_url: imageUrl }]);

    if (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    } else {
      alert("Post created successfully");
      onClose();
    }
  };

  return (
    <div className="createPost">
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleCreatePost}>Share</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CreatePost;
