import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import ArticleList from "./pages/ArticleList";
import ViewArticle from "./pages/ViewArticle";
import UserContext from "./contexts/UserContext";
import TopicsList from "./pages/TopicsList";
import PageError from "./components/PageError";

import styles from "./css/App.module.css";

function App() {
	// note: hard coded user
	const [loggedInUser, setLoggedInUser] = useState("weegembump");
	return (
		<UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			<Header />
			<Navigation />
			<main>
				<Routes>
					<Route path="/" element={<ArticleList />} />
					<Route path="/articles" element={<ArticleList />} />
					<Route
						path="/articles/:article_id"
						element={<ViewArticle />}
					/>
					<Route path="/topics" element={<TopicsList />} />
					<Route
						path="/topics/:topicSlug"
						element={<ArticleList />}
					/>
					<Route
						path="*"
						element={
							<PageError
								clientMessage={" that page doesn't exist "}
							/>
						}
					/>
				</Routes>
			</main>
		</UserContext.Provider>
	);
}

export default App;
