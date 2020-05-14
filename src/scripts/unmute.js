function unMuteContent() {
    let audioDetected = Array.from( document.querySelectorAll('audio') );
    let videoDetected = Array.from( document.querySelectorAll('video') );

    if (audioDetected) {
        audioDetected.forEach(audio => {
            audio.muted = false;
        });
    }
    if (videoDetected) {
        videoDetected.forEach(video => {
            video.muted = false;
        });
    }
}

unMuteContent();