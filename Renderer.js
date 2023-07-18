class Renderer {

    static display(user) {
        this.clean()

        const source = $(`#main-template`).html()
        const template = Handlebars.compile(source)
        const context = { user: user }
        const newHTML = template(context)

        const sourceF = $(`#friends-template`).html()
        const templateF = Handlebars.compile(sourceF)
        const contextF = { friends: user.friends }
        const newHTMLF = templateF(contextF)


        $('.container').html()
        $(`.container`).append(newHTML, newHTMLF)
    }

    static viewSavedUsers(users) {
        const displayButton = $(`#display`)
        const popup = $(`#popup`)
        const buttonOffset = displayButton.offset()
        const buttonWidth = displayButton.outerWidth()
        const popupWidth = popup.outerWidth()

        popup.empty()
        popup.css({
            left: buttonOffset.left + (buttonWidth / 2) - (popupWidth / 2),
            bottom: `calc(100% + 10px)`
        })

        $.each(users, (_, user) => {
            let savedUserDiv = $("<div>", { class: "saved-user", text: `${user}` })
            popup.append(savedUserDiv)
        })

        popup.toggle()
    }

    static clean() {
        $(`.container`).children().not(`.buttons`).remove()
        $(`#popup`).hide()
    }
}