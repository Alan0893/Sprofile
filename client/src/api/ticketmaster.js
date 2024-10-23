import axios from "axios";

const url = 'https://sprofile-backend.onrender.com/discover';

export const getEvents = (artistName) => {
	return axios.get(url, {
		params: {
			artist: artistName,
		},
	});
}