import './LeftSide.css';
import React, { useState, useEffect } from 'react';
import profilephoto from '../assets/profilephoto.jpeg';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import GestureOutlinedIcon from '@mui/icons-material/GestureOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import instagramLogo from '../assets/instagramLogo.png';
import { supabase } from "../supabaseClient";
import { Link } from 'react-router-dom';

const LeftSide = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState(null);

  // Obtener usuario actual
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) setUser(data.user);
    };
    getUser();
  }, []);

  const handleCreatePost = async () => {
    if (!caption || !imageUrl) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (!user) {
      alert("Debes iniciar sesión para crear un post");
      return;
    }

    const userName = user.user_metadata?.full_name || user.email;

    const { error } = await supabase
      .from("Post")
      .insert([{ user_name: userName, caption, image_url: imageUrl }]);

    if (error) {
      console.error(error);
      alert("Error al crear el post");
    } else {
      alert("Post creado con éxito");
      setShowPopup(false);
      setCaption("");
      setImageUrl("");
    }
  };

  return (
    <div className='leftSidePart'>
      <div className='logoPart'>
        <img className='logoImg' src={instagramLogo} alt="" />
      </div>

      <div className='navLinkPart'>
        <div className='navLink'>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <HomeRoundedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
            <div className='navName'>Home</div>
          </Link>
        </div>
        <div className='navLink'>
          <SearchRoundedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
          <div className='navName'>Search</div>
        </div>
        <div className='navLink'>
          <ExploreRoundedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
          <div className='navName'>Explore</div>
        </div>
        <div className='navLink'>
          <SmartDisplayOutlinedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
          <div className='navName'>Reels</div>
        </div>
        <div className='navLink'>
          <MarkunreadOutlinedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
          <div className='navName'>Messages</div>
        </div>
        <div className='navLink'>
          <FavoriteBorderOutlinedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
          <div className='navName'>Notifications</div>
        </div>

        {/* Botón Create */}
        <div className='navLink' style={{ cursor: "pointer" }} onClick={() => setShowPopup(true)}>
          <AddBoxOutlinedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
          <div className='navName'>Create</div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.65)",
              display: "flex", justifyContent: "center", alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setShowPopup(false)}
          >
            <div
              style={{
                backgroundColor: "#fff", borderRadius: 12, width: 350,
                maxWidth: "90vw", padding: "20px 25px",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                display: "flex", flexDirection: "column", gap: 15,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ margin: 0, fontWeight: "600", fontSize: 22, textAlign: "center" }}>
                Create post
              </h3>

              <textarea
                placeholder="Add text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                style={{
                  padding: "10px 12px", fontSize: 16, borderRadius: 8,
                  border: "1px solid #dbdbdb", resize: "none",
                  outline: "none", fontFamily: "inherit",
                }}
              />

              <input
                type="text"
                placeholder="URL image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{
                  padding: "10px 12px", fontSize: 16, borderRadius: 8,
                  border: "1px solid #dbdbdb", outline: "none",
                }}
              />

              <button
                onClick={handleCreatePost}
                style={{
                  backgroundColor: "#3897f0", color: "white",
                  fontWeight: "600", padding: "10px 0", borderRadius: 8,
                  border: "none", cursor: "pointer", fontSize: 16,
                }}
              >
                Share
              </button>

              <button
                onClick={() => setShowPopup(false)}
                style={{
                  backgroundColor: "transparent", color: "#3897f0",
                  fontWeight: "600", padding: "10px 0", borderRadius: 8,
                  border: "none", cursor: "pointer", fontSize: 16,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className='navLink'>
          <Link to="/profile" className="profileLink">
            <img className='profileImg' src={profilephoto} alt="" />
            <div className='navName'>Profile</div>
          </Link>
        </div>

        <div className="belowPart">
          <Link to="https://www.threads.com/?hl=es-la" style={{ textDecoration: "none", color: "inherit" }}>
            <div className='navLink' style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <GestureOutlinedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
              <div className='navName'>Threads</div>
            </div>
          </Link>
        </div>
        <div className='navLink'>
          <MenuOutlinedIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
          <div className='navName'>More</div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
