import React, { useEffect } from 'react'
import { Route, Routes , Navigate} from 'react-router'
import ChatPage from './pages/chatPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import SignUpPage from './pages/signUpPage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import PageLoader from './components/PageLoader.jsx'
import {Toaster} from 'react-hot-toast'

function App() {

  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth();
  
  }, [checkAuth]);
  
  console.log({authUser});

  if(isCheckingAuth)  return <PageLoader />;
  
  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>

      {/* Decorators - Grid BG & Glow Shapes */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(127,127,127,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(127,127,127,0.18)_1px,transparent_1px)] bg-[size:14px_24px]' />
      <div className='absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]'/>
      <div className='absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]'/>
      
      
      <Routes>
        <Route path='/' element={authUser ? <ChatPage /> : <Navigate to = {"/login"} />} />

        <Route path='/login' element={ !authUser ? <LoginPage />: <Navigate to = {"/"} />} />

        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App