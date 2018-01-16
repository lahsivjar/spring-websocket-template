import React from "react";
import ReactDom from "react-dom";
import SockJsClient from "react-stomp";
import { TalkBox } from "react-talk";

const randomstring = require("randomstring");

class App extends React.Component {
  constructor(props) {
    super(props);
    // randomUserId is used to emulate a unique user id for this demo usage
    this.randomUserId = randomstring.generate();
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
    this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
  }

  render() {
    const wsSourceUrl = window.location.protocol + "//" + window.location.host + "/handler";
    return (
      <div>
        <TalkBox topic="react-websocket-template"
          currentUser={ this.randomUserId } messages={ this.state.messages }
          onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>

        <SockJsClient url={ wsSourceUrl } topics={["/topic/all"]}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => { this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ false }/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
