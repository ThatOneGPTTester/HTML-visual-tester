let player;
let canvas;
let fft;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'LG5Bzw6OlBk', // Replace with a default video ID or make it user-input
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        startVisualizer();
    }
}

function startVisualizer() {
    canvas = createCanvas(640, 360);
    canvas.parent('visualizer-container');
    fft = new p5.FFT();
}

function draw() {
    background(0);
    let spectrum = fft.analyze();
    noStroke();
    fill(0, 255, 0); // Green color for visualizer bars

    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h);
    }
}
