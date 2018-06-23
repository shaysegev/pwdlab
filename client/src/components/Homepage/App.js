import React, { Component } from 'react';
import { connect } from 'react-redux';
import { simpleAction } from '../../actions/simpleAction'
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import './App.css';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  simpleAction = (event) => {
    this.props.simpleAction();
   }

  render() {
    return (
      <div className="App">
        <Layout>
          <Header> <h1>Pwdlab</h1></Header>
          <Content>
            <p className="App-intro">{this.state.response}</p>
            <button onClick={this.simpleAction}>Test redux action</button>
            <pre>
              {
                JSON.stringify(this.props)
              }
            </pre>
        </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

 const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

 export default connect(mapStateToProps, mapDispatchToProps)(App)