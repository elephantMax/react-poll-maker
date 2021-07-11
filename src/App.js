import MainLayout from "./layouts/Main";
import { useLocation } from 'react-router-dom'
import { useEffect, useMemo } from "react";
import crypto from 'crypto'
import Embed from "./layouts/Embed";

function App() {
  const { pathname } = useLocation()
  const layout = useMemo(() => {
    if (pathname.includes('/embed')) return 'embed'
    return 'main'
  }, [pathname])

  useEffect(() => {
    const session_id = localStorage.getItem('session_id')
    if (!session_id) {
      const id = crypto.randomBytes(16).toString('base64')
      localStorage.setItem('session_id', id)
    }
  }, [])

  return (
    <>
      {layout === 'main' ? <MainLayout /> : <Embed />}
    </>
  );
}

export default App;
