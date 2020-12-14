let data_matches, data_team

let load_standings = () => {
    let standings = get_standings()

    standings.then(data => {
        let html_standings = ''
        data.standings.forEach(standing => {
            let body = ''
            standing.table.forEach(res => {
                body += `
                    <tr>
                        <td>${res.position}</td>
                        <td><img class="responsive-img" width="24" height="24" src="${res.team.crestUrl || ''}" alt="team-logo"> ${res.team.name}</td>
                        <td>${res.playedGames}</td>
                        <td>${res.won}</td>
                        <td>${res.draw}</td>
                        <td>${res.lost}</td>
                        <td>${res.goalsFor}</td>
                        <td>${res.goalsAgainst}</td>
                        <td>${res.goalDifference}</td>
                        <td>${res.points}</td>
                    </tr>
                `
            })

            html_standings += `
                <div class="col s12 m12">
                    <div class="card">
                        <div class="card-content">
                        <h2 class="header">${standing.group ? standing.group : 'No Groups'}</h2>
                        <table class="responsive-table striped">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Team</th>
                                    <th>Played</th>
                                    <th>Won</th>
                                    <th>Draw</th>
                                    <th>Lost</th>
                                    <th>GF</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                        <tbody>${body}</tbody>
                        </table>
                        </div>
                    </div>
                </div>
            `
        })

        document.getElementById('title').innerHTML = 'Standings'
        document.getElementById('content').innerHTML = html_standings
    })
}

let load_matches = () => {
    let matches = get_matches()
    let html_matches = ''
    matches.then(data => {
        data_matches = data
        let match_days = group_by(data.matches, 'matchday')
        for(let key in match_days) {
            html_matches += `
                <h3>Group stage - ${key ? key : ''}</h3>
                <div class="row">
            `

            match_days[key].forEach(match => {
                html_matches += `
                    <div class="col s12 m6 l6">
                        <div class="card">
                            <div class="card-content card-match">
                                <div style="text-align: center"><h6>${new Date(match.utcDate).toDateString()}</h6></div>
                                <div class="col s10">${match.homeTeam.name}</div>
                                <div class="col s2">${match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : '0'}</div>
                                <div class="col s10">${match.awayTeam.name}</div>
                                <div class="col s2">${match.score.fullTime.awayTeam ? match.score.fullTime.awayTeam: '0'}</div>
                            </div>
                            <div class="card-action right-align">
                                <a class="waves-effect waves-light btn-small blue" onclick="btn_add_match(${match.id})"><i class="material-icons left">star</i>Add to Favorite</a>
                            </div>
                        </div>
                    </div>
                `
            })


            html_matches += `
                </div>
            `
        }

        document.getElementById('title').innerHTML = 'Matches'
        document.getElementById('content').innerHTML = html_matches
    })
}

let load_teams = () => {
    let teams = get_teams()

    teams.then(data => {
        let html_teams = '', body = ''
        data_team = data
        data.teams.forEach(team => {
            body += `
                <div class="col s12 m4 l4">
                    <div class="card">
                        <div class="card-content">
                            <div class="center">
                                <img width="64" height="64" src="${team.crestUrl || ''}" alt="team_logo">
                                <div class="center flow-text">${team.name}</div>
                                <div class="center">${team.area.name}</div>
                                <div class="center"><a href="${team.website}" target="_blank">${team.website}</a></div>
                            </div>
                        </div>
                        <div class="card-action right-align">
                            <a class="waves-effect waves-light btn-small blue" onclick="btn_add_team(${team.id})"><i class="material-icons left">star</i>Add to Favorite</a>
                        </div>
                    </div>
                </div>
            `
        })

        html_teams += `<div class="row">${body}</div>`
        document.getElementById('title').innerHTML = 'Teams'
        document.getElementById('content').innerHTML = html_teams
    })
}

let load_fav_match = () => {
    let fav_matches = get_fav_matches()
    fav_matches.then(matches => {
        let html_fav_match = '', body = ''
        matches.forEach(match => {
            body += `
                <div class="col s12 m4 l4">
                    <div class="card">
                        <div class="card-content card-match">
                            <div style="text-align: center"><h6>${new Date(match.utcDate).toDateString()}</h6></div>
                            <div class="col s10">${match.homeTeam.name}</div>
                            <div class="col s2">${match.score.fullTime.homeTeam ? match.score.fullTime.homeTeam : '0'}</div>
                            <div class="col s10">${match.awayTeam.name}</div>
                            <div class="col s2">${match.score.fullTime.awayTeam ? match.score.fullTime.awayTeam : '0'}</div>
                        </div>
                        <div class="card-action right-align">
                            <a class="waves-effect waves-light btn-small red" onclick="btn_del_match(${match.id})"><i class="material-icons left">delete</i>Delete</a>
                        </div>
                    </div>
                </div>
            `
        })
        if(matches.length === 0) body += '<p>You haven\'t added your favorite match!</p>'
        html_fav_match += `<div class="row">${body}</div>`

        document.getElementById('title').innerHTML = 'Favorite Matches'
        document.getElementById('content').innerHTML = html_fav_match
    })
}

let load_fav_team = () => {
    let fav_teams = get_fav_teams()
    fav_teams.then(teams => {
        data_team = teams
        let html_fav_team = '', body = ''
        teams.forEach(team => {
            body += `
                <div class="col s12 m4 l4">
                    <div class="card">
                        <div class="card-content">
                            <div class="center">
                                <img width="64" height="64" src="${team.crestUrl || ''}" alt="">
                                <div class="flow-text">${team.name}</div>
                                <p>${team.area.name}</p>
                                <a href="${team.website}" target="_blank">${team.website}</a>
                            </div>
                        </div>
                        <div class="card-action right-align">
                            <a class="waves-effect waves-light btn-small red" onclick="btn_del_team(${team.id})"><i class="material-icons left">delete</i>Delete</a>
                        </div>
                    </div>
                </div>
            `
        })

        if(teams.length === 0) body += '<p>You haven\'t added your favorite team</p>'
        html_fav_team += `<div class="row">${body}</div>`
        document.getElementById('title').innerHTML = 'Favorite Teams'
        document.getElementById('content').innerHTML = html_fav_team
    })
}


let group_by = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

let btn_add_match = match_id => {
    let match = data_matches.matches.filter(e => e.id === match_id)[0]
    add_match(match)
}

let btn_del_match = match_id => {
    return confirm('Delete match?') ? del_match(match_id) + load_fav_match(): M.toast({ html: 'Delete match canceled'})
}

let btn_add_team = team_id => {
    let team = data_team.teams.filter(e => e.id === team_id)[0]
    add_team(team)
}

let btn_del_team = team_id => {
    return confirm('Delete team?') ? del_team(team_id) + load_fav_team() : M.toast({ html: 'Delete team canceled'})
}
