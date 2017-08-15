function play(){
    var audio = document.getElementById("audio");
    var golddonkey=document.getElementById("golddonkey");
    golddonkey.disabled=true;

    audio.play();
    audio.onended = function() {
        window.location.href = "/filters"
        golddonkey.disabled=false;
    };

}