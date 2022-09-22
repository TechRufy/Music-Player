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
//Volume       
const volumeTrack = document.querySelector(".volume_slider");
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
let track = document.createElement("audio");

//All Event Listeners
play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
volumeTrack.addEventListener("change", volumeControl);
hamburgerMenu.addEventListener('click', openPlaylist);
exitIcon.addEventListener('click', closePlaylist);
autoPlayBtn.addEventListener('click', autoPlayToggle);
shuffleBtn.addEventListener('click', shuffleToggle);

//Load Tracks
function loadTrack (indexTrack) {
    track.src = songPlaylist[indexTrack].path;
    trackImage.src = songPlaylist[indexTrack].imgAlbum;
    title.innerHTML = songPlaylist[indexTrack].name;
    artist.innerHTML = songPlaylist[indexTrack].artist;
    track.load();   //Rivedi
}
loadTrack(indexTrack);

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

//Open & Close Playlist
function openPlaylist() {
    hamburgerMenu.classList.add('remove');
    exitIcon.classList.remove('remove');
    playlistMenu.setAttribute('style', 'opacity: 0.9; transition: .5s; visibility: visible');
}

function closePlaylist() {
    hamburgerMenu.classList.remove('remove');
    exitIcon.classList.add('remove');
    playlistMenu.setAttribute('style', 'opacity: 0; transition: .5s; visibility: hidden');
}

//AutoPlay
function autoPlayToggle() {
    if(autoplay == false){
        autoplay = true;
        autoPlayBtn.style.color = "#4DBA14";            //Rivedi
    }else{
        autoplay = false;
        autoPlayBtn.style.color = "black";
    }
}

//Shuffle
function shuffleToggle() {
    if(shuffle == false){
        shuffle = true;
        shuffleBtn.style.color = "#4DBA14";            //Rivedi
    }else{
        shuffle = false;
        shuffleBtn.style.color = "black";
    }
}



// totalDuration.innerText = `${Math.floor(song.duration / 60)}:${Math.floor(song.duration % 60)}`;