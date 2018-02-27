function regularUpdate(func, time, interval) {
    let currentTime = new Date().getTime();
    let targetTime = (time === '' || typeof time === 'undefined') ? new Date().getTime() : new Date(time).getTime();

    if (targetTime < currentTime) {
        console.error('Time is in the past!');
    } else {
        setTimeout(function () {
            return func()
                .then(regularUpdate(func, new Date(targetTime + interval), interval))
        }, targetTime - currentTime);
    }
}

module.exports = regularUpdate;