import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import DraggablePlayer from '../components/DraggablePlayer'
import { Button, Grid, Segment } from 'semantic-ui-react'


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
        <Layout>
            <Grid stackable columns={2}>
                <Grid.Column width={6}>
                    <Segment>
                        <div>
                            <select value={filterTeam} onChange={handleChange} name="teams">
                                <option value="all">All</option>
                                {props.data2.teams.map(team => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                            </select>
                            <button onClick={() => setPlayerArray([])}>Reset</button>
                        </div>
                        <div style={{height: '400px', overflow: 'auto'}}>
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

                                                    <Button onClick={() => handleClick(player)}>
                                                        select
                                                    </Button>

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

                                                    <Button onClick={() => handleClick(player)}>
                                                        select
                                                    </Button>

                                                    :

                                                    ''
                                                }
                                            </td>
                                        </tr>))

                                }
                                </tbody>

                            </table>

                        </div>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Segment style={{height: '600px', width: '100%', backgroundColor: '#18ba65'}}>
                                {playerArray === [] ?

                                    ''

                                    :
                                    <div style={{width: '100%', height: '100%'}}>
                                        {playerArray.map((player,i) => (

                                        <DraggablePlayer key={player.id} key={player.id} player={player} deletePlayer={deletePlayer}/>


                                        )) }
                                    </div>

                                }

                    </Segment>
                </Grid.Column>
            </Grid>



            {/*<style jsx>{`*/}

                {/*table {*/}
                  {/*font-family: arial, sans-serif;*/}
                  {/*border-collapse: collapse;*/}
                  {/*width: 100%;*/}
                {/*}*/}

                {/*td, th {*/}
                  {/*border: 1px solid #dddddd;*/}
                  {/*text-align: left;*/}
                  {/*padding: 8px;*/}
                {/*}*/}

                {/*tr:nth-child(even) {*/}
                  {/*background-color: #dddddd;*/}
                {/*}*/}
          {/*`}</style>*/}
        </Layout>
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