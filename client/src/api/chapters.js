import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get a Chapter
 * https://developer.spotify.com/documentation/web-api/reference/get-a-chapter
 */
export const getChapter = (chapterId) =>
	axios.get(`https://api.spotify.com/v1/chapters/${chapterId}`, { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Several Chapters
 * https://developer.spotify.com/documentation/web-api/reference/get-several-chapters
 */
export const getSeveralChapters = (ids) =>
	axios.get(`https://api.spotify.com/v1/chapters?ids=${ids}`, { 
		headers 
	});