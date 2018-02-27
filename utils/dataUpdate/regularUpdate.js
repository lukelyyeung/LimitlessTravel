function regularUpdate(func, time, interval) {
    let currentTime = new Date().getTime();
    let targetTime = (time === '' || typeof time === 'undefined') ? new Date().getTime() : new Date(time).getTime();

    while (targetTime < currentTime) {
        targetTime += interval;
    }

    let timeDiff = targetTime - currentTime;
    setTimeout(function () {
        return func()
            .then(regularUpdate(func, targetTime, interval));
    }, timeDiff);
}

module.exports = regularUpdate;