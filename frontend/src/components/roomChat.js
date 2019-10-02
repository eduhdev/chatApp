import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5100');

const rooms = [
  { id: 0, name: 'programming' },
  { id: 1, name: 'design' },
  { id: 2, name: 'project management' },
];

class RoomChat extends Component {
  state = {
    onRoom: false,
    nick: '',
    message: '',
    room: null,
    messages: [],
  };

  componentDidMount() {
    const { messages } = this.state;
    socket.on('message', message => {
      let newMessage = messages;
      newMessage.push(message.message);
      console.log(newMessage);
      this.setState({ messages: newMessage });
    });
  }

  enterRoom = room => {
    socket.emit('join_room', room.name);
    this.setState({ room, onRoom: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      nick,
      message,
      room: { name },
    } = this.state;
    const send = {
      room: name,
      message,
    };
    console.log(send);
    socket.emit('message', send);
  };

  handleNickChange = e => {
    this.setState({ nick: e.target.value });
  };

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  renderListRoom = () => {
    return (
      <ListGroup>
        {rooms.map(room => (
          <ListGroupItem key={room.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {room.name}
            <Button align="right" color="primary" onClick={() => this.enterRoom(room)}>
              Entrar
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  };

  renderChat = () => {
    const { nick, message, messages } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nome">NickName</Label>
            <Input
              type="text"
              name="email"
              id="nome"
              placeholder="Your nick here"
              value={nick}
              onChange={this.handleNickChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Your Message</Label>
            <Input
              type="textarea"
              name="text"
              id="message"
              rows="6"
              value={message}
              onChange={this.handleMessageChange}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>

        <ListGroup>
          {messages.map(item => (
            <ListGroupItem key={item}>{item}</ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  };

  render() {
    const { onRoom } = this.state;
    return <Container>{!onRoom ? this.renderListRoom() : this.renderChat()}</Container>;
  }
}

export default RoomChat;
