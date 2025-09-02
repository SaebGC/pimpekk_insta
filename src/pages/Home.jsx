import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Importa la configuración de Supabase
import { Link } from "react-router-dom";       // Para navegación entre páginas
import Login from '../components/Login';       // Componente para login

function Home() {
  // Estado para guardar la info del usuario actual, null si no está logueado
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al montar el componente, comprobamos si ya hay una sesión activa
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Si existe sesión, guardamos el usuario en el estado, sino null
      setUser(session?.user ?? null);
    });

    // Escuchamos cambios en la autenticación (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Actualizamos el estado del usuario cada vez que cambia la sesión
      setUser(session?.user ?? null);
    });

    // Limpiamos el listener cuando el componente se desmonta para evitar memory leaks
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Si no hay usuario logueado, mostramos la pantalla de login
  if (!user) {
    return (
      <div className="page">
        <h1>Iniciar sesión</h1>
        <Login /> {/* Componente con el formulario o método de login */}
      </div>
    );
  }
}

export default Home;
