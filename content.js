var waitLoad = setInterval(() => {
    if (document.querySelector('.QuestionBoxLayout-module__box--DStBv') != null) {
        znanijaLoaded()
        removeReportBtns()
    }
}, 1000)

function znanijaLoaded() {
    clearInterval(waitLoad)
    
    var questionBox = document.querySelector('.QuestionBoxLayout-module__box--DStBv')
    var zmAnswerInfo = questionBox.appendChild(document.createElement('span'))

    var questionId = document.querySelector('.js-main-question').getAttribute('data-question-id')

    var answers = document.querySelectorAll('.AnswerBoxHeader-module__header--hPd7n')

    var questionAuthor = document.querySelector('.QuestionBoxHeader-module__description--gZEZA').querySelector('span').innerText

    for (var i = 0; i < answers.length; i++) {
        var answerText = document.querySelectorAll('.js-answer-content')[i].innerText

        var words = answerText.split(" ")

        var automodText = document.createElement('span')
        automodText.className = "zm-automod-text"

        if (words.length < 5) {
            document.querySelectorAll('.js-answer-content')[i].appendChild(automodText)
            automodText.innerHTML = "<hr><br><strong>Авто-модерация: Вопрос может содержать спам</strong>"
        }
    }

    zmAnswerInfo.innerHTML = `QID: ${questionId} | QA: ${questionAuthor} | A: ${answers.length}`
}

function removeReportBtns() {
    var btns = document.querySelectorAll('button')

    for (var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute('data-testid') == "options_list_item_report_button" || 
        btns[i].getAttribute('data-testid') == 'comments_item_report_button') btns[i].remove()
    }
}