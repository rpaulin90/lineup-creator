import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Draggable from 'react-draggable';


function DraggablePlayer(props) {

    const [activeDrags, setActiveDrags] = useState(0);


    function onStart() {
        setActiveDrags(activeDrags + 1)
    }

    function onStop(){
        setActiveDrags(activeDrags - 1)
    };


    function deletePlayer(player_id){

        setPlayerArray(playerArray.filter(player => player.id !== player_id))

    }
    const dragHandlers = {onStart: onStart, onStop: onStop};
    return (

        <div>
            <Draggable
                onStart={() => onStart}
                onStop={() => onStop}
            >
                <div className="box">
                    <img src={`https://premierleague-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p${props.player.code}.png`} alt={props.player.web_name} />
                    <button onClick={() => props.deletePlayer(props.player.id)}>delete</button>
                </div>
            </Draggable>
            <style jsx>{`
                .box {
                      background: #fff;
                      border: 1px solid #999;
                      border-radius: 3px;
                      width: 180px;
                      height: 180px;
                      margin: 10px;
                      padding: 10px;
                      float: left;
          `}</style>
        </div>
    );
}


export default DraggablePlayer;
