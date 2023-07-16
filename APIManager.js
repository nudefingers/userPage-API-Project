const USERS_AMOUNT = 7
const USER_URL = `https://randomuser.me/api/?results=`
const QUOTE_URL = `https://api.kanye.rest/`
const BACON_URL = `https://baconipsum.com/api/?type=all-meat&paras=1`
const POKE_URL = `https://pokeapi.co/api/v2/pokemon/`
const TOTAL_POKE_NUM = 949


class APIManager {
    constructor() {
        return Promise.all([
            this.generateUsers(),
            this.requestQuote(),
            this.requestPokemon(),
            this.requestAboutMeatText()
        ]).then(() => this)
    }

    generateUsers() {
        return this.fetchData(`${USER_URL}${USERS_AMOUNT}`)
        .then(users => {
            const [firstUser, ...remainingUsers] = users.results
            this._user = {
                photo: firstUser.picture.large,
                name: `${firstUser.name.first} ${firstUser.name.last}`,
                city: firstUser.location.city,
                state: firstUser.location.state
            }
            this._friends = remainingUsers.map(u => u.name).map(n => `${n.first} ${n.last}`)
        })
    }

    requestQuote() {
        return this.fetchData(QUOTE_URL)
        .then(data => {
            this._quote = data.quote
        })
    }

    requestPokemon() {
        let randomId = Math.floor(Math.random() * TOTAL_POKE_NUM) + 1
        return this.fetchData(`${POKE_URL}${randomId}`)
        .then(data => {
            this._pokemon = {
                name: data.name,
                image: data.sprites.front_default
            }
        })
    }

    requestAboutMeatText() {
        return this.fetchData(BACON_URL)
        .then(data => {
            this._aboutMe = data[0]
        })
    }

    get user() {
        return this._user
    }

    get friends() {
        return this._friends
    }

    get quote() {
        return this._quote
    }

    get pokemon() {
        return this._pokemon
    }

    get aboutMe() {
        return this._aboutMe
    }

    fetchData(url) {
        return $.ajax({
            url: url,
            dataType: `json`
        })
    }

}