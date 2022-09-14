var bad_words = ["бздун", "бзднуть", "бздюх", "блудилище", "выпердеть", "высраться", "выссаться", "говно", "говенка", "говноед", "говномес", "говночист", "говяга", "говнюк", "говняный", "говна", "пирога", "глиномес", "изговнять", "гнида", "гнидас", "гнидазавр", "гниданидзе", "гондон", "гондольер", "даун", "даунитто", "дерьмо", "дерьмодемон", "дерьмище", "дрисня", "дрист", "дристануть", "обдристаться", "дерьмак", "дристун", "дрочить", "дрочила", "суходрочер", "дебил", "дебилоид", "дрочка", "драчун", "задрот", "дцпшник", "елда", "елдаклык", "елдище", "жопа", "жопошник", "залупа", "залупиться", "залупинец", "засеря", "засранец", "засрать", "защеканец", "изговнять", "идиот", "изосрать", "курва", "кретин", "кретиноид", "курвырь", "лезбуха", "лох", "минетчица", "мокрощелка", "мудак", "мудень", "мудила", "мудозвон", "мудацкая", "мудасраная", "дерьмопроелдина", "мусор", "педрик", "пердеж", "пердение", "пердельник", "пердун", "пидор", "пидорасина", "пидорормитна", "пидорюга", "педерастер", "педобратва", "дружки", "педигрипал", "писька", "писюн", "спидозный", "пес", "ссаная", "псина", "спидораковый", "срать", "спермер", "спермобак", "спермодун", "срака", "сракаборец", "сракалюб", "срун", "сука", "сучара", "сучище", "титьки", "трипер", "хер", "херня", "херовина", "хероед", "охереть", "пошел", "на", "хер", "хитрожопый", "хрен", "моржовый", "шлюха", "шлюшидзе"]

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
            automodText.innerHTML = "<hr><b>Авто-модерация: Ответ может содержать спам</b>"
            currentAnswer.className += " zm-warned-answer"

            createPopup('Авто-модерация: Помеченный ответ может содержать спам')
        }

        if (checkText(answerText)) {
            currentAnswer.className += " zm-warned-answer"
            currentAnswer.innerHTML += "<br><b>Авто-модерация: Ответ содержит маты</b>"

            createPopup('Авто-модерация: Помеченный ответ содержит маты')
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

    createPopup('Ссылка успешно скопирована!')
}

function createButton(parent = document, text, id) {
    var button = document.createElement('button')
    button.setAttribute('id', id)
    button.className = 'zm-button'
    button.innerText = text

    parent.appendChild(button)
}

function createPopup(text) {
    var body = document.body
    var element = document.createElement('div')
    
    element.className = 'zm-popup'
    element.innerHTML = `<span>${text}</span>`

    setTimeout(() => {
        element.style = 'animation: .5s fade-out'
        setTimeout(() => element.remove(), 500)
    }, 5000)

    body.appendChild(element)
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