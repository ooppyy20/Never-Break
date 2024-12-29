var AudioContext;
var audioContext;

window.onload = function() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
        AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
    }).catch(e => {
        console.error(`Audio permissions denied: ${e}`);
    });
}

$(document).ready(function(){
    var poster_idx = 1;

    // sound

    // var bg_sound = new Audio('resources/DAY6 - 아픈 길 (hurt road).mp3');
    // bg_sound.play();
    // bg_sound.loop = true;

    $(".poster").on("click", function(){
        var str = 'resources/paper-'+Math.floor(Math.random()*8+1)+'.mp3'
        var paper_sound = new Audio(str);
        paper_sound.play();
    });

    // draggable
    $(".draggable" ).draggable({revert: true, scroll: false});

    $("#poster").on("click", function(){
        $("#poster").removeClass("poster_" + poster_idx);
        $("#poster").removeClass("poster_" + poster_idx + "_g");

        poster_idx = poster_idx + 1;
        if(poster_idx > 3) {
            poster_idx = 1;
        }

        $("#poster").addClass("poster_" + poster_idx);
    });

    $("#poster").on("mouseenter", function(){
        $("#poster").removeClass("poster_" + poster_idx);
        $("#poster").addClass("poster_" + poster_idx + "_g");
    });

    $("#poster").on("mouseleave", function(){
        $("#poster").removeClass("poster_" + poster_idx + "_g");
        $("#poster").addClass("poster_" + poster_idx);
    });

    caption_typing();
});

function caption_typing(){
    const caption_kor = "-그 어떤 세계에서도 형을 원망한 적은 있어도, 사랑하길 그만둔 적은 없어요";
    const caption_en = "-Sometimes I resented, but I've never stopped loving you in all that fucking universe";
    const caption_hk = "-有时候，我也会怨恨。但无论喺边个世界，我都从未停止过对你嘅爱。";
    var caption_str = caption_kor;
    var caption_lang = "kor";
    const text = document.querySelector("#caption");
    let i = 0;
    
    async function typing(){
        let txt = caption_str[i++];
        text.innerHTML += txt;

        if (i > caption_str.length) {
            text.innerHTML = "";
            i = 0;

            if(caption_lang == "kor") {
                caption_str = caption_en;
                caption_lang = "en";
            }
            else {
                caption_str = caption_kor;
                caption_lang = "kor";
            }

            sleep(1000);
        }
    }
    setInterval(typing, 200);
}

function sleep(ms) {
    var start = Date.now() + ms;
    while (Date.now() < start) {}
}
