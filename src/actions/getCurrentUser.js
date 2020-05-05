import {API_ROOT, authHeaders} from '../services/api'

const getCurrentUser = () => {
	return (dispatch) => {
		return fetch(`${API_ROOT}/current-user`, {
		headers: authHeaders
		})
		.then(res => res.json())
		.catch((error) => {
			if (error) {
				console.log(error);
				dispatch({ type: "SET_ERROR", messages: [error] })
			}
			else {
				return window.alert("???")
			}
		})
		.then(json => { 
			if(json.user !== undefined) {
				console.log(json.user);
				dispatch({ type: "SET_CURRENT_USER", user: json.user })
				dispatch({ type: "NO_ERROR" })
				dispatch({type: "SET_SYMPTOMS", symptoms: json.user.reported_symptoms})
				dispatch({type: "SET_BOOKMARKS", bookmarks: json.user.bookmarks})
				dispatch({type: "SET_CREATED_MARKERS", createdMarkers: json.user.created_markers})
			} 
			else {
				console.log(json, "not logged in")
			}
		})
	}
};

export default getCurrentUser