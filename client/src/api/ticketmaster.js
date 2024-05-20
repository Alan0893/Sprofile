import axios from "axios";

const url = process.env.REACT_APP_URL ? '/discover' : 'https://sprofile-backend.onrender.com/discover';

export const getEvents = (artistName) => {
	return axios.get(url, {
		params: {
			artist: artistName,
		},
	});
}