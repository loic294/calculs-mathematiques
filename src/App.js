import React, { Component } from 'react';
import './App.css';

const erreurs = [
  "Oups! Mauvaise réponse.",
  "Oh non! C'est mauvais...",
  "Non non, ce n'est pas bon!",
  "Vaut mieux réessayer"
]

class App extends Component {

  constructor() {
    super()
    this.state = {
      min: 1,
      max: 12,
      erreur: null,
      value: '',
      val1: 0,
      val2: 0,
      total: 0,
      bonnes: 0,
      division: false
    }
  }

  componentDidMount() {
    this.setState({ ...this.generateValues() })
  }

  generateValue(val, type) {
    let { min, max } = this.state
    const diff = max - min;
    if(type === "min") min = 1
    if(!diff)
      return max
    return min + Math.round(Math.random() * 100 % diff)
  }

  generateValues() {
    const { min, max } = this.state
    const val = [this.generateValue(min, 'min'), this.generateValue(max, 'max')]
    const odds = Math.round(Math.random() * 10 % 2)
    return {
      val1: val[odds ? 0 : 1],
      val2: val[odds ? 1 : 0]
    }
  }

  newValues() {
    this.setState({
        ...this.generateValues(),
        erreur: null,
        value: ''
      })
  }

  generate(e) {
    e.preventDefault()
    const { val1, val2, value, bonnes, total, division } = this.state
    const resultat = division ? val1 : val1 * val2
    if(resultat === parseInt(value)) {
      this.setState({
        bonnes: bonnes + 1,
        total: total + 1
      })
      this.newValues()
    } else 
      this.setState({ 
        total: total + 1,
        value: '',
        erreur: erreurs[Math.floor(Math.random() * 100 % erreurs.length)]
       })
  }  

  onDropdownChange = (value, target) => {
    this.setState({ 
      max: target === "max" || (target === "min" && value > this.state.max) ? value : this.state.max,
      min: target === "min" || (target === "max" && value < this.state.min) ? value : this.state.min
    }, () => this.newValues())
  }

  dropdown(target) {
    return <select value={this.state[target]} onChange={(e) => this.onDropdownChange(parseInt(e.target.value), target)}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
    </select>
  }

  render() {
    const { val1, val2, erreur, value, bonnes, total, division } = this.state
    
    return (
      <div className="App">

        <div className="top-layer">
          <div className="center-content">
            <div className="selections">Multiples de {this.dropdown('min')} à {this.dropdown('max')}</div>

            {erreur && <div className="erreur">{erreur}</div>}

            <form onSubmit={(e) => this.generate(e)} className="inline-form">
              <span className="">{division ? val1 * val2 : val1} {division ? '÷' : 'x'} {val2} = <input type="number" value={value} onChange={(e) => this.setState({ value: e.target.value })} /></span>
              <button type="submit">
                <i className="material-icons">arrow_forward</i>
              </button>
            </form>

            {!!total && <div className="resultat">Résulat: {Math.round(bonnes/total*100)}% ({bonnes}/{total})</div>}
            

          </div>
        </div>

        <div className="liens">
          <a className={!division && 'active'} onClick={(e) => {e.preventDefault(); this.setState({ division: false })}} href="#">Multiplication</a>
          <a className={division && 'active'} onClick={(e) => {e.preventDefault(); this.setState({ division: true })}} href="#">Division</a>
        </div>

        
      </div>
    );
  }
}

export default App;
