import { token } from "./index";
import axios from "axios";

// API CALLS ***************************************************************************************
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

//*********************************************************************************************************************************
/**
 * Get Available Market
 * https://developer.spotify.com/documentation/web-api/reference/get-available-markets/
 */
export const getAvailableMarkets = () =>
	axios.get('https://api.spotify.com/v1/markets', { 
		headers 
	});