import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";

const Post = ({ id, username, caption, image_url }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [currentUserName, setCurrentUserName] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserName(user.user_metadata?.user_name || user.email);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!id) return;
      const { count } = await supabase
        .from("Likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", id);
      setLikesCount(count || 0);

      if (currentUserName) {
        const { data } = await supabase
          .from("Likes")
          .select("id")
          .eq("post_id", id)
          .eq("user_name", currentUserName)
          .maybeSingle();
        setLiked(!!data);
      }
    };
    fetchLikes();
  }, [id, currentUserName]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("Comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: true });
      setComments(data || []);
    };
    fetchComments();
  }, [id]);

  const toggleLike = async () => {
    if (!currentUserName) return alert("Please log in to like");
    if (liked) {
      await supabase.from("Likes").delete().eq("post_id", id).eq("user_name", currentUserName);
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      await supabase.from("Likes").insert([{ post_id: id, user_name: currentUserName }]);
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const addComment = async () => {
    if (!currentUserName) return alert("Please log in to comment");
    if (!newComment.trim()) return;
    const { data } = await supabase
      .from("Comments")
      .insert([{ post_id: id, user_name: currentUserName, comment: newComment }])
      .select()
      .single();
    if (data) {
      setComments([...comments, data]);
      setNewComment("");
      setShowComments(true);
    }
  };

  // ===== Estilos en línea tipo Instagram =====
  const styles = {
    post: {
      width: "100%",
      maxWidth: "600px",
      margin: "20px auto",
      background: "#fff",
      border: "1px solid #dbdbdb",
      borderRadius: "8px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
    },
    postInfo: { display: "flex", alignItems: "center", padding: "10px" },
    postInfoImg: { width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" },
    postInfousername: { fontWeight: "bold", marginRight: "5px" },
    timingInfo: { color: "gray", fontSize: "12px" },
    postImg: { width: "100%" },
    iconsBlock: { display: "flex", justifyContent: "space-between", padding: "8px 10px" },
    leftIcon: { display: "flex", gap: "10px" },
    likeSection: { fontWeight: "bold", padding: "0 10px" },
    postAbout: { padding: "5px 10px" },
    viewAllComments: { color: "gray", fontSize: "14px", padding: "0 10px", cursor: "pointer" },
    commentsSection: { maxHeight: "150px", overflowY: "auto", padding: "5px 10px" },
    addCommentSection: {
      display: "flex",
      alignItems: "center",
      borderTop: "1px solid #dbdbdb",
      padding: "5px 10px",
      gap: "10px",
    },
    addCommentInput: { flex: 1, border: "none", outline: "none", fontSize: "14px" },
    addCommentButton: { background: "none", border: "none", color: "#0095f6", fontWeight: "bold", cursor: "pointer" },
  };

  return (
    <div style={styles.post}>
      <div style={styles.postInfo}>
        <img style={styles.postInfoImg} src="https://i.pinimg.com/736x/74/a7/bf/74a7bf3e184a689c975cc5a4b43bcb79.jpg" alt={username} />
        <div style={styles.postInfousername}>{username}</div>
        <div style={styles.timingInfo}>• Just now</div>
      </div>

      <div style={styles.postImg}>
        <img className="postImhage" src={image_url} alt="Post content" style={{ width: "100%" }} />
      </div>

      <div style={styles.iconsBlock}>
        <div style={styles.leftIcon}>
          {liked ? (
            <FavoriteIcon sx={{ fontSize: 30, color: "red", cursor: "pointer" }} onClick={toggleLike} />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{ fontSize: 30, cursor: "pointer" }} onClick={toggleLike} />
          )}
          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 30, cursor: "pointer" }} onClick={() => setShowComments(!showComments)} />
          <SendOutlinedIcon sx={{ fontSize: 30 }} />
        </div>
        <TurnedInNotOutlinedIcon sx={{ fontSize: 30 }} />
      </div>

      <div style={styles.likeSection}>{likesCount} likes</div>

      <div style={styles.postAbout}>
        <b>{username}</b> {caption}
      </div>

      {comments.length > 0 && !showComments && (
        <div style={styles.viewAllComments} onClick={() => setShowComments(true)}>
          View All Comments ({comments.length})
        </div>
      )}

      {showComments && (
        <div style={styles.commentsSection}>
          {comments.map(c => (
            <div key={c.id} style={{ marginBottom: "5px" }}>
              <b>{c.user_name}</b> {c.comment}
            </div>
          ))}
        </div>
      )}

      <div style={styles.addCommentSection}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addComment()}
          style={styles.addCommentInput}
        />
        <button onClick={addComment} style={styles.addCommentButton}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
