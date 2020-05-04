import React, {Component} from 'react';
import { connect } from 'react-redux';
// import {API_ROOT, authHeaders} from '../services/api'

class Results extends Component{

  handleClick = () => {
    // fetch(`${API_ROOT}/reported_symptoms`, {
    //   method: "POST", 
    //   headers: authHeaders,
    //   body: JSON.stringify({
    //     user_id: this.props.currentUser.id,
    //     symptom_id: symptomId
    //   })
    // })
    //   .then(response => response.json())
    //   .then(json => {console.log(json)
    //   })
    // symptomId = s_1 or p_1 etc 
    console.log("clicked")
  }

  render() {
    return(
      <div className="results">
        
        <header className="results">Preliminary Diagnosis</header>
        {!!this.props.response.description ? 
        <div classname="infermedica-description">
        <p>{this.props.response.description}</p>
        <p>Recommendation: {this.props.response.label}</p>
        <p>The following symptoms are especially serious:</p>
        </div>
        :
        <p>Not enough information given for a formal diagnosis. However, the following reported symptoms are serious and you should seek medical attention if they persist:</p>}
        
        {this.props.response.serious.map(a => 
        <div className="result-item" key={a.id}>
          <p>{a.common_name}</p>
          {a.is_emergency ? <span className="emergency">Emergency symptom</span> : null}
        </div>
        )}
        <button onClick={() => this.handleClick()}>Save Diagnosis</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
		currentUser: state.user.currentUser
	}
}

export default connect(mapStateToProps)(Results)