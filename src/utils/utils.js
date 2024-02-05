import axios from "axios";
const NCNewsAPI = axios.create({
	baseURL: "https://nc-news-wa7h.onrender.com/api",
});

export default function newsAPIGet(url) {
	return NCNewsAPI.get(url);
}
