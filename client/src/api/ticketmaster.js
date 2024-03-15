import axios from "axios";

export const getEvents = (artistName) => {
	return axios.get('/discover', {
		params: {
			artist: artistName,
		},
	});
}