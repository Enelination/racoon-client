import {API_ROOT, headers} from '../services/api'

const addBookmark = (event, markerData, history) => {
   
  return (dispatch) => {
     
    return fetch(`${API_ROOT}/bookmarks`, {
      method: "POST", 
      headers: headers,
      body: JSON.stringify({
        user_id: markerData.user_id,
        map_marker_id: markerData.map_marker_id      
        })
    })
    .then(response => response.json())
    .then(json => { console.log(json);
      if(json.error){
        console.log(json.error)
      } else {
        dispatch({type: "SET_BOOKMARKS", bookmarks: json})
        history.push('/profile')
      }
    })
  }
}

export default addBookmark