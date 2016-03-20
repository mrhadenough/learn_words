import {connect} from 'react-redux'
import React from 'react'

const App = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="list-group">
            <a href="#" className="list-group-item active">
              Cras justo odio
            </a>
            <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
            <a href="#" className="list-group-item">Morbi leo risus</a>
            <a href="#" className="list-group-item">Porta ac consectetur ac</a>
            <a href="#" className="list-group-item">Vestibulum at eros</a>
          </div>
        </div>
        <div className="col-md-12">
          Button Copy
          <button type="button" className="btn btn-primary btn-lg active">Primary button</button>
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
