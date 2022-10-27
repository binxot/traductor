var idiomas = ["es","en","fr","de","it","pt","ru","ja","zh"];

function translateText(){
    var text = document.getElementById("entrada").value;
    var idiomaOrigen = document.getElementById("selectIdiomaOrigen").value;
    var idiomaDestino = document.getElementById("selectIdiomaDestino").value;

    if(text != ""){
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ idiomaOrigen + "&tl=" + idiomaDestino + "&dt=t&q=" + text;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resp = xhr.responseText;
                var resp = JSON.parse(resp);
                document.getElementById("salida").textContent = resp[0][0][0];
            }
        }
        xhr.send();
    }else{
        document.getElementById("salida").textContent = "";
    }  
}


document.addEventListener('change', function() {
    translateText();
});

//Microfono
function escuchar(){
    var recognition = new (webkitSpeechRecognition || SpeechRecognition)();
    recognition.lang = "es";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    /* Para ver los eventos en la consola
    ['onaudiostart','onaudioend','onend','onerror','onnomatch','onresult','onsoundstart','onsoundend','onspeechend','onstart']
    .forEach(function(eventName) {
        recognition[eventName] = function(e) {
            console.log(eventName, e);
        };
    });*/

    recognition.onresult = function() {
        document.getElementById("entrada").value = event.results[0][0].transcript;
    };
}

//voces
speechSynthesis.addEventListener("voiceschanged", function() {
    var voices = speechSynthesis.getVoices();
    for(var i = 0; i < voices.length ; i++) {
      document.getElementById("speech-select").innerHTML += '<option value="' + voices[i].name + '">(' + voices[i].lang + ')</option>';
    }
});

//Altavoz
function hablar(){
    var text = document.getElementById("salida").textContent;
    var voice = document.getElementById("speech-select").value;
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == document.getElementById("speech-select").value; })[0];
    speechSynthesis.speak(utterance);
}