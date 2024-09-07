document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.container');
    const content = document.querySelector('.content');
    const albumOverlay = document.querySelector('.overlay-album');
    const closeAlbum = document.querySelector('.close-album-overlay');
    const albumcontainer = document.querySelector('.album-container');
    const leftCarousel = document.querySelector('.left-carousel');
    const rightCarousel = document.querySelector('.right-carousel');
    const listAlbums = [...albumcontainer.querySelectorAll('.album')];
    const categoryContainer = document.querySelector('.songs-category');
    const categoryItems = [...categoryContainer.querySelectorAll('li')];
    const songListContainer = document.querySelector('.song-list');
    const songs = document.getElementById('songs');
    const allSongs = [... songs.querySelectorAll('li')];
    const statusDiv = document.querySelector('.dancing-div');
    const videoElement = document.querySelector('#video-element');
    const overlayMessage = document.querySelector('.overlay-message');
    const overlayAudio = document.querySelector('.overlay-audio');
    const songTitle = document.querySelector('.song-title');
    const musicImage = document.querySelector('#music-image');
    const audioBarContainer = document.querySelector('.audio-bar-container');
    const audioBarList = [...audioBarContainer.querySelectorAll('.audio-bar')];
    const songControls = document.querySelector('.song-controls');
    const progressTruck = document.querySelector('.progress-track');
    const progressBar = document.querySelector('.progress-bar');
    const audioCurrentTime = document.querySelector('.current-time');
    const audioDuration = document.querySelector('.song-duration');
    const songButtons = document.querySelector('.song-buttons');
    const buttons = [...songButtons.querySelectorAll('button')];
    const volumeControls = document.querySelector('.volume-controls')
    const volumeInput = document.querySelector('#volume-control');

    let currentSong = null;
    let currentVideo = null;
    let activeElement = null;
    let isPlaying = false;
    let isLooping = false;
    let isMuted = false;
    let isExpanded = false;
    let isSubscribe = false;
    let isAudioMode = false;

    scrollAmount = 300;
    

    
    const allSongCategory = categoryItems[0];
    const albumCategory = categoryItems[1];
    const aboutCategory = categoryItems[2];
    const expandCategory = categoryItems[3];

    const PlayBtn = buttons[0];
    const prevBtn = buttons[1];
    const nextBtn = buttons[2];
    const shuffBtn = buttons[3];
    const MuteBtn = buttons[5];
    const loopBtn = buttons[4];
    const bgImageBtn = buttons[6];
    const audiomodeBtn = buttons[7];

    
    const subscribedAlbums = {}; 

    const images = ["music1.png", "music2.png", "music3.png", "music4.png", "music5.png", "music6.png", "music7.png", "music8.png", "music9.png",
                    "music10.png", "music11.png", "music12.png", "music13.png", "music14.png", "music15.png", "music16.png", "music17.png", "music18.png",
                    "music19.png", "music20.png", "music21.png", "music22.png", "music23.png", "music24.png", "music25.png", "music26.png", "music27.png"];

    const AlbumPhotos = [
        { name: "Bahati", photo : "bahati.jpeg"},
        { name: "Airwave Music", photo: "Airwave.png"},
        { name: "Jay Melody", photo: "jay melody.jpeg"},
        { name: "Otile Brown", photo: "otile brown.jpeg"},
        { name: "Rayvanny", photo: "rayvanny.jpeg"},
        { name: "Others", photo: "music14.png"},
        { name: 'Enya', photo: 'enya.png'},
        { name: 'Jaysoul', photo: 'jay soul.jpeg'},
        {name: 'night nurses', photo: 'night nurses.jpg'}
        
    ] ;              

    const AlbumLinks = [
        { name: "Bahati", url : "https://www.youtube.com/@bahatikenya"},
        { name: "Airwave Music", url: "https://www.youtube.com/@AirwaveMusicTV"},
        { name: "Jay Melody", url: "https://www.youtube.com/@JayMelody"},
        { name: "Otile Brown", url: "https://www.youtube.com/@otilebrownofficial"},
        { name: "Rayvanny", url: "https://www.youtube.com/@Rayvannychui"},
        { name: "Others", url: "https://vladimirgagarin.github.io/Magical-Friend-Facebook"},
        { name: 'Enya', url: 'https://www.youtube.com/channel/UCNIlkuT0DYEc8aFbv3YcvdQ'},
        { name: 'Jaysoul', url: 'https://www.youtube.com/@jaysoul_highpitch'},
        { name: 'night nurses', url: 'https://www.youtube.com/@pagees_jb_official'},
        
    ] ;


    function showActiveCategory(category) {
        category.classList.add('active');
    }

    function hideActiveCategory(category) {
        category.classList.remove('active');
    }

    function  showActiveElement(songElement) {
        songElement.classList.add('active');
        songElement.classList.remove('pause');
    }

    function  hideActiveElement(songElement) {
        songElement.classList.remove('active');
    }

    function showPauseSong(activeElement) {
        activeElement.classList.add('pause');
        activeElement.classList.remove('active');
    }

    function hidePauseSong(activeElement) {
        activeElement.classList.remove('pause');
        
    }

    function  showControlsAndButtons() {
        songControls.style.display = 'flex';
    }
    
    function  hideControlsAndButtons() {
        songControls.style.display = 'none';
    }

    function showAudioOverlay(audiostate) {
        if(audiostate) {
            overlayAudio.style.display = 'flex';
            audioBarContainer.style. display = 'flex';
            audiomodeBtn.innerHTML ='[ <i class="fas fa-video"></i> ]';
            isAudioMode = true;
        }
        else{ 
            overlayAudio.style.display = 'none';
            audioBarContainer.style. display = 'none';
            audiomodeBtn.innerHTML ='[ <i class="fas fa-music"></i> ]';
            isAudioMode = false;
        };
       
        audiomodeBtn.classList.toggle('playing', audiostate);

    }

    //
    
    setTimeout(() => {showAlbumOverlay()}, 2000);

    // Function to show the overlay
    function showOverlay(state) {
        if(state) {
            overlayMessage.style.display = 'flex';
            showAudioOverlay(true);
            audiomodeBtn.disabled = true;
        }
        else{
            overlayMessage.style.display = 'none';
            audiomodeBtn.disabled = false;
        }
        
    }

    function openSmallWindow(url) {
        const windowFeatures = "width=400,height=300,scrollbars=yes"; // Customize the window size and features
        window.open(url, "_blank", windowFeatures);
    }
    
   function createEvent(albumName, albumImage) {

    if (subscribedAlbums[albumName]) {
        showOverlay(false); // Don't show the overlay if already subscribed
        return;
    }

    const newEventDiv = document.createElement('div');
    newEventDiv.classList.add('overlay-event');

    const imageAndNameDivEvent = document.createElement('div');
    imageAndNameDivEvent.classList.add('event-mentions');
    newEventDiv.appendChild(imageAndNameDivEvent);

    const ImageDiv = document.createElement('div');
    ImageDiv.classList.add('event-image');
    ImageDiv.innerHTML = `<img src='${albumImage}' alt='${albumName}'>`; // Corrected syntax
    imageAndNameDivEvent.appendChild(ImageDiv);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('event-title');
    nameDiv.textContent = albumName;
    imageAndNameDivEvent.appendChild(nameDiv);

    const eventBtns = document.createElement('div');
    eventBtns.classList.add('event-buttons');
    newEventDiv.appendChild(eventBtns);

    

    const subscribeBtn = document.createElement('button');
    subscribeBtn.textContent = 'Subscribe';
    eventBtns.appendChild(subscribeBtn);

    // Subscribe button logic
    subscribeBtn.addEventListener('click', () => {
        displaysubWindow(albumName);
        showOverlay(false);

        // Set the album as subscribed to avoid showing the overlay again
        subscribedAlbums[albumName] = true;
    });

    const overlayMessage = document.querySelector('.overlay-message');
    overlayMessage.innerHTML = ''; // Clear any existing events
    overlayMessage.appendChild(newEventDiv);

    showOverlay(true);
}

