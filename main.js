function generate() {
    (async function () {
        try {
            const apiManager = await new APIManager()
            Renderer.display(apiManager)
        } catch (error) {
            console.error(error)
        }
    })()
}

function display() {
    alert(`display`)
    // let user = APIManager.generate()
}

function save() {
    alert(`save`)
    // let user = APIManager.generate()
}

$('#generate_button').on('click', function () {
    apiManager.fetchUserData().then(() => {
        user = new User(apiManager.data)
        currentUser = user
        renderer.renderUserPage(user)
    }).catch(error => {
        alert("Couldn't get data from API's!")
    });
})


$(`.buttons`)
    .on(`click`, `#generate`, generate)
    .on(`click`, `#display`, display)
    .on(`click`, `#save`, save)
