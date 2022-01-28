class oscSynth {
    constructor(freqs, amps, master) {
        //
        this.voiceLimit = 5;
        //
        console.log('building synth')

        this.numVoices = freqs.length;
        if (this.voiceLimit < this.numVoices) this.numVoices = this.voiceLimit;

        this.oscs = [];
        this.volMaster = master;
        this.playing = false;
        for(let i=0; i < this.numVoices; i++) {
            let tmp = new p5.Oscillator('sine');

            tmp.freq(freqs[i],0.1);
            tmp.amp(amps[i],0.1);

            this.oscs.push(tmp);
        }
    }

    startOscSynth(){
        console.log('oscilando intensifies');
        for(let i=0; i < this.numVoices; i++) {
            this.oscs[i].start();
        }
    }

    stopOscSynth(){
        for(let i=0; i < this.numVoices; i++) {
            this.oscs[i].stop();
        }
    }
}