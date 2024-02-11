import { useSearchParams } from "react-router-dom";
import styles from "../css/SortArticles.module.css";

export default function ({ sortBy, setSortBy, sortOrder, setSortOrder }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSortBy = (e) => {
		e.preventDefault();
		setSortBy(e.target.value);
		const newParams = new URLSearchParams(searchParams);
		newParams.set("sort_by", e.target.value);
		setSearchParams(newParams);
	};

	const handleSortOrder = (e) => {
		e.preventDefault();
		setSortOrder(e.target.value);
		const newParams = new URLSearchParams(searchParams);
		newParams.set("sort", e.target.value);
		setSearchParams(newParams);
	};

	return (
		<form className={styles.sortForm} name="sort form" title="sort form">
			<fieldset title="sort by">
				<label htmlFor="sort_by">sort by: </label>
				<select
					name="sort_by"
					id="sort_by"
					value={sortBy}
					onChange={handleSortBy}
				>
					<option value="author">author</option>
					<option value="comment_count">comments</option>
					<option value="created_at">date</option>
					<option value="title">title</option>
					<option value="topic">topic</option>
					<option value="votes">votes</option>
				</select>
			</fieldset>
			<fieldset title="sort order">
				<label htmlFor="asc">ascending</label>
				<input
					className={styles.checkMark}
					type="radio"
					name="sortOrder"
					id="asc"
					value="asc"
					checked={sortOrder === "asc"}
					onChange={handleSortOrder}
				/>
				<label htmlFor="desc">descending</label>
				<input
					className={styles.checkMark}
					type="radio"
					id="desc"
					name="sortOrder"
					value="desc"
					checked={sortOrder === "desc"}
					onChange={handleSortOrder}
				/>
			</fieldset>
		</form>
	);
}
