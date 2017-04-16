import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import FacebookLogin from 'react-facebook-login'

import Actions from '../../actions/Creators'


class LoginView extends React.Component {
  constructor(props) {
    super(props)

    this.responseFacebook = this.responseFacebook.bind(this)
  }

  responseFacebook(response) {
    this.props.login(response)
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId={window.facebookId}
          autoLoad
          fields="name,email,picture"
          // onClick={this.onClick}
          callback={this.responseFacebook}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators(Actions, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView))
