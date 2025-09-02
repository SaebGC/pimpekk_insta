import { useState } from "react";
import { supabase } from "../supabaseClient";
import instagramLogo from '../assets/instagramLogo.png';

function Login() {
    const [mostrarPopUp, setMostrarPopUp] = useState(false);// Controla si el pop-up de login es visible o no


    const handleGoogleLogin = () => {// Función para iniciar sesión con Google usando Supabase OAuth

        supabase.auth.signInWithOAuth({
            provider: "google", // Proveedor OAuth Google
            options: {
                redirectTo: window.location.origin, // Redirigir al inicio luego de login
            },
        });
    };

    return (
        <div>
            {/* Esto abre el pop-up de login */}
            <button onClick={() => setMostrarPopUp(true)} style={estilos.botonLogin}>
               Log in 
            </button>

            {/* Mostrar pop-up solo si mostrarPopUp es true */}
            {mostrarPopUp && (
                // Fondo oscuro que cubre toda la pantalla, clic para cerrar
                <div style={estilos.fondo} onClick={() => setMostrarPopUp(false)}>
                    {/*Centered white pop-up, prevent clicking on the pop-up from closing the background */}
                    <div style={estilos.popup} onClick={(e) => e.stopPropagation()}>
                        {/* Button for close pop-up */}
                        <button onClick={() => setMostrarPopUp(false)} style={estilos.cerrar}>✖</button>

                        {/* Instagram Logo */}
                        <img className='logoImg' src={instagramLogo} alt="Instagram Logo" />

                        {/* Explanatory text */}
                        <p style={estilos.texto}>Inicia sesión para ver fotos y videos de tus amigos.</p>

                        {/* Button for login Google */}
                        <button onClick={handleGoogleLogin} style={estilos.botonGoogle}>
                            Iniciar sesión con Google
                        </button>

                        {/* Text for registration */}
                        <p style={estilos.registro}>
                            ¿No tienes una cuenta? <a href="#">Regístrate</a>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

const estilos = {
    botonLogin: {
        padding: "10px 20px",
        backgroundColor: "#0095f6",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    fondo: {
        position: "fixed", // Cubre toda la pantalla
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)", // Fondo semi-transparente
        display: "flex", // Para centrar contenido
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000, // Que esté encima de todo
    },
    popup: {
        backgroundColor: "#fff",
        width: "320px",
        padding: "30px 20px",
        borderRadius: "10px",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    },
    cerrar: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "transparent",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
    },
    logo: {
        width: "150px",
        marginBottom: "20px",
    },
    texto: {
        fontSize: "14px",
        marginBottom: "20px",
        color: "#555",
    },
    botonGoogle: {
        padding: "10px",
        width: "100%",
        backgroundColor: "#4285F4", // Azul Google
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    registro: {
        fontSize: "12px",
        marginTop: "20px",
        color: "#555",
    },
};

export default Login;
