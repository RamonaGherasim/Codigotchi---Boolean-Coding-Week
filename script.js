const screen = document.getElementById('screen')
const micBtn = document.getElementById('microphone')
const panelsData = document.getElementById("panels-data")
const transcript = document.getElementById("transcript")

/* Using Pascal Case as this is a piece of functionality => Class that hold a number of functionalities */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()

const commands = ["dance", "eat", "sleep"]

function onStartListening() {
    recognition.start()

    panelsData.classList.add('talking')

}

function onResult(event) {
    panelsData.classList.remove('talking');

    const text = event.results[0][0].transcript;

    console.log(text)

    transcript.innerText = `You said: ${text}`

    // Look at the comands accepted
    const action = commands.find(function (command) {
        // does COMMAND match TEXT
        return text.toLowerCase().includes(command)
    })

    // Look at the text generated from the speech recognition
    // Check if that text matches an allowable command
    if (action) {
        // If it does, do some CSS
        screen.classList.add(`codigotchi-screen_${action}`)
    } else {
        // If not, let me know
        transcript.textContent += " - Invalid command!"
    }

    // This function is used to run a piece of code after a set amount of time
    // It uses milliseconds as the second param so 2 sec would be 2000
    setTimeout(function () {
        screen.classList.remove(`codigotchi-screen_${action}`)
        transcript.innerText = ''
    }, 3000)
}

micBtn.addEventListener('click', onStartListening)
recognition.addEventListener('result', onResult)