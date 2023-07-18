var currentUser

function generate() {
    (async function () {
        try {
            const apiManager = await new APIManager()
            Renderer.display(apiManager)
            currentUser = apiManager
        } catch (error) {
            console.error(error)
        }
    })()
}

function display() {
    Renderer.viewSavedUsers(APIManager.transferSavedUsers())
}

function save() {
    APIManager.save(currentUser)
}

function chooseUser() {
    currentUser = APIManager.findUserByName($(this).text())
    Renderer.display(currentUser)
}


$(`.buttons`)
    .on(`click`, `#generate`, generate)
    .on(`click`, `#display`, display)
    .on(`click`, `#save`, save)
    .on(`click`, `.saved-user`, chooseUser)
