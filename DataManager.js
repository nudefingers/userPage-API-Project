const USERS_AMOUNT = 7
const TOTAL_POKE_NUM = 949
const USER_URL = `https://randomuser.me/api/?results=`
const QUOTE_URL = `https://api.kanye.rest/`
const BACON_URL = `https://baconipsum.com/api/?type=all-meat&paras=1`
const POKE_URL = `https://pokeapi.co/api/v2/pokemon/`
const GIPHY_URL = `http://api.giphy.com/v1/gifs/search?q=`
const GIPHY_KEY = `&api_key=RI1CIXCll0k2LGXsHrH0DRkv859fx6vX&limit=5`


class DataManager {
    static _users = []
    current = ``

    constructor() {
        return Promise.all([
            this.generateUsers(),
            this.requestQuote(),
            this.requestPokemon(),
            this.requestAboutMeatText()
        ]).then(() => this)
    }

    get user() { return this._user }
    get quote() { return this._quote }
    get giphy() { return this._giphy }
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
                this.generateGiphy(data.name)
                this._pokemon = { name: data.name, image: data.sprites.front_default, type: data.types[0].type.name }
            })
    }

    requestAboutMeatText() {
        return this.fetchData(BACON_URL)
            .then(data => {
                this._aboutMe = data[0]
            })
    }

    generateGiphy(pokeName) {
        return this.fetchData(`${GIPHY_URL}${pokeName}${GIPHY_KEY}`)
            .then(data => {
                this._giphy = data.data[0].images.downsized_large.url
            })
    }

    fetchData(url) {
        return $.ajax({
            url: url,
            dataType: `json`
        })
    }

    static save(user) {
        if (user && !DataManager._users.includes(user)) {
            DataManager._users.push(user)
        }
        console.log(DataManager._users)
    }

    static transferSavedUsers() {
        return DataManager._users.map(u => u.user.name)
    }

    static findUserByName(name) {
        return DataManager._users.find(u => u.user.name === name)
    }
}