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

}