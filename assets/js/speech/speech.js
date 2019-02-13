var recognition;
const synth = window.speechSynthesis;
var lang = 'en-US';

function start() {
  var message = document.getElementById("message");
  try {
    ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
    recognition.start();

    var finalTranscripts = message.textContent;
    recognition.onresult = function (event) {
      var interimTranscripts = "";
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        if (event.results[i].isFinal) {
          finalTranscripts += transcript.replace(/poop|poo|shit|dump/gi, '💩');
          if (transcript.includes('what is the time')) {
            speak(getTime);
          };

          if (transcript.includes('what is today\'s date')) {
            speak(getDate);
          };

          if (transcript.includes('what is the weather in')) {
            getTheWeather(transcript);
          };
        } else {
          interimTranscripts += transcript;
        }
        message.innerHTML = finalTranscripts + '<span style="color: #999;">' + interimTranscripts + '</span>';
      }
    };
    recognition.onerror = function (event) {};
  } catch (e) {
    console.error(e);
    message.innerHTML = "Your browser does not support Web Speech API. Try it on Google Chrome.";
  }
}

function pause() {
  if (isObject(recognition)) {
    var message = document.getElementById("message");
    message.textContent += ". ";
    recognition.stop();
  }
}

function isObject(v) {
  if (v instanceof Object) {
    return true
  }
};

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString(lang, { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const getDate = () => {
  const time = new Date(Date.now())
  return `today is ${time.toLocaleDateString()}`;
};

const getTheWeather = (speech) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      if (weather.cod === '404') {
        utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
        synth.speak(utterThis);
        return;
      }
      utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
      synth.speak(utterThis);
    });
};

const microActivated = () => {
  return `Micro activation. Speak wisely.`;
};
const microStopped = () => {
  return `Micro desactivation.`;
};

/* Copy every 5ms the message from the div to the input
setInterval(function () {
  document.getElementById("message-hidden").value = document.getElementById("message").innerHTML;
}, 5);
*/

$('.bootstrap-switch').on('switchChange.bootstrapSwitch', function (event, state) {
  if (state) {
    lang = 'fr-FR'
  } else {
    lang = 'en-US'
  }
});