var currentUser

function generate() {
    (async function () {
        try {
            const data = await new DataManager()
            Renderer.display(data)
            currentUser = data
        } catch (error) {
            console.error(error)
        }
    })()
}

function display() {
    Renderer.viewSavedUsers(DataManager.transferSavedUsers())
}

function save() {
    DataManager.save(currentUser)
}

function chooseUser() {
    currentUser = DataManager.findUserByName($(this).text())
    Renderer.display(currentUser)
}


$(`.buttons`)
    .on(`click`, `#generate`, generate)
    .on(`click`, `#display`, display)
    .on(`click`, `#save`, save)
    .on(`click`, `.saved-user`, chooseUser)
