import { useSearchParams } from "react-router-dom";

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
		<form>
			<fieldset>
				<label htmlFor="sort_by">sort by: </label>
				<select name="sort_by" value={sortBy} onChange={handleSortBy}>
					<option value="created_at">date</option>
					<option value="title">title</option>
					<option value="topic">topic</option>
					<option value="author">author</option>
					<option value="votes">votes</option>
					{/* <option value="commentCount">comment count</option> */}
				</select>

				<label htmlFor="asc">ascending</label>
				<input
					type="radio"
					name="sortOrder"
					value="asc"
					checked={sortOrder === "asc"}
					onChange={handleSortOrder}
				/>
				<label htmlFor="desc">descending</label>
				<input
					type="radio"
					name="sortOrder"
					value="desc"
					checked={sortOrder === "desc"}
					onChange={handleSortOrder}
				/>
			</fieldset>
		</form>
	);
}
