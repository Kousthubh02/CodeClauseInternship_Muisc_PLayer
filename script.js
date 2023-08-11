// script.js

console.log("Welcome to Beatbox");

let audioElement = new Audio('./song/Enna-Sona.mp3');

let masterSongName = document.getElementById('masterSongName');

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');

let songs = [
    { songName: "Enna Sona", filePath: "./song/Enna-Sona.mp3", coverPath: "./images/cover1.jpg" },
    { songName: "Ek baar hi kiya", filePath: "./song/Ek Baar Hi Kiya Toh Yaaron Pyaar Kya Kiya.mp3", coverPath: "./images/ek-baar.jpg" },
    { songName: "Humdard", filePath: "./song/Humdard.mp3", coverPath: "./images/Humdard.jpg" },
    { songName: "Kesaria", filePath: "./song/Kesaria.mp3", coverPath: "./images/kesaria.jpg" },
    { songName: "Phir Aur Kya Chahiye", filePath: "./song/Phir Aur Kya Chahiye.mp3", coverPath: "./images/aur-kya.jpg" },
];
let songItems = Array.from(document.getElementsByClassName('songItem'));

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Update the song items with cover images and song names
const loopLimit = Math.min(songItems.length, songs.length);
for (let i = 0; i < loopLimit; i++) {
    songItems[i].getElementsByTagName('img')[0].src = songs[i].coverPath;
    songItems[i].getElementsByClassName('span')[0].innerText = songs[i].songName;
}

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((e, i) => {
        if (i === songIndex) {
            e.classList.remove('fa-play-circle');
            e.classList.add('fa-pause-circle');
        } else {
            e.classList.remove('fa-pause-circle');
            e.classList.add('fa-play-circle');
        }
    });
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((e, i) => {
    e.addEventListener('click', (event) => {
        makeAllPlay();
        songIndex = i;
        masterSongName.innerText = songs[songIndex].songName;
        event.target.classList.remove('fa-play-circle');
        event.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});


document.getElementById('previous').addEventListener('click', () => {
    makeAllPlay();
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText=songs[songIndex].songName;

});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText=songs[songIndex].songName;
    makeAllPlay();
});


