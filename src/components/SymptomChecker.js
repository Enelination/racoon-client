import React, {Component} from 'react';
import {symptoms} from '../services/symptoms'
import {riskFactors} from '../services/riskFactors'

const headers = {
  "App-Id": "582e2307",
  "App-Key": "c98b58a9bf15795b1dacdfebe5375701",
  "Content-Type": "application/json"
}

class SymptomChecker extends Component {
  state = {
    fields: {
      age: ""
    },
    radio: {
      sex: ""
    },
    symptom_ids: [],
    riskFactors: [],
    response: {}
  }

  handleChange = (event) => {
    const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
    this.setState({ fields: newFields });
  };

  handleRadioChange = (event) => {
    this.setState({radio: {sex: event.target.value}})
  }

  handleSelect = (event) => {
    const options = event.target.options;
    const value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({[event.target.name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const symptomArray = this.state.symptom_ids.map(s => Object.assign({}, {"id": s, "choice_id": "present"}));
    const riskArray = this.state.riskFactors.map(rf => Object.assign({}, {"id": rf, "choice_id": "present"}));
    const evidence = symptomArray.concat(riskArray)
    console.log(evidence)
    fetch("https://api.infermedica.com/covid19/triage", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        "sex": this.state.radio.sex,
        "age": parseInt(this.state.fields.age),
        "evidence": evidence
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({response: json})
    })
  }
  
  render() {
    console.log(!!this.state.response.serious)
    if (this.state.response.serious) {const results = this.state.response.serious.map(a => a.common_name)
    console.log(results)}
    return(
      <div className="symptom-checker">
        <div className="results">
        {!!this.state.response.serious ? <div>Serious symptoms: {this.state.response.serious.map(a => <p key={a.id}>{a.common_name}</p>)}</div> : null
        }
        </div>
        <h5 className="card-title">Please select your sex and age.</h5>
        <form onSubmit={this.handleSubmit} >
          <label className="label">Sex:</label>
            <input 
              type="radio" 
              name="sex" 
              className="input-sex" 
              value="male" 
              checked={this.state.radio.sex === "male"}
              onChange={this.handleRadioChange} />
                <label><i className="fa fa-fw fa-mars"/>Male</label>
            <input 
              type="radio" 
              name="sex" 
              className="input-sex" 
              value="female" 
              checked={this.state.radio.sex === "female"}
              onChange={this.handleRadioChange} />
                <label><i className="fa fa-fw fa-venus"/>Female</label>
          <label className="label">Age:</label>
            <input 
              type="number"
              min="1"
              step="1"
              className="form-control" 
              id="input-age"
              name="age"
              value={this.state.fields.age} 
              onChange={this.handleChange} />
          <label>Select your symptoms: (Hold Ctrl or Cmd to select multiple)</label>
            <select 
              multiple={true} 
              value={this.state.symptom_ids} 
              name="symptom_ids"
              onChange={this.handleSelect} >
                {symptoms.map(symptom => 
                  <option 
                    value={symptom["id"]} 
                    key={symptom["id"]}>
                      {symptom["common_name"]}
                  </option>)}
            </select>
            <label>Select those that apply:</label>
            <select 
              multiple={true} 
              value={this.state.riskFactors} 
              name="riskFactors"
              onChange={this.handleSelect} >
                {riskFactors.map(rf => 
                  <option 
                    value={rf["id"]} 
                    key={rf["id"]}>
                      {rf["question"]}
                  </option>)}
            </select>
            <input 
              type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SymptomChecker