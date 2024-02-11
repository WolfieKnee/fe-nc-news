import { useSearchParams } from "react-router-dom";
import styles from "../css/SortArticles.module.css";

export default function ({
	sortBy,
	setSortBy,
	sortOrder,
	setSortOrder,
	perPage,
	setPerPage,
	page,
	setPage,
}) {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSortBy = (e) => {
		e.preventDefault();
		setSortBy(e.target.value);
	};

	const handleSortOrder = (e) => {
		e.preventDefault();
		setSortOrder(e.target.value);
	};

	const handlePerPage = (e) => {
		e.preventDefault();
		setPerPage(e.target.value);
	};

	const handlePage = (e, direction) => {
		e.preventDefault();
		setPage(Number(page) + Number(direction));
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
			<fieldset
				className={styles.pagination}
				name="pagination"
				title="pagination"
			>
				<label htmlFor="perPage">articles per page: </label>
				<select
					name="perPage"
					id="perPage"
					value={perPage}
					onChange={handlePerPage}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="all">all</option>
				</select>
				<button onClick={(e) => handlePage(e, -1)}>previous</button>
				page {page}
				<button onClick={(e) => handlePage(e, 1)}>next</button>
			</fieldset>
		</form>
	);
}
