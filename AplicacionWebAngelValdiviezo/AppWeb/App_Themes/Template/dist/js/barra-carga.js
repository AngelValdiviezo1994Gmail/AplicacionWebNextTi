var x = 0;
window.onload = progress();

function progress() {
    var timer;

    if (x < 100) {
        x = x + 1.35;
        document.getElementById('barra').style.width = x + '%';
        timer = setTimeout('progress()', 15);
    } else {
        x = 0;
        document.getElementById('barra').style.display = 'none';
    }
}