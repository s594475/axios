import React , { Component } from 'react';
import Home from './Home';
import NavBar from './shared/NavBar';
import AppBar from 'material-ui/lib/app-bar';
import AppLeftNav from './shared/AppLeftNav';


class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount(){
    let setNavBarState = function(){
      this.setState({renderNavBar: document.body.clientWidth > 700});
    }.bind(this);
    setNavBarState();
    window.onresize = setNavBarState;
  }
  render() {
    return (
      <div className="app-wrap">
        {this.state.renderNavBar?<NavBar />:this._getAppBar()}
        <AppLeftNav ref="leftNav" />
        {this.props.children}
        <div className="app-footer">My Footer</div>
      </div>
    );
  }

  _getAppBar() {
    let title = this.context.router.isActive('/home') ? 'Home' :
      this.context.router.isActive('/account') ? 'Account' :
      this.context.router.isActive('/about') ? 'About' : '';

    return (
      <AppBar title={title}
              onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)}/>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
}



App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default App;
