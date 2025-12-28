import axios from "axios";

const url = 'http://127.0.0.1:8888/discover';

export const getEvents = (artistName) => {
	return axios.get(url, {
		params: {
			artist: artistName,
		},
	});
}