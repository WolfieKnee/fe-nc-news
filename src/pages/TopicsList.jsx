import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newsAPIGet from "../utils/utils";
import PageError from "../components/PageError";
import styles from "../css/TopicsList.module.css";

export default function TopicsList() {
	const [topicList, setTopicList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorState, setErrorState] = useState(null);

	useEffect(() => {
		setIsLoading(true);

		newsAPIGet("/topics")
			.then(({ data }) => {
				const { topics } = data;
				setIsLoading(false);
				setTopicList(topics);
			})
			.catch((err) => {
				setIsLoading(false);
				setErrorState(err.response);
			});
	}, []);

	if (isLoading) {
		return <p>loading....</p>;
	}

	if (errorState) {
		<PageError
			clientMessage={" we couldn't get the topics for you."}
			error={errorState}
		/>;
	}
	return (
		<div className={styles.topicsList}>
			<h3>Articles are available on the following topics:</h3>
			<ul>
				{topicList.map((topic) => {
					return (
						<li key={topic.slug}>
							<Link to={`/topics/${topic.slug}`}>
								{topic.slug}
							</Link>
							: {topic.description}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
