import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Several Browse Categories
 * https://developer.spotify.com/documentation/web-api/reference/get-categories
 */
const getSeveralBrowseCategories = () => 
	axios.get('https://api.spotify.com/v1/browse/categories', { 
		headers 
	});

//*********************************************************************************************************************************
/**
 * Get Single Browse Category
 * https://developer.spotify.com/documentation/web-api/reference/get-a-category
 */
const getSingleBrowseCategory = (categoryId) =>
	axios.get(`https://api.spotify.com/v1/browse/categories/${categoryId}`, { 
		headers 
	});