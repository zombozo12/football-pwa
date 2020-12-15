document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elements)
    load_nav()

    let page = window.location.hash.substring(1)
    if(page === "") page = 'home'
    load_page(page)

    function load_nav(){
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if(this.readyState !== 4) return
            if(this.status !== 200) return
            document.querySelectorAll('.topnav, .sidenav').forEach(element => {
                element.innerHTML = xhttp.responseText
            })

            document.querySelectorAll('.sidenav a, .topnav a').forEach(element => {
                element.addEventListener('click', e => {
                    let side_nav = document.querySelector('.sidenav')
                    M.Sidenav.getInstance(side_nav).close()

                    page = e.target.getAttribute('href').substring(1)
                    load_page(page)
                })
            })
        }

        xhttp.open('GET', '/nav.html', true)
        xhttp.send()
    }

    function load_page(page){
        switch (page){
            case 'home':
                load_standings()
                break;
            case 'matches':
                load_matches()
                break;
            case 'teams':
                load_teams()
                break;
            case 'fav_match':
                load_fav_match()
                break;
            case 'fav_team':
                load_fav_team()
                break;
            /*default:
                load_404()*/
        }
    }
})