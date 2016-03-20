import {connect} from 'react-redux'
import React from 'react'

import {requestWord} from '../actions/testAction'

const Word = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    title: React.PropTypes.string,
    text: React.PropTypes.string
  },
  render() {
    let classes = 'list-group-item' + (this.props.active? ' active' : '')
    let {title, text} = this.props
    return <a href="#" className={classes}>
      <h4 className="list-group-item-heading">{title}</h4>
      <p className="list-group-item-text">{text}</p>
    </a>
  }
})

const App = React.createClass({
  componentWillMount() {
    // this.props.dispatch(requestWord)
  },
  loadWord() {
    console.log(requestWord)
    this.props.dispatch(requestWord)
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="list-group">
            <Word title="asdas" text="asdasdaaaaaa"/>
            <Word title="asdas" text="asdasdaaaaaa"/>
            <Word title="asdas" text="aaa11aa" active={true}/>
          </div>
        </div>
        <div className="col-md-12">
          <button type="button" className="btn btn-primary btn-lg active" onClick={this.loadWord}>Start</button>
          <button type="button" className="btn btn-default btn-lg active">Button</button>
        </div>
    </div>
    );
  }
})

// export default {App}
function mapStateToProps(state) {
  return {...state}
}

export default connect(mapStateToProps)(App)
