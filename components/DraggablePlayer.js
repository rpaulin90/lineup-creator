import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Draggable from 'react-draggable';
import { Button, Image, Icon } from 'semantic-ui-react'


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

            <Draggable
                onStart={() => onStart}
                onStop={() => onStop}
                bounds="parent"

            >
                <div style={{width: 'fit-content', position: 'absolute'}}>
                    <div>
                        <Image circular size='tiny' draggable="false" src={`https://premierleague-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p${props.player.code}.png`} alt={props.player.web_name} />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <Button circular icon onClick={() => props.deletePlayer(props.player.id)}><Icon name='delete' /></Button>
                    </div>

                </div>
            </Draggable>
    );
}


export default DraggablePlayer;
