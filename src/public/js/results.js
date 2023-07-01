let splashText = [
    'Sifting through 42,372 Public Restroooms',
    'Tasting 122,175,372 Fast Food Joints',
    'Analysing 22,157,223 Nightclubs for good taste'
]
let curSplashItem = 0;
let splashInterval;

function addToSplash() {
    splashInterval = window.setInterval(() => {
        let span = document.createElement('span');
        span.textContent = splashText[curSplashItem % splashText.length];
        curSplashItem++;
        document.querySelector('.splash-list-inner').appendChild(span);
    }, 2000);
}