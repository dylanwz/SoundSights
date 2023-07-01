let splashText = [
    'Sifting through 42,372 Public Restroooms',
    'Tasting 122,175,372 Fast Food Joints',
    'Analysing 22,157,223 Nightclubs for good taste'
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
        img.src='https://lh3.googleusercontent.com/p/AF1QipOUe_vAyegzyWo__reI8Ww37dtRypINv3HaMkBO=s1360-w1360-h1020';
        evt.appendChild(img);

        let div = document.createElement('div');

        let span = document.createElement('span');
        span.textContent = place.name;
        div.appendChild(span);

        let a = document.createElement('a');
        let aspan = document.createElement('span');
        aspan.textContent = 'Lat:' + place.lat + ',  Lon:' + place.lon;
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
}