import axios from "axios";
const NCNewsAPI = axios.create({
	baseURL: "https://nc-news-wa7h.onrender.com/api",
});

export default function newsAPIGet(url, params) {
	return NCNewsAPI.get(url, { params });
}

export function newsAPIPatch(url, body) {
	return NCNewsAPI.patch(url, body);
}

export function newsAPIPost(url, body) {
	return NCNewsAPI.post(url, body);
}

export function newsAPIDelete(url) {
	return NCNewsAPI.delete(url);
}
