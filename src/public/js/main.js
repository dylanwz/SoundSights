function tryItOut() {
    moveToLocationPage();
}

function moveToLocationPage() {
    // Move the main to the side
    document.getElementsByTagName('main')[0].style.left = '-100vw';
    // Then move in the div with id="location-page"
    
    let locationpage = document.getElementById('location-page');
    locationpage.style.transitionDelay = '0.5s';
    locationpage.style.left = '0px';

    
}


function moveToSigninPage() {
    // Move the location to the side
    let locationpage = document.getElementById('location-page');
    locationpage.style.transitionDelay = '0s';
    locationpage.style.left = '-100vw';
   
    let signin = document.getElementById('signin-page');
    signin.style.transitionDelay = '0.5s';
    signin.style.left = '0px';    
}

window.setTimeout(()=> {beginAnimation()}, 2000);

function beginAnimation() {
    let animationContainer = document.getElementById('animation-container');
    animationContainer.innerHTML = '';

    // Span with searching text
    let searchSpan = document.createElement('span');
    searchSpan.classList.add('animation-searching');
    searchSpan.textContent = 'Searching Sydney, Australia ...';
    animationContainer.appendChild(searchSpan);

    let imgs = [
        'https://i.scdn.co/image/ab67616d0000b2734df3245f26298a1579ecc321',
        'https://i.scdn.co/image/ab67616d0000b273d09f96d82310d4d77c14c108',
        'https://i.scdn.co/image/ab67616d0000b273dcef905cb144d4867119850b',
        'https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff',
        'https://i.scdn.co/image/ab67616d0000b273fa747621a53c8e2cc436dee0'
    ]

    // After 1s, begin to load images
    // window.setTimeout(() => { searchSpan.style.opacity = 0; }, 800);
    window.setTimeout(() => {
        animationContainer.style.marginTop = '-15vh';
    }, 3000);

    let albumContainer = document.createElement('div');
    albumContainer.classList.add('album-container');
    for (let i = 0; i < 5; ++i) {
        let image = document.createElement('img');
        image.classList.add('animation-album');
        image.style.animationDelay = (3000 + 200 * i) + 'ms';
        image.src = imgs[i];
        albumContainer.appendChild(image);

    }
    animationContainer.appendChild(albumContainer);

    // After another 3 s, begin inferencing prompt
    // window.setTimeout(() => {
    let findingSpan = document.createElement('span');
    findingSpan.classList.add('animation-finding');
    findingSpan.style.animationDelay = 6000 + 'ms';
    findingSpan.textContent = '🪄 Discovering your ideal location ...';
    animationContainer.appendChild(findingSpan);
    // }, 4000);

    window.setTimeout(() => {
        animationContainer.style.marginTop = '-40vh';
    }, 6000);

    imgs = [
        'https://static.ra.co/images/clubs/lg/au-homenightclub-large.jpg?dateUpdated=1521610616927',
        'https://www.commbank.com.au/content/dam/caas/newsroom/images/newsroom_vivid_Filipe_Castilhos.jpg',
        'https://www.therooftopguide.com/rooftop-bars-in-sydney/Bilder/ivy-pool-club-600-3.jpg',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/04/b1/d0/qudos-bank-arena.jpg?w=1200&h=-1&s=1',
        'https://cdn.tourbytransit.com/sydney/images/Luna-Park-Entrance-at-night.jpg'
    ]

    let labels = ['Home The Venue','Vivid Sydney', 'Ivy Club', 'Light It Up Festival','Lunar Park Sydney'];

    // another 2s later
    let venueContainer = document.createElement('div');
    venueContainer.classList.add('album-container');
    let venueLabels = document.createElement('div');
    venueLabels.classList.add('venue-labels-container');


    for (let i = 0; i < 5; ++i) {
        let div = document.createElement('div');
        div.classList.add('venue-item');
        div.style.animationDelay = (8000 + 200 * i) + 'ms';

        let image = document.createElement('img');
        image.classList.add('animation-album');
        image.style.animationDelay = (8000 + 200 * i) + 'ms';
        image.src = imgs[i];
        div.appendChild(image);

        let span = document.createElement('span');
        span.textContent = labels[i];

        div.appendChild(span);

        venueContainer.appendChild(div);

    }
    animationContainer.appendChild(venueContainer);

    window.setTimeout(() => {
        animationContainer.style.marginTop = '-66vh';
    }, 8000);
}