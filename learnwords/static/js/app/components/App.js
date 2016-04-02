import {connect} from 'react-redux'
import React from 'react'

import {initState, voteWord, requestWord} from '../actions/testAction'

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

const Word = (dispatch, data, showTranslation) => {
  let classes = 'list-group-item' + (false? ' active' : '')
  return <a href="javascript:void(0)" className={classes} key={data.id}>
    <h4 className="list-group-item-heading">{data.name}</h4>
    {showTranslation ?
      <p className="list-group-item-text">{data.translation}</p>
    :
      <p className="list-group-item-text" onClick={() => {dispatch(voteWord(data))}}>&nbsp;</p>
    }
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
    let {options, voted, answer} = this.props
    let status = (this.props.status === 'fail') ? 'danger' : ''
    return (
      <div className="row">
        {status &&
          <div className="col-md-12">
            <Message title="Error" text="Something went wrong" type={status}/>
          </div>
        }
        <div className="col-md-12">
          {answer}
        </div>
        <div className="col-md-12">
        <h3>{this.props.word.translation}</h3>
        <br/>
        </div>
        <div className="col-md-12">
          <div className="list-group">
            {options.map(option => Word(this.props.dispatch, option, voted))}
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
