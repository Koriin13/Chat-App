const redirect = {}

redirect.index = function (res) {
    res.redirect('/')
}

redirect.chat = function (res) {
    res.redirect('/chat.html')
}