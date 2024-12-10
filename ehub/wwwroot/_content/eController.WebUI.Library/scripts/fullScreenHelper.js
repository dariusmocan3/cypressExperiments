/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;
var fullscreenServiceDotNetRef = {};

document.addEventListener('fullscreenchange', fullscreenchanged);

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

function initFullscreen(dotNetHelper) {
    fullscreenServiceDotNetRef = dotNetHelper;
}

function fullscreenchanged(event) {
    // document.fullscreenElement will point to the element that
    // is in fullscreen mode if there is one. If there isn't one,
    // the value of the property is null.
    if (document.fullscreenElement) {
        fullscreenServiceDotNetRef.invokeMethodAsync('FullscreenChangedCallback', true);
    } else {
        fullscreenServiceDotNetRef.invokeMethodAsync('FullscreenChangedCallback', false);
    }
}
