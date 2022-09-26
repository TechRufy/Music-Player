//Buttons
const play = document.querySelector(".play");  
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const autoPlayBtn = document.querySelector(".autoplay");
const shuffleBtn = document.querySelector(".shuffle");
//Song attributes
const trackImage = document.querySelector(".track-image");   
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const href = document.querySelector("#linkArt");
//Volume       
const volumeTrack = document.querySelector(".volume_slider");
const volumeDown = document.querySelector(".volume_down");
const volumeUp = document.querySelector(".volume_up");
//Duration slider
const songSlider = document.querySelector(".seek_slider");
const currentTime = document.querySelector(".current_time");
const totalDuration = document.querySelector(".total_duration");
//Playlist   
const hamburgerMenu = document.querySelector(".hamburger");
const exitIcon = document.querySelector(".exit");
const playlistMenu = document.querySelector(".playlist");

let timer;
let indexTrack = 0;
let songIsPlaying = false;
let autoplay = false;
let shuffle = false;
let first = false;
let trackDisplay = false;
let track = document.createElement("audio");

//All Event Listeners
play.addEventListener('click', justPlay);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
volumeTrack.addEventListener("change", volumeControl);
hamburgerMenu.addEventListener('click', openPlaylist);
exitIcon.addEventListener('click', closePlaylist);
autoPlayBtn.addEventListener('click', autoPlayToggle);
shuffleBtn.addEventListener('click', shuffleToggle);
songSlider.addEventListener('change', changeDuration);
track.addEventListener('timeupdate', songTimeUpdate);
volumeDown.addEventListener('click', muteVolume);
volumeUp.addEventListener('click', maxVolume);

//Load TrackssongPlaylist[indexTrack].name;
function loadTrack (indexTrack) {
    clearInterval(timer);
    resetSlider();
    track.src = songPlaylist[indexTrack].path;
    trackImage.src = songPlaylist[indexTrack].imgAlbum;
    title.innerHTML = songPlaylist[indexTrack].name;
    artist.innerHTML = songPlaylist[indexTrack].artist;
    href.href = href.href.replace("default",songPlaylist[indexTrack].artist)
    track.load();   //Rivedi
    timer = setInterval(updateSlider, 1000);
}

//Just Play
function justPlay() {
    if(songIsPlaying == false){
        playSong();
    } else {
        pauseSong();
    }
}

//Play Songs
function playSong() {
    if(first == false){
        first = true;
        loadTrack(indexTrack);
    }
    track.play();
    songIsPlaying = true;
    play.innerHTML = '<i class="bi bi-pause-circle"></i>';
}

//Pause Songs
function pauseSong() {
    track.pause();
    songIsPlaying = false;
    play.innerHTML = '<i class="bi bi-play-circle"></i>';
}

//Next Song
function nextSong() {
    if(shuffle == true){
        indexTrack = isShuffle();
        loadTrack(indexTrack);
        playSong();
    }else{
        if(indexTrack < songPlaylist.length-1){
            indexTrack++;
            loadTrack(indexTrack);
            playSong();
        }else {
            indexTrack = 0;
            loadTrack(indexTrack);
            playSong();
        }
    }  
}

//Prev Song
function prevSong() {
    if(indexTrack > 0){
        indexTrack--;
        loadTrack(indexTrack);
        playSong();
    }else {
        indexTrack = songPlaylist.length-1;
        loadTrack(indexTrack);
        playSong();
    }
}

//Volume control
function volumeControl() {
    track.volume = (volumeTrack.value) / 100;
}

function muteVolume() {
    track.volume = 0;
    volumeTrack.value = 0;
}

function maxVolume() {
    track.volume = 1;
    volumeTrack.value = 100;
}

//Time Slider
function changeDuration() {
    let sliderPosition = track.duration * (songSlider.value / 100);
    track.currentTime = sliderPosition;
}

function resetSlider() {
    songSlider.value = 0;
}

function updateSlider() {
    if(!isNaN(track.duration)) {
        songSlider.value = track.currentTime * (100 / track.duration);
    }

    if(track.ended) {
        play.innerHTML = '<i class="bi bi-play-circle"></i>';
        if(autoplay == true && indexTrack < songPlaylist.length - 1){
            indexTrack++;
            loadTrack(indexTrack);
            playSong();
        } else if(autoplay == true && indexTrack == songPlaylist.length - 1){
            indexTrack = 0;
            loadTrack(indexTrack);
            playSong();
        }else if(autoplay == true && shuffle == true){
            indexTrack = isShuffle();
            loadTrack(indexTrack);
            playSong();
        }else if(autoplay == false){
            resetSlider();
        }
    }
}

//Open & Close Playlist
function openPlaylist() {
    hamburgerMenu.classList.add('remove');
    exitIcon.classList.remove('remove');
    playlistMenu.setAttribute('style', 'opacity: 0.9; transition: .5s; visibility: visible');

    if(trackDisplay == false){
        trackDisplay = true;
        displayTracks();
    }
}

function closePlaylist() {
    hamburgerMenu.classList.remove('remove');
    exitIcon.classList.add('remove');
    playlistMenu.setAttribute('style', 'opacity: 0; transition: .5s; visibility: hidden');
}

//Create elements of playlist in menu
function displayTracks() {
    for(let i=0; i < songPlaylist.length; i++){
        let div = document.createElement("div");
        div.classList.add("song");
        div.innerHTML = `
            <span>${i+1}.</span>
            <span>${songPlaylist[i].name}</span>
        `;
        playlistMenu.appendChild(div);
        div.addEventListener("click", () => {
            loadTrack(i);
            playSong();
        })
    }
}

//AutoPlay
function autoPlayToggle() {
    if(autoplay == false){
        autoplay = true;
        autoPlayBtn.style.color = "#4DBA14";            
    }else{
        autoplay = false;
        autoPlayBtn.style.color = "black";
    }
}

//Shuffle
function shuffleToggle() {
    if(shuffle == false){
        shuffle = true;
        shuffleBtn.style.color = "#4DBA14";            
    }else{
        shuffle = false;
        shuffleBtn.style.color = "black";
    }
}

//Update song time
function songTimeUpdate() {
    if(track.duration){
        let currmins = Math.floor(track.currentTime / 60);
        let currsecs = Math.floor(track.currentTime - (currmins*60));
        let durmins = Math.floor(track.duration / 60);
        let dursecs = Math.floor(track.duration - (durmins*60));
    
        if(dursecs < 10){
            dursecs = '0' + dursecs;
        }
        if(durmins < 10){
            durmins = '0' + durmins;
        }
        if(currsecs < 10){
            currsecs = '0' + currsecs;
        }
        if(currmins < 10){
            currmins = '0' + currmins;
        }
        currentTime.innerHTML = `${currmins}:${currsecs}`;
        totalDuration.innerHTML = `${durmins}:${dursecs}`;
    }else{
        currentTime.innerHTML = `${00}:${00}`;
        totalDuration.innerHTML = `${00}:${00}`;
    }
}

function isShuffle() {
    return indexTrack = Math.floor(Math.random()*songPlaylist.length);
}
