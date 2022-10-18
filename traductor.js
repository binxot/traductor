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