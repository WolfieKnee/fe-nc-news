import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newsAPIGet from "../utils/utils";

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
			.catch(() => {
				setIsLoading(false);
				setErrorState(true);
			});
	}, []);

	if (isLoading) {
		return <p>loading....</p>;
	}

	if (errorState) {
		return <p>something went wrong getting the topics</p>;
	}
	return (
		<div name="topic List">
			<ul className="topic-list">
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
