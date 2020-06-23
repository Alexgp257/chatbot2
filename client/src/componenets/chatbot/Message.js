import React from 'react';

const Message = (props) => (
    <div className="col s12 m8 offset-m2 offset-l3">
        <div className="card-panel teal lighten-5 z-depth-1">
            <div className="row valign-wrapper">
                {props.speaks === 'Bot' && 
                <div className="col s2">
                <button className="btn-floating btn-large waves-effect waves-light cyan darker-3">{props.speaks}</button>
                </div>
                }
                <div className="col s10">
                    <span className="black-text">
                        {props.text}
                    </span>
                </div>
                {props.speaks === 'Me' && 
                <div className="col s2">
                <button className="btn-floating btn-large waves-effect waves-light cyan darker-3">{props.speaks}</button>
                </div>
                }
            </div>
        </div>
    </div>
);

export default Message;