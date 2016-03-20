import {connect} from 'react-redux'
import React from 'react'

import {initState, requestWord} from '../actions/testAction'

import Message from './Message'

// const Word = React.createClass({
//   propTypes: {
//     active: React.PropTypes.bool,
//     title: React.PropTypes.string,
//     text: React.PropTypes.string
//   },
//   render() {
//     let classes = 'list-group-item' + (this.props.active? ' active' : '')
//     let {title, text} = this.props
//     return <a href="#" className={classes}>
//       <h4 className="list-group-item-heading">{title}</h4>
//       <p className="list-group-item-text">{text}</p>
//     </a>
//   }
// })

const Word = (data) => {
  let classes = 'list-group-item' + (false? ' active' : '')
  return <a href="javascript:void(0)" className={classes} key={data.id}>
    <h4 className="list-group-item-heading">{data.name}</h4>
    <p className="list-group-item-text">{data.translation}</p>
  </a>
}
// <Word title={option.name} text={option.translate}/>
const App = React.createClass({
  componentWillMount() {
    // this.props.dispatch(initState())
  },
  loadWord() {
    this.props.dispatch(requestWord())
  },
  render() {
    let {options} = this.props
    let status = (this.props.status === 'fail') ? 'danger' : ''
    return (
      <div className="row">
        {status &&
          <div className="col-md-12">
            <Message title="Error" text="Something went wrong" type={status}/>
          </div>
        }
        <div className="col-md-12">
          <div className="list-group">
            {options.map(option => Word(option))}
          </div>
        </div>
        <div className="col-md-12 text-center">
          <button type="button" className="btn btn-primary btn-lg active" onClick={this.loadWord}>Next</button>
        </div>
    </div>
    );
  }
})

// export default {App}
function mapStateToProps(state) {
  return {...state.test}
}

export default connect(mapStateToProps)(App)
