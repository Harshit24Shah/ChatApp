import React from 'react'
import chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
// import RoomList from './components/RoomList'
// import NewRoomForm from './components/NewRoomForm'
import { instanceLocator, tokenUrl } from './config';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: 'Harshit',
      tokenProvider: new chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        console.log(currentUser);
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: 'ad067ae9-f705-4c85-ab91-3baf7d1d1047',
          hooks: {
            onMessage: message => {
              console.log(message);
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: 'ad067ae9-f705-4c85-ab91-3baf7d1d1047'
    })
  }

  render() {
    return (
      <div className="app">
        {/* <RoomList /> */}
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        {/* <NewRoomForm /> */}
      </div>
    );
  }
}

export default App;