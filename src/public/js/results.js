let splashText = [
    'Sifting through too many Public Restroooms',
    'Tasting literally every Fast Food Joints',
    'Analysing all Nightclubs for good taste',
    'Running AI Queries lol'
]
let curSplashItem = 0;
let splashInterval;
let id;

function run() {
    id = new URLSearchParams(window.location.search).get('id');
    
    addToSplash();
    checkIfReady();
}
let res;
async function checkIfReady() {
    res = await(await fetch('/queryResults?id=' + id)).json();
    if (!res || !res.location)
        setTimeout(()=>{checkIfReady()},1000);
    else {
        window.clearInterval(splashInterval);
        populateData();
        document.getElementsByClassName('splash')[0].style.display = 'none';
        document.getElementsByClassName('results')[0].style.display = 'flex';
        document.getElementById('shareablelink').textContent = window.location.href.replace('http://','');
    }
    // console.dir(res);
}

function addToSplash() {
    splashInterval = window.setInterval(() => {
        let span = document.createElement('span');
        span.textContent = splashText[curSplashItem % splashText.length];
        curSplashItem++;
        document.querySelector('.splash-list-inner').appendChild(span);
    }, 2000);
}

function populateData() {
    document.querySelector('.results-country').textContent = res.location.formattedAddress;
    let evtCont = document.getElementById('places');
    evtCont.innerHTML = '';
    let i = 0;
    for(place of res.places) {
        let evt = document.createElement('div');
        evt.classList.add('event-item');

        let img = document.createElement('img');
        img.src= place.photo ? place.photo : 'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png'; //'https://lh3.googleusercontent.com/p/AF1QipOUe_vAyegzyWo__reI8Ww37dtRypINv3HaMkBO=s1360-w1360-h1020';
        evt.appendChild(img);

        let div = document.createElement('div');

        let span = document.createElement('span');
        span.textContent = place.name.replaceAll('&apos;','');
        div.appendChild(span);

        let a = document.createElement('a');
        let aspan = document.createElement('span');
        aspan.textContent = place.address;
        a.appendChild(aspan);
        div.appendChild(a);


        let span2 = document.createElement('span');
        span2.textContent = 'Match: ' + Math.round(place.match*100) + '%';
        span2.style.fontSize = '2vh';
        div.appendChild(span2);

        evt.appendChild(div);
        evt.style.animationDelay = (i * 100) + 'ms';
        evtCont.appendChild(evt);
        i++;
    }   


    // evtCont = document.getElementById('events');
    // evtCont.innerHTML = '';
    //  i = 0;
    // for(events of res.events) {
    //     let evt = document.createElement('div');
    //     evt.classList.add('event-item');

    //     // let img = document.createElement('img');
    //     // img.src= place.photo ? place.photo : 'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png'; //'https://lh3.googleusercontent.com/p/AF1QipOUe_vAyegzyWo__reI8Ww37dtRypINv3HaMkBO=s1360-w1360-h1020';
    //     // evt.appendChild(img);

    //     let div = document.createElement('div');

    //     let span = document.createElement('span');
    //     span.textContent = events.name.replaceAll('&apos;','');
    //     div.appendChild(span);

    //     let a = document.createElement('a');
    //     let aspan = document.createElement('span');
    //     aspan.textContent = events.lat + events.lon;
    //     a.appendChild(aspan);
    //     div.appendChild(a);


    //     let span2 = document.createElement('span');
    //     span2.textContent = 'Match: ' + Math.round(events.match*100) + '%';
    //     span2.style.fontSize = '2vh';
    //     div.appendChild(span2);

    //     evt.appendChild(div);
    //     evt.style.animationDelay = (i * 100) + 'ms';
    //     evtCont.appendChild(evt);
    //     i++;
    // }   
}