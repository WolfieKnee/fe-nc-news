import { Routes, Route } from 'react-router-dom';

import Header from "./components/Header"
import Navigation from './components/Navigation'
import ArticleList from './pages/ArticleList';
import ViewArticle from './pages/ViewArticle';
import "./App.css";

function App() {
  return (
    <>
      <Header/>
      <Navigation />      
      <main>
        <Routes>
          <Route path="/" element={<ArticleList/>} />
          <Route path="/:article_id" element={<ViewArticle/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
