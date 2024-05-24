// console.log("Welcome to Spotify")

// let songIndex = 0;
// let audioElement = new Audio('1.mp3');
// let masterPlay = document.getElementById('masterPlay');
// let myProgressBar = document.getElementById('myProgressBar');
// let songs = [
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
//     {songName: "Jazz", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
// ]

// audioElement.play();

// masterPlay.addEventListener('click', ()=>{
//     if(audioElement.paused || audioElement.currentTime<=0)
//     audioElement.play();
// masterPlay.classList.remove('fa-circle-play');
// masterPlay.classList.add('fa-circle-pause');
// })

// myProgressBar.addEventListener('timeupdate', ()=>{
// console.log('timeupdate');
// })
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
// Get the icon element
let icon = document.getElementById("masterPlay");

// Get the audio element
let audio = document.getElementById("myAudio");
let songInfo = document.querySelector(".songInfo");
let iconBackward = document.getElementById("backward");
let iconForward = document.getElementById("forward");
let timestamp = document.getElementById("timestamp");

let songs = [
    {title: "One Love - Shubh", src:"songs/1.mp3"},
    {title: "Salam-E-Ishq - Sonu Nigam", src:"songs/2.mp3"},
    {title: "Ve Haniya - Nivedita", src:"songs/3.mp3"},
    {title: "Softly - Karan Aujla", src:"songs/4.mp3"},
    {title: "Sanam - Anuradha Paudwal", src:"songs/5.mp3"},
    {title: "Keejo Kesari K Laal - Bhupinder Singh", src:"songs/6.mp3"},
    {title: "Ve Kamleya - Arijit Singh", src:"songs/7.mp3"},
    {title: "Lover - Taylor Swift", src:"songs/8.mp3"},
    {title: "Chaleya - Arijit Singh", src:"songs/9.mp3"},
    {title: "Nazar K Samane - Anuradha Paudwal", src:"songs/10.mp3"},
];

let currentSongIndex = 0;

// Function to play current song
function playCurrentSong() {
    // Set audio source to current song
    audio.src = songs[currentSongIndex].src;
    // Update song title in songInfo element
    songInfo.innerHTML = `<img src="playing.gif" width="42px" id="gif"> ${songs[currentSongIndex].title}`;
    // Play the audio
    audio.play();
}

// Play the initial song
playCurrentSong();

audio.addEventListener('ended', function() {
    // Increment current song index and play next song
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playCurrentSong();
});

// Add click event listener to the icon
icon.addEventListener("click", function() {
  // Check if the audio is currently paused or at the beginning
  if (audio.paused || audio.currentTime <= 0) {
    // Play the audio
    audio.play();
    // Change icon to pause
    icon.classList.remove('fa-circle-play');
    icon.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  } else {
    // Pause the audio
    audio.pause();
    // Change icon to play
    icon.classList.remove('fa-circle-pause');
    icon.classList.add('fa-circle-play');
    gif.style.opacity = 0;
  }
});

audio.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');

    //Update The Range
    progress = parseInt((audio.currentTime/audio.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
    })

    myProgressBar.addEventListener('click', function(e) {
        // Calculate the percentage of the clicked position relative to the progress bar width
        const clickX = e.offsetX;
        const progressBarWidth = myProgressBar.clientWidth;
        const percentClicked = clickX / progressBarWidth;
        
        // Set the audio's currentTime to the percentage of the total duration
        audio.currentTime = audio.duration * percentClicked;
    });

    iconBackward.addEventListener('click', function() {
        // Decrement current song index
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        // Play the previous song
        playCurrentSong();
    });
    
    // Add click event listener to the forward icon
    iconForward.addEventListener('click', function() {
        // Increment current song index
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        // Play the next song
        playCurrentSong();
    });

    audio.addEventListener("loadedmetadata", function() {
        // Get total duration of the audio in seconds
        var totalSeconds = audio.duration;

        // Convert total duration to minutes and seconds
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = Math.floor(totalSeconds % 60);

        // Format minutes and seconds as string
        var formattedTime = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

        // Update timestamp text
        timestamp1.textContent = formattedTime;
    });