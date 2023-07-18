const USERS_AMOUNT = 7
const TOTAL_POKE_NUM = 949
const USER_URL = `https://randomuser.me/api/?results=`
const QUOTE_URL = `https://api.kanye.rest/`
const BACON_URL = `https://baconipsum.com/api/?type=all-meat&paras=1`
const POKE_URL = `https://pokeapi.co/api/v2/pokemon/`


class APIManager {
    static _users = []

    constructor() {
        return Promise.all([
            this.generateUsers(),
            this.requestQuote(),
            this.requestPokemon(),
            this.requestAboutMeatText()
        ]).then(() => this)
    }

    get user()    { return this._user    }
    get quote()   { return this._quote   }
    get friends() { return this._friends }
    get pokemon() { return this._pokemon }
    get aboutMe() { return this._aboutMe }

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
            this._pokemon = { name: data.name, image: data.sprites.front_default }
        })
    }

    requestAboutMeatText() {
        return this.fetchData(BACON_URL)
        .then(data => {
            this._aboutMe = data[0]
        })
    }

    fetchData(url) {
        return $.ajax({
            url: url,
            dataType: `json`
        })
    }

    static save(user) {
        if (user && !APIManager._users.includes(user)) {
            APIManager._users.push(user)
        }
        console.log(APIManager._users)
    }

    static transferSavedUsers() {
        return APIManager._users.map(u => u.user.name)
    }

    static findUserByName(name) {
        return APIManager._users.find(u => u.user.name === name)
    }
}