/*--------------- SHOW MENU ---------------*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*--------------- REMOVE MENU MOBILE ---------------*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*--------------- CHANGE BACKGROUND HEADER ---------------*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*--------------- SWIPER DISCOVER ---------------*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

/*--------------- VIDEO ---------------*/
const videoFile = document.getElementById('video-file'),
      videoButton = document.getElementById('video-button'),
      videoIcon = document.getElementById('video-icon')

function playPause(){ 
    if (videoFile.paused){
        // Play video
        videoFile.play()
        // We change the icon
        videoIcon.classList.add('fa-pause')
        videoIcon.classList.remove('fa-play')
    }
    else {
        // Pause video
        videoFile.pause(); 
        // We change the icon
        videoIcon.classList.remove('fa-pause')
        videoIcon.classList.add('fa-play')

    }
}
videoButton.addEventListener('click', playPause)

function finalVideo(){
    // Video ends, icon change
    videoIcon.classList.remove('fa-pause')
    videoIcon.classList.add('fa-play')
}
// ended, when the video ends
videoFile.addEventListener('ended', finalVideo)


/*--------------- MUSIC ---------------*/
let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//Create an Audio Element
let track = document.createElement('audio');


//All Songs List
let All_song = [
    {
        name: "track 1",
        path: "music/Track 1.mp3",
        img: "images/music tat.jpg",
        singer: "untitled"
    },
    {
        name: "track 2",
        path: "music/Track 2.mp3",
        img: "images/music tat 2.jpg",
        singer: "untitled"
    },
    {
        name: "track 3",
        path: "music/Track 3.mp3",
        img: "images/favicon.png",
        singer: "untitled"
    },
    {
        name: "track 4",
        path: "music/Track 4.mp3",
        img: "images/music tat 4.jpg",
        singer: "untitled"
    },
    {
        name: "track 5",
        path: "music/Track 5.mp3",
        img: "images/music tat 5.jpg",
        singer: "untitled"
    },
    {
        name: "Fallen",
        path: "music/Track 6.mp3",
        img: "images/music tat 6.jpg",
        singer: "untitled"
    }
];

// All functions

//function load the track
function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    timer = setInterval(range_slider , 1000);
}
load_track(index_no);

//Mute Sound
function mute_sound(){
    track_volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

//Reset Song Slider
function reset_slider(){
    slider.value = 0;
}

//checking if the song is play or not
function justplay(){
    if(playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}

//play song
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class="fa fa-pause"></i>';
}

//pause song
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class="fa fa-play"></i>';
}

//next song
function next_song(){
    if (index_no < All_song.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

//previous song
function previous_song(){
    if (index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

//change volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//Change Slider Position
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

//Autoplay Function
function autoplay_switch(){
    if (autoplay==1){
        autoplay=0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#222b2e";
    }
}

function range_slider(){
    let position = 0;

    //Update Slider Position
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

//Function Will Run When The Song is Over
if (track.ended){
    play.innerHTML = '<i class="fa fa-play"></i>';
    if (autoplay==1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }
}

}


/*--------------- SHOW SCOLL UP ---------------*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*--------------- SCROLL SECTION ACTIVE LINK ---------------*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*--------------- SCROLL REVEAL ANIMATION ---------------*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .style__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form,.music__player`,{
    origin: 'right',
    interval: 100,
})

/*--------------- DARK LIGHT THEME ---------------*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*--------------- EMAIL JS ---------------*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message'),
      contactUser = document.getElementById('contact-user')

const sendEmail = (e) =>{
    e.preventDefault()

    // Check if the field has a value
    if(contactUser.value === ''){
        // Add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')

        // Show message
        contactMessage.textContent = 'You must enter your email ☝'

        //Remove message three after seconds
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 3000)
    } else{
        // serviceID - templateID - #form - publickey
        emailjs.sendForm('service_82gw60t','template_vbi6yio','#contact-form','sowdaz_mTCoqD4d9I')
            .then(() =>{
                // Show message and add color
                contactMessage.classList.add('color-green')
                contactMessage.textContent = 'You registered seccessfully 🥳'

                // Remove message after three seconds
                setTimeout(() =>{
                    contactMessage.textContent = ''
                }, 3000)
            }, (error) =>{
                // Mail sending error
                alert('OOPS! SOMETHING WENT WRONG... 🥺', error)
            })
        
        // To clear the input field
        contactUser.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail)

