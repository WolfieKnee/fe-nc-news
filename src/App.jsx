import { useState } from 'react'
import Header from "./components/Header"
import Navigation from './components/Navigation'
import ArticleManager from './pages/ArticleManager'

function App() {
  return (
    <>
      <h1>NC News</h1>
      <Header/>
      <Navigation />
      <main>
        <ArticleManager/>
      </main>
    </>
  )
}

export default App