// Function to find album details by album name
function getAlbumDetails(albumName) {
    return AlbumPhotos.find(album => album.name === albumName) || { photo: 'music4.png', name: 'This Song' };
}

function checkActiveElement() {
   
    if (activeElement) {
         
        // Get album details based on the active song's data-album attribute
        const albumName = activeElement.dataset.album;
        const albumDetails = getAlbumDetails(albumName);

        // Create event overlay with album details
        createEvent(albumDetails.name, albumDetails.photo);
    }
}


    function showAlbumOverlay() {
      
        if(currentSong && currentVideo && !currentSong.paused && !currentVideo.paused) {
            currentSong.pause();
            currentVideo.pause();
        }

        if(isExpanded) {
            showSongContainer();
            isExpanded =true;
        }

        albumOverlay .style.display = 'flex';

        categoryItems.forEach(cat => {
            hideActiveCategory(cat);
        });
        displayAlbums();
        showActiveCategory(allSongCategory);
        hideControlsAndButtons();
        hideActiveElement(activeElement);
        displayRandomImage();
        

        activeElement = null;
        currentSong = null;
        currentVideo = null;
    }

    function hideAlbumOverlay() {
        albumOverlay .style.display = 'none';
    }

    function displaysubWindow(albumName) {
        // Find the album link based on the provided album name
        const albumDetails = AlbumLinks.find(album => album.name === albumName);
    
        // Check if the album details were found
        if (albumDetails) {
            const url = albumDetails.url;
            openSmallWindow(url); // Open the small window with the album's URL
        } else {
            console.log("Album not found!");
        }
    }

    // Function to update the play button
    function updatePlayButton(isPlayingState) {
        if (isPlayingState) {
            PlayBtn.innerHTML = '[ <i class="fas fa-pause active"></i> ]';  // Show pause icon
            PlayBtn.classList.add('playing');
            
        } else {
            PlayBtn.innerHTML = '[ <i class="fas fa-play"></i> ]';  // Show play icon
            PlayBtn.classList.remove('playing');
            
        }
    }

    function updateMuteButton(isMuteState) {
        if (isMuteState) {
            MuteBtn.innerHTML = '[ <i class="fas fa-volume-mute active"></i> ]';  // Show pause icon
            MuteBtn.classList.add('playing');
            
        } else {
            MuteBtn.innerHTML = '[ <i class="fas fa-volume-up"></i> ]';  // Show play icon
            MuteBtn.classList.remove('playing');
            
        }
    }

    function updateLoopButton(LoopingState) {
        if(LoopingState) {
            loopBtn.innerHTML = '[ <i class="fas fa-sync-alt active"></i> ]';
            loopBtn.classList.add('playing');
        }
        else{
            loopBtn.innerHTML = '[ <i class="fas fa-sync-alt"></i> ]';
            loopBtn.classList.remove('playing');
        }
    }

    // Function to handle scrolling
    function scrollCarousel(direction) {
        const currentScroll = albumcontainer.scrollLeft;
        const maxScroll = albumcontainer.scrollWidth - albumcontainer.clientWidth;

        if (direction === 'left') {
            albumcontainer.scrollTo({
                left: Math.max(0, currentScroll - scrollAmount),
                behavior: 'smooth'
            });
        } else if (direction === 'right') {
            albumcontainer.scrollTo({
                left: Math.min(maxScroll, currentScroll + scrollAmount),
                behavior: 'smooth'
            });
        }
    }


    function hideSongContainer() {

        isExpanded = !isExpanded;
        songListContainer.style.display = isExpanded ? "none" : "flex";
        statusDiv.style.display = isExpanded ? "flex" : "none" ;
        expandCategory.classList.toggle('active', isExpanded);
        allSongCategory.classList.toggle('active', !isExpanded);
        statusDiv.classList.toggle('exit', isExpanded);
        expandCategory.innerHTML = isExpanded ? '<i class="fas fa-angle-down"></i>' : '<i class="fas fa-angle-up"></i>';


    }

    function showSongContainer () {

        statusDiv.style.display = isExpanded ? "none" : "flex" ;
        songListContainer.style.display = isExpanded ? "flex" : "none";
        expandCategory.classList.toggle('active', !isExpanded);
        allSongCategory.classList.toggle('active', isExpanded);
        statusDiv.classList.toggle('exit', !isExpanded);
        expandCategory.innerHTML = isExpanded ? '<i class="fas fa-angle-up"></i>' : '<i class="fas fa-angle-down"></i>';
    
        isExpanded = !isExpanded;
    }

    function showStatusDivMessage(message) {
        document.querySelector('#message').textContent =  `${message}`;
    }

    function displayRandomImage() {
        const  randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images[randomIndex];
        
        musicImage.src = selectedImage;
        container.style.backgroundImage = `url(${selectedImage|| images[13] +1})`;
        
        document.querySelector('.song-image').classList.add('intro');
    }

    function changebgColor(elementItem, colorItem) {
        const randomIndex = Math.floor(Math.random() * 0xffffff);
        const hexcolor = `#${randomIndex.toString(16).padStart(6, "0")}`;
    
        // Change text color of colorItem
        if (colorItem) {
            colorItem.style.color = hexcolor;
        }
    
        // Change background color of elementItem
        elementItem.style.backgroundColor = hexcolor;
    }
    

    function showCurrentTimeAndDuration(audio) {
        audioCurrentTime.innerHTML = `<span>${formatTime(audio.currentTime)}</span>`;
        
        audioDuration.innerHTML = `<span> ${formatTime(audio.duration)}</span>`;
        
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function formatTime(audio) {
        const minutes = Math.floor(audio / 60);
        const seconds = Math.floor(audio % 60);

        const formatedMin = minutes < 10 ? `0${minutes}` : minutes;
        const formatedSec = seconds < 10 ? `0${seconds}` : seconds;

        return `${formatedMin} : ${formatedSec}`;
    }

    function getAlbums() {
        // Group songs by album
        const groupedAlbums = allSongs.reduce((acc, item) => {
            const album = item.getAttribute('data-album');
    
            if (!acc[album]) {
                acc[album] = [];
            }
            acc[album].push(item);
            return acc;
        }, {});
    
        return groupedAlbums;
    }
    
    function displayAlbums() {
        const groupedAlbums = getAlbums(); // Get grouped albums
    
        // Iterate over each album group
        for (const [albumName, items] of Object.entries(groupedAlbums)) {
            // Find the photo for the album
            const albumPhoto = AlbumPhotos.find(photo => photo.name === albumName)?.photo || 'default.jpg'; // Use a default photo if not found
            
            // Create and display album element
            createAlbumElement(albumPhoto, albumName);
            
        }
    }
    
    // Function to handle album selection
    function selectAlbum(albumName) {
        // Find the photo for the selected album
        const albumPhoto = AlbumPhotos.find(photo => photo.name === albumName)?.photo || 'default.jpg';
        
        // Update the album logo with the selected album's photo
        document.querySelector('#album-logo').src = albumPhoto;
    }

    function createAlbumElement(newImage, newName) {
    
        const newAlbum = document.createElement('div');
        newAlbum.classList.add('album');
    
        const albumImage = document.createElement('div');
        albumImage.classList.add('image-album');
        albumImage.innerHTML = `<img src="${newImage}" alt="album-image">`;
        newAlbum.appendChild(albumImage);
    
        const albumName = document.createElement('div');
        albumName.classList.add('name-album');
        albumName.innerHTML = `<h2>${newName}</h2>`;
        newAlbum.appendChild(albumName);
    
        const actionAlbumBtn = document.createElement('div');
        actionAlbumBtn.classList.add('buttons-album');
        actionAlbumBtn.innerHTML = '<h2><i class="fas fa-play"></i> Play</h2>';
        newAlbum.appendChild(actionAlbumBtn);
    
        actionAlbumBtn.onclick = () => {hideAlbumOverlay(); filterSongsByAlbum(newName);  selectAlbum(newName)};
        // Append to container
        albumcontainer.appendChild(newAlbum);
    
        // Return the created album element
        return newAlbum;
    }
    
    // Function to filter songs based on a selected album
    function filterSongsByAlbum(albumName) {
        allSongs.forEach(song => {
            if (song.getAttribute('data-album') === albumName) {
                song.style.display = ''; // Show song if it belongs to the selected album
            } else {
                song.style.display = 'none'; // Hide song if it doesn't belong
            }
        });

        // Update allSongs to reflect only the filtered songs
        //allSongs = allSongs.filter(song => song.getAttribute('data-album') === albumName);
    }

    showActiveCategory(allSongCategory);

    function displayAllsong() {
        allSongs.forEach(song => {
            song.style.display = 'block';
        });


        categoryItems.forEach(category => {
            hideActiveCategory(category);
        });
        
        showActiveCategory(allSongCategory);
    }

    categoryItems.forEach(c => {
        c.addEventListener('click', () => {
            categoryItems.forEach(category => {
                hideActiveCategory(category);
            });

            showActiveCategory(c);
        });
    });

    expandCategory.addEventListener('click', () => {
        hideSongContainer();
    });

    allSongCategory.addEventListener('click', () => {
        showSongContainer();
    });

    albumCategory.addEventListener('click', () => {
        showAlbumOverlay();
        
    });

    aboutCategory.addEventListener('click',() => {
        displayAllsong();
        hideSongContainer();

    })
    // Event listeners for carousel buttons
    leftCarousel.addEventListener('click', () => scrollCarousel('left'));
    rightCarousel.addEventListener('click', () => scrollCarousel('right'));

    
    allSongs.forEach(song => {
        const songurl = song.getAttribute('data-song');
        const songAudio = new Audio(songurl);
        const videourl = song.getAttribute('data-video');
       
        song.addEventListener('click', () => {
            
            allSongs.forEach(s => {
                hideActiveElement(s);
                hidePauseSong(s);
            });

            showActiveElement(song);
            activeElement = song;

           

            if (videourl) {
                videoElement.src = videourl;
                videoElement.muted = true; // Mute the video
                videoElement.controls = false; // Hide the controls
                videoElement.style.display = 'block'; // Ensure video is displayed
               
            } else {
                videoElement.style.display = 'none'; // Hide video if no data-video
                statusDiv.style.display = 'none';
                isExpanded = true;
            }

            playsong(songAudio, videoElement,song); 
            hideSongContainer(); 
            displayRandomImage();
            
            videoElement.addEventListener('error', () => { showSongContainer (); showStatusDivMessage("No Audio Available");hideControlsAndButtons()});
            songAudio.addEventListener('stalled', () => { showStatusDivMessage("Check your connection and reload the page"); songTitle.innerHTML = '<h2>Connection is lost</h2>'});
            videoElement.addEventListener('stalled', () => { showStatusDivMessage("Check your connection and reload the page"); songTitle.innerHTML = '<h2>Connection is lost</h2>';});
            videoElement.addEventListener('playing', () => { 
                showControlsAndButtons();
                audioBarList.forEach(bar => {
                    changebgColor(bar, null);
                });

            });
        
            songAudio.addEventListener('timeupdate', () => {
                if (videoElement && !videoElement.paused) {
                    videoElement.currentTime = songAudio.currentTime;
                }
                showCurrentTimeAndDuration(songAudio);
                
            });

            songAudio.addEventListener('ended', () => {showSongContainer();  videoElement.pause();});
            videoElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });

            
            videoElement.addEventListener('loadedmetadata', () => {songTitle.innerHTML = `<h2>${activeElement.textContent}</h2>`;})
        });

        
    });

   

    document.addEventListener('keydown', (e) => {
        if (e.code === "KeyK") {
            changebgColor(progressBar, null);
            
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "KeyL") {
            changebgColor(null,audioCurrentTime);
            
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "KeyV") {
            changebgColor(volumeInput, null);
            
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "KeyR") {
            changebgColor(null,audioDuration);
            
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Space") {
            // Check if both the song and video are playing, and pause both if they are
            if (currentSong && !currentSong.paused && currentVideo && !currentVideo.paused) {
                currentSong.pause();
                currentVideo.pause();
               updatePlayButton(false)
                
            }
            // If either the song or video is paused, play both
            else {
                if (currentSong && currentSong.paused) {
                    currentSong.play();
                }
                if (currentVideo && currentVideo.paused) {
                    currentVideo.play();
                }
                
                updatePlayButton(true)
                
            }
        }
    });
    
    
    function playsong(audio, video,song) {

        
        // Pause current video if it's not the same as the new one
        if (currentVideo && currentVideo !== video) {
            currentVideo.pause();
        } 
        
        // Pause current song if it's not the same as the new one
        if (currentSong && currentSong !== audio) {
            currentSong.pause();
            
        }
    
        
    
        // Pause song if it's currently playing
        if (currentSong && !currentSong.paused && currentVideo && !currentVideo.paused) {
            currentSong.pause();
            currentVideo.pause();
            updatePlayButton(false);  // Update to paused state
            showSongContainer();
            showStatusDivMessage(`[ ${song.textContent} ]... paused`);
            showPauseSong(song);
            
            
        } 
        else {
            // Set current song and video
            currentSong = audio;
            currentVideo = video;
    
            // Synchronize the video with the audio
            currentVideo.currentTime = currentSong.currentTime;
    
            // Play both the song and the video
            currentSong.play();
            currentVideo.play();
        
            updatePlayButton(true);  // Update to playing state

            
            activeElement = song;
            showActiveElement(song);
            
           
        }
        setupTimeUpdateListener(video, song);
        showCurrentTimeAndDuration(audio);

        isMuted =false;
        updateMuteButton(false);
        
        currentSong.addEventListener('ended', () => {
            allSongs.forEach(song => {
                hideActiveElement(song);
                hidePauseSong(song);
            });

            showPauseSong(song);
        });

        

        currentSong.addEventListener('timeupdate', () => {
            showCurrentTimeAndDuration(audio);
        })

        checkActiveElement();
    }

    function playPrevSong() {
        // Recalculate the filtered songs before playing the previous one
        const filteredSongs = allSongs.filter(song => song.style.display !== 'none');  // Ensure only visible songs are used
        
        const prevSongIndex = filteredSongs.indexOf(activeElement) - 1; // Get the index of the previous song in the filtered list
    
        // Reset the active class for all songs
        filteredSongs.forEach(song => {
            song.classList.remove('active');
        });
        
        if (prevSongIndex < 0) {  // We're at the first song, no previous song to go back to
            prevBtn.disabled = true;  // Disable the previous button
            return;  // Exit the function, no previous song to play
        } else {
            prevBtn.disabled = false;  // Enable the button if there's a previous song
        }
        
        // Check if there's a previous song
        if (prevSongIndex >= 0) {
            const prevSong = filteredSongs[prevSongIndex];  // Get the previous song from the filtered list
            
            // Get the song and video URLs
            const songurl = prevSong.getAttribute('data-song');
            const videourl = prevSong.getAttribute('data-video');
    
            // Pause the current song and video if playing
            if (currentSong) {
                currentSong.pause();
            }
            if (currentVideo) {
                currentVideo.pause();
            }
    
            // Reuse or create a new Audio/Video element
            const songAudio = currentSong || new Audio(songurl);
            const videoElement = currentVideo || document.createElement('video');
    
            // Set the video and song sources
            videoElement.src = videourl;
            songAudio.src = songurl;
    
            // Set current song and video references
            currentSong = songAudio;
            currentVideo = videoElement;
    
            // Play the previous song and video
            playsong(songAudio, videoElement, prevSong);
    
            // Set the new active element to the previous song
            activeElement = prevSong;
    
            // Update the song time and duration display
            showCurrentTimeAndDuration(songAudio);
            displayRandomImage();  // Optional UI update
        }
    }
    

    function playNextSong() {
        // Recalculate the filtered songs before playing the next one
        const filteredSongs = allSongs.filter(song => song.style.display !== 'none');  // Filter only visible songs in the UI
        
        const nextSongIndex = filteredSongs.indexOf(activeElement) + 1;  // Get the index of the next song in the filtered list
    
        // Check if there's a next song available
        if (nextSongIndex < filteredSongs.length) {
            const nextSong = filteredSongs[nextSongIndex];  // Get the next song in the filtered list
    
            // Get the song and video URLs
            const songurl = nextSong.getAttribute('data-song');
            const videourl = nextSong.getAttribute('data-video');
    
            // Pause the current song and video if playing
            if (currentSong) {
                currentSong.pause();
            }
            if (currentVideo) {
                currentVideo.pause();
            }
    
            // Reset the active class for all songs
            filteredSongs.forEach(song => song.classList.remove('active'));
    
            // Use the existing audio/video elements, avoid creating new ones
            const songAudio = currentSong || new Audio(songurl);  // Reuse or create a new Audio element
            const videoElement = currentVideo || document.createElement('video');  // Assuming videoElement exists elsewhere
    
            // Set the video source and synchronize
            videoElement.src = videourl;
            songAudio.src = songurl;
    
            // Set current song and video
            currentSong = songAudio;
            currentVideo = videoElement;
    
            // Play the next song and video
            playsong(songAudio, videoElement, nextSong);
    
            // Set the new active element to the next song
            activeElement = nextSong;
    
            // Update the song time and duration display
            showCurrentTimeAndDuration(songAudio);
            displayRandomImage();  // Optional UI update
        }
    }
    
    
    function playrandomSongs() {
        const filteredSongs = allSongs.filter(song => song.style.display !== 'none');
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        const pickedSong = filteredSongs[randomIndex];
        
        allSongs.forEach(song => {
            hideActiveElement(song);
        });
        
        const selectedAudio = pickedSong.getAttribute('data-song');
        const selectedVideo = pickedSong.getAttribute('data-video');
    
        // Pause the current song and video if playing
        if (currentSong) {
            currentSong.pause();
        }
        if (currentVideo) {
            currentVideo.pause();
        }
    
        // Create a new Audio object for the random song
        const randomSong = new Audio(selectedAudio);
    
        // Set the video source
        videoElement.src = selectedVideo;
    
        // Update the current song and video
        currentSong = randomSong;
        currentVideo = videoElement;
    
        // Play the song and video
        playsong(randomSong, videoElement, pickedSong);

        showCurrentTimeAndDuration(randomSong);
        displayRandomImage();

        
    }
    

    
    // Add timeupdate listener once when initializing the audio
    function setupTimeUpdateListener(audio, song) {
        audio.addEventListener('timeupdate', () => {
            const updatedTime = formatTime(audio.currentTime);
            const duration = formatTime(audio.duration);
            const device = detectDevice();
            showStatusDivMessage(`Playing 9${song.textContent} ] ${updatedTime} / ${duration} on ${device}`);
        });
    }

    progressTruck.addEventListener('click', (e) => {
        const width = progressTruck.clientWidth;
        const click = e.offsetX;

        const duration = currentSong.duration;

        currentSong.currentTime = (click / width) * duration;
    });

    PlayBtn.addEventListener('click', () => {
        playsong(currentSong, currentVideo);

        isPlaying =!isPlaying;
        PlayBtn.innerHTML  = isPlaying ? '[ <i class="fas fa-play"></i> ]' : '[ <i class="fas fa-pause"></i> ]'
    });

    MuteBtn.addEventListener('click', () => {
        isMuted = !isMuted;

        if (currentSong) {
            currentSong.muted = isMuted;
            updateMuteButton(isMuted);
        }
    });

    loopBtn.addEventListener('click', () => {
        isLooping = !isLooping;

        if(currentSong && currentVideo) {
            currentSong.loop = isLooping;
            currentVideo.loop = isLooping;
            updateLoopButton(isLooping);
        }
    });

    prevBtn.addEventListener('click' , () =>{
        playPrevSong();
        displayRandomImage();
    });

    nextBtn.addEventListener('click', () => {
         playNextSong();
         displayRandomImage();
    });

    shuffBtn.addEventListener('click', () => {
        playrandomSongs();
        
    })
    
    bgImageBtn.addEventListener('click', () => {
        displayRandomImage();
    });

    closeAlbum.addEventListener('click', () => {hideAlbumOverlay();})
    
    audiomodeBtn.addEventListener('click', () => {
        isAudioMode = !isAudioMode;
        showAudioOverlay(isAudioMode);

        audiomodeBtn.innerHTML = isAudioMode ? '[ <i class="fas fa-video"></i> ]' : '[ <i class="fas fa-music"></i> ]';

        audiomodeBtn.classList.toggle('playing', isAudioMode);

    });
    function detectDevice() {
        const userAgent = navigator.userAgent;

        if (/windows/i.test(userAgent)) {
            return "Windows";
        } else if (/android|iphone|ipad|ipod|blackberry|windows phone|webos/i.test(userAgent)) {
            return "Mobile";
        } else {
            return "Other";
        }
    }

    
    const deviceType = detectDevice();
    const themeStylesheet = document.getElementById('theme-stylesheet');
    
    // Switch to a mobile stylesheet if a mobile device is detected
    if (deviceType === "Mobile") {
        themeStylesheet.href = "mobile.css"; // Use a mobile-specific CSS file
    }

});
//--------------------------------------------------------------------------------------------------------------------------------------------------