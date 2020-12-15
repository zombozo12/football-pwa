let db_promise = idb.open('football-pwa', 1, upgrade_db => {
    upgrade_db.createObjectStore('matches', { 'keyPath' : 'id'})
    upgrade_db.createObjectStore('teams', { 'keyPath' : 'id'})
})

let add_match = (match) => {
    db_promise.then(database => {
        let t = database.transaction('matches', "readwrite")
        let s = t.objectStore('matches')
        match.createdAt = Date.now()
        s.add(match)
        return t.complete
    }).then(() => {
        M.toast({ html: `Match ${match.homeTeam.name} vs ${match.awayTeam.name} saved`})
    }).catch(() => {
        M.toast({ html: `Match ${match.homeTeam.name} vs ${match.awayTeam.name} already saved`})
    })
}

let del_match = (match_id) => {
    db_promise.then(database => {
        let t = database.transaction('matches', 'readwrite')
        let s = t.objectStore('matches')
        s.delete(match_id)
        return t.complete
    }).then(() => {
        M.toast({ html: 'Match deleted' })
    }).catch(error => {
        console.error('Del Match', error)
    })
}

let get_fav_matches = () => {
    return db_promise.then(database => {
        let t = database.transaction('matches', 'readonly')
        let s = t.objectStore('matches')
        return s.getAll()
    })
}

let add_team = team => {
    db_promise.then(database => {
        let t = database.transaction('teams', 'readwrite')
        let s = t.objectStore('teams')
        team.createdAt = Date.now()
        s.add(team)
        return t.complete
    }).then(() => {
        M.toast({ html: `${team.name} saved` })
    }).catch(() => {
        M.toast({ html: `${team.name} already saved` })
    })
}

let del_team = team_id => {
    db_promise.then(database => {
        let t = database.transaction('teams', 'readwrite')
        let s = t.objectStore('teams')
        s.delete(team_id)
        return t.complete
    }).then(() => {
        M.toast({ html: 'Team deleted' })
    }).catch(error => {
        console.error('Del Team', error)
    })
}

let get_fav_teams = () => {
    return db_promise.then(database => {
        let t = database.transaction('teams', 'readonly')
        let s = t.objectStore('teams')
        return s.getAll()
    })
}