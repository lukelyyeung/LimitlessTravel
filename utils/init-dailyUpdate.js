const regularUpdate = require('./dataUpdate/regularUpdate');

module.exports = (dailyUpdateService, time, interval) => {

    async function asyncUpdate() {
     try {
         await dailyUpdateService.getExistPackages();
         console.log(dailyUpdateService.packageArray);
         await dailyUpdateService.start();
     } catch (error) {
         console.log(error);
     }
    };

    // async function asyncUpdate() {
    //     return console.log(new Date().toLocaleTimeString());
    // }

    regularUpdate(asyncUpdate, time, interval);

}    
