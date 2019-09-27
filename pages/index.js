import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import DraggablePlayer from '../components/DraggablePlayer'


function Index(props) {
    const [count, setCount] = useState(0);
    const [filterTeam, setFilterTeam] = useState('all');
    const [playerArray, setPlayerArray] = useState([]);

    function handleChange(event) {
        setFilterTeam(event.target.value);
        //console.log(event.target.value)
    }

    function handleClick(player) {

        if (playerArray.filter(e => e.id === player.id).length === 0) {
            setPlayerArray([...playerArray, player])
        }


    }

    function deletePlayer(player_id){

        setPlayerArray(playerArray.filter(player => player.id !== player_id))

    }

    return (
        <div>
            <div>
                <select value={filterTeam} onChange={handleChange} name="teams">
                    <option value="all">All</option>
                    {props.data2.teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <button onClick={() => setPlayerArray([])}>Reset</button>
            </div>
            <div style={{width: '400px', height: '400px', overflow: 'auto'}}>
                <table>
                    <tbody>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Team
                        </th>
                        <th>
                        </th>
                    </tr>

                    { filterTeam === 'all' ?
                        props.data2.elements.map(player => (

                        <tr key={player.id}>
                            <td>
                                {player.web_name}
                            </td>
                            <td>
                                {props.data2.teams.filter(function(team) {
                                    return team.id === player.team
                                })[0].name}
                            </td>
                            <td>
                                {playerArray.filter(e => e.id === player.id).length === 0 ?

                                    <button onClick={() => handleClick(player)}>
                                    select
                                    </button>

                                    :

                                    ''
                                }

                            </td>
                        </tr>))

                        :

                        props.data2.elements.filter(function(element) {
                            return element.team == filterTeam
                        }).map(player => (

                            <tr key={player.id}>
                                <td>
                                    {player.web_name}
                                </td>
                                <td>
                                    {props.data2.teams.filter(function(team) {
                                        return team.id === player.team
                                    })[0].name}
                                </td>
                                <td>
                                    {playerArray.filter(e => e.id === player.id).length === 0 ?

                                        <button onClick={() => handleClick(player)}>
                                            select
                                        </button>

                                        :

                                        ''
                                    }
                                </td>
                            </tr>))

                    }
                    </tbody>

                </table>

            </div>
            <div>
                {playerArray === [] ?

                    ''

                    :

                    playerArray.map((player,i) => (
                        <div key={player.id}>
                            <DraggablePlayer player={player} deletePlayer={deletePlayer}/>
                            {/*<img src={`https://premierleague-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p${player.code}.png`} alt={player.web_name} />*/}
                            {/*<button onClick={() => deletePlayer(player.id)}>delete</button>*/}
                        </div>
                    ))
                }


            </div>


            <style jsx>{`

                table {
                  font-family: arial, sans-serif;
                  border-collapse: collapse;
                  width: 100%;
                }

                td, th {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
                }

                tr:nth-child(even) {
                  background-color: #dddddd;
                }
          `}</style>
        </div>
    );
}

Index.getInitialProps = async function() {
    // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    // const data = await res.json();

    const res2 = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    const data2 = await res2.json();
    //console.log(data2)

    //console.log(`Show data fetched. Count: ${data.length}`);

    return {
        data2
    };
};


export default Index;