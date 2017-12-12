import React from "react";
import ReactDom from "react-dom";
import SockJsClient from "react-stomp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.clientRef = null;
  }

  render() {
	setTimeout(() => {this.clientRef.sendMessage("/app/all", "hello")}, 1000);
    return (
      <div>
        <SockJsClient url="http://localhost:8080/handler" topics={["/topic/all"]}
          onMessage={(msg) => { console.log(msg); }} ref={(client) => { this.clientRef = client }} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));

