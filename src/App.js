import logo from './logo.svg';
import './App.css';
import Page from './components/Page';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainSection from './components/MainSection';
import About from './components/About';
import React ,{useEfect,useEffect,useState} from 'react';
import axios from 'axios';
function App() {

  const[sessionId,setSessionId] = useState(localStorage.getItem('session_id') ||null);
  
  useEffect(()=>{
    const initSession=async()=>{
      try{
      const response = await axios.get('https://rag-chat-pdf.onrender.com/create_session');
      const ses=response.data
      setSessionId(ses['session_id'])
      localStorage.setItem('sessionId', ses['session_id']);
      console.log("Session Created:",ses['session_id'],"LOCAL:",localStorage.getItem('sessionId'));
      
    }catch(error){
      console.error('Error:', error);
      alert('Error creating session. Please try again');
    }
  };
  
  if(sessionId===null)
  {initSession();}
  console.log("Session Created:",sessionId);

  
  const handleTabClose=async(event)=>{
try{
  axios.post('https://rag-chat-pdf.onrender.com/delete_session',{session_id:localStorage.getItem('sessionId')});
  setSessionId(null);
  localStorage.removeItem('sessionId');
  console.log("Session Closed!")
}catch(error){
  console.error('Error:', error);
}
  };
  window.addEventListener('beforeunload',handleTabClose);
  return () => {
    window.removeEventListener('beforeunload', handleTabClose);
  };
}
  ,[]);


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainSection sessionId={sessionId} />} /> 
        <Route path='/about' element={<About/>} />
        <Route path="/page" element={<Page sessionId={sessionId}/> }/>
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
