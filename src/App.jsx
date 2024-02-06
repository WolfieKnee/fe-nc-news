import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from "./components/Header"
import Navigation from './components/Navigation'
import ArticleList from './pages/ArticleList';
import ViewArticle from './pages/ViewArticle';
import UserContext from "./contexts/UserContext";
import "./App.css";

function App() {
  // note: hard coded user
  const [loggedInUser, setLoggedInUser] = useState("weegembump");
  return (
    <UserContext.Provider value = {{loggedInUser, setLoggedInUser}}>
      <Header/>
      <Navigation />      
      <main>
        <Routes>
          <Route path="/" element={<ArticleList/>} />
          <Route path="/:article_id" element={<ViewArticle/>} />
        </Routes>
      </main>
    </UserContext.Provider>
  )
}

export default App
