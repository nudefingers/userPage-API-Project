
class Renderer {

    static display(user) {
        const source = $(`#main-template`).html()
        const template = Handlebars.compile(source)
        const context = { user: user }
        const newHTML = template(context)
        $(`body`).append(newHTML)

        const sourceF = $(`#friends-template`).html()
        const templateF = Handlebars.compile(sourceF)
        const contextF = { friends: user.friends }
        const newHTMLF = templateF(contextF)
        $(`friends`).append(newHTMLF)
    }
}