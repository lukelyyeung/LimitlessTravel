// Provide table name in postgresql
const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('./tableName');

class DailyUpdateService {
    constructor(knex, saveService, getPackageService) {
        this.knex = knex;
        this.saveService = saveService;
        this.getPackageService = getPackageService;
        this.packageArray = [];
    }

    async start() {
        try {
            console.log(`starting....`);
            console.log(`starting.... ${this.packageArray.length}`);
            if (this.packageArray.length > 0) {
                // trim the pacakge from the existing packages for updating
                let currentPackage = this.packageArray.shift();

                // recursive calling to finish the existing packageArray;
                let packageUpdate = await this.callOnAPI(currentPackage);
                await this.updatePackage(currentPackage.package_id, packageUpdate);
                await this.start();
            }
        } catch (error) {
            console.error(error);
            return -1;
        }
    }

    async getExistPackages() {
        try {
            console.log('Getting existing Packages');
            // Get all packages with day_from further than today
            let currentDate = new Date().toLocaleDateString;
            // Save the package in this.packageArray

            this.packageArray = await this.knex(packages).select('*');
            // .where('day_from', '>', currentDate);
        } catch (error) {
            console.error(error);
        }
    }

    async callOnAPI(packageInfo) {
        try {
            // Tidy up pacakgeInfo here.
            console.log('Calling API');
            let criteria = {
                to: packageInfo.city_to,
                dDate: packageInfo.day_from,
                rDate: packageInfo.day_to,
                budget: packageInfo.budget,
            };

            // Call on API to generate 5 results based on the package
            return await this.getPackageService.getFlightData(criteria)
                .then(() => this.getPackageService.getHotelData(criteria))
                .then(() => this.getPackageService.combinePackage(criteria))
        } catch (error) {
            console.error(error);
        }
    }

    async updatePackage(packageId, packageUpdates) {
        try {
            // Update the tickets and rooms of the packages []
            console.log('Updating');
            if (packageUpdates.length > 1) {
                try {
                    // trim the packageUpdates array for saving in database
                    if (typeof packageUpdates[0] === 'string') {
                    packageUpdates = packageUpdates.pop();
                    }

                    let newPackage = packageUpdates.shift();

                    console.log(newPackage);

                    let ticketId = await this.saveService.addTicket(packageId, newPackage);
                    let roomId = await this.saveService.addRooms(ticketId[0], newPackage);

                    // Recursive calling of function to finish the packageUpdates array
                    return this.updatePackage(packageId, packageUpdates);
                } catch (err) { console.log(err) }

            } else {
                console.log('All packages are saved!');
                return 'All packages are saved!';
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = DailyUpdateService;