import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL 
  ? `${process.env.REACT_APP_BACKEND_URL}/discover`
  : 'http://127.0.0.1:8888/discover';

export const getEvents = (artistName) => {
	return axios.get(url, {
		params: {
			artist: artistName,
		},
	});
}