import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card';
import axios from 'axios';
import UserInfo from './UserInfo';
import isEmpty from 'lodash/lang/isEmpty';
class App extends React.Component {
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  constructor(props) {
    super(props);
    this.state = {//设置state的初始值
      user: {},
    };
  }
  _handleSubmit(e) {
    e.preventDefault();//不网页刷新
    const account = this.refs.account.getValue();//获得输入的值
    axios.get(`https://api.github.com/users/${account}`)
         .then((res) => {//异步编程法,监听函数
           this.setState({user: res.data});//更改state的值
          });
  }
  render () {
    let GitHubInfo;

    if(!isEmpty(this.state.user)) {
      GitHubInfo = (
        <UserInfo userInfo={this.state.user} />
      );
    }
    let styles = {
      padding: '10px'
    }
    return(
      <div style={styles}>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <TextField hintText="Your Github Account"
                     ref="account"/>
          <FlatButton label="Search Github"
                      type="submit"
                      primary={true}/>
        </form>
        { GitHubInfo }
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
