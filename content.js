var bad_words = [
    "сука",
    "еблан",
    "блять",
    "хуйло",
    "пидорас",
    "пидор"
]

var waitLoad = setInterval(() => {
    if (getQuestion() != null) {
        znanijaLoaded()
        removeReportBtns()
        addListeners()
    }
}, 1000)

function znanijaLoaded() {
    clearInterval(waitLoad)
    
    var questionBox = getQuestion()
    var zmQuestionInfo = questionBox.appendChild(document.createElement('div'))

    var questionId = document.querySelector('.js-main-question').getAttribute('data-question-id')

    var answers = getAnswers()

    var questionAuthor = document.querySelector('.QuestionBoxHeader-module__description--gZEZA').querySelector('span').innerText

    for (var i = 0; i < answers.length; i++) {
        var currentAnswer = getAnswers()[i]
        var answerText = getAnswerText(i)

        var words = answerText.split(" ")

        var automodText = document.createElement('span')
        automodText.className = "zm-automod-text"

        if (words.length < 5) {
            document.querySelectorAll('.js-answer-content')[i].appendChild(automodText)
            automodText.innerHTML = "<hr><b>Авто-модерация: Вопрос может содержать спам</b>"
            currentAnswer.className += " zm-warned-answer"
        }

        if (checkText(answerText)) {
            currentAnswer.className += " zm-warned-answer"
            currentAnswer.innerHTML += "<br><b>Авто-модерация: Содержит маты</b>"
        }
    }

    zmQuestionInfo.className = "zm-questionbox-information"
    zmQuestionInfo.innerHTML = `<span>ID Вопроса: ${questionId} | Автор: ${questionAuthor} | Кол-во ответов: ${answers.length}</span>
    <input id="zm-questionbox-information-link" type="text" value="https://znanija.com/task/${questionId}" hidden readonly>`
    createButton(zmQuestionInfo, 'Скопировать URL', 'zm-questionbox-information-copylink')
}

function removeReportBtns() {
    var btns = document.querySelectorAll('button')

    for (var i = 0; i < btns.length; i++) {
        if (btns[i].getAttribute('data-testid') == "options_list_item_report_button" || 
        btns[i].getAttribute('data-testid') == 'comments_item_report_button') btns[i].remove()
    }
}

function addListeners() {
    document.getElementById('zm-questionbox-information-copylink').addEventListener('click', copyQuestionLink)
}

function copyQuestionLink() {
    var questionId = document.querySelector('.js-main-question').getAttribute('data-question-id')

    navigator.clipboard.writeText("https://znanija.com/task/" + questionId)

    alert('Ссылка на задание скопирована!')
}

function createButton(parent = document, text, id) {
    var button = document.createElement('button')
    button.setAttribute('id', id)
    button.className = 'zm-button'
    button.innerText = text

    parent.appendChild(button)
}

function checkText(text) {
    text = text.split(" ")

    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < bad_words.length; j++) {
            if (text[i].toLowerCase() == bad_words[j]) {
                return true
            }
        }
    }

    return false
}

function getQuestion() {
    return document.querySelector('.QuestionBoxLayout-module__box--DStBv')
}

function getAnswers() {
    return document.querySelectorAll('.AnswerBoxLayout-module__box--FSknG')
}

function getAnswerText(id) {
    return document.querySelectorAll('.js-answer-content')[id].innerText
}