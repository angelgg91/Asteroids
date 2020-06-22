class Sound {
    constructor (source, maxStreams = 1, volume = 1.0) {
        this.streamNum = 0;
        this.streams = [];
        this.maxStreams = maxStreams;
        for (var i = 0; i < maxStreams; i++) {
            this.streams.push(new Audio(source));
            this.streams[i].volume = volume;
        }
    }


    run() {
        // This module operation will allow us to play the sound as it comes to the array
        this.streamNum = (this.streamNum + 1) % this.maxStreams;
        this.streams[this.streamNum].play();
    }


    stop() {
        this.streams[this.streamNum].pause();
        this.streams[this.streamNum].currentTine = 0;
    }
}