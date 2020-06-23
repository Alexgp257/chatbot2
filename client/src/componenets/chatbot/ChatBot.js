import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid} from 'uuid';

import Message from './Message';

const cookies = new Cookies();

class ChatBot extends Component {
    messagesEnd;
    constructor(props){
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: []
        };

        if(cookies.get('userID') === undefined){
           cookies.set('userID', uuid(), {path: '/'});
        }
            console.log(cookies.get('userID'));
    }

    async df_text_query(text) {
        let says = {
            speaks: 'Me',
            msg: {
                text: {
                    text: text
                }
            }
        }

        this.setState({messages: [...this.state.messages, says]})
        const res = await axios.post('/api/df_text_query', {text, userID: cookies.get('userID')} );
        console.log(res);

        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            says ={
                speaks: 'Bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query', {event, userID: cookies.get('userID')});

        for (let msg of res.data.fulfillmentMessages) {
             let says = {
                speaks: 'Bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: "smooth"});
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                if (message.msg && message.msg.text && message.msg.text.text){
                    return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
                } else {
                    return <h2>card</h2>
                }
               
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if(e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        return(
            <div style={{ height: 400, width: 400, float:'right'}}>
                <div id="chatbot" style={{width: '100%', height: '100%', overflow: 'auto'}}>
                <h3>Chat BOT</h3>
                {this.renderMessages(this.state.messages)}
                <div ref={(el) => {this.messagesEnd = el; }} style={{float: 'left', clear: 'both'}}></div>
                <input type="text" onKeyPress={this._handleInputKeyPress} autoFocus />  
                </div>
            </div>
        )
    }
}
       


export default ChatBot;