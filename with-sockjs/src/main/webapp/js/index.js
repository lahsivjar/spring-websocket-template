import React from "react";
import ReactDom from "react-dom";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientConnected: false,
      messages: [{
        "message": "How you doin'!",
        "author": "pong"
      }]
    };
  }

  onMessageReceive = (msg) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  }

  sendMessage = (msg, selfMsg) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, selfMsg]
    }));
    this.clientRef.sendMessage("/app/all", msg);
  }

  render() {
    return (
      <div>
        <TalkBox topic="react-websocket-template" currentUser="ping" messages={ this.state.messages }
          onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>

        <SockJsClient url="http://localhost:8080/handler" topics={["/topic/all"]}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => { this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ false }/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));

