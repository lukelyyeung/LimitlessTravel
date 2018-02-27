// Provide table name in postgresql
const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('../../services/tableName');

class DailyUpdateService {
    constructor(Axios, knex, flightService, accomodationService) {
        this.Axios = Axios;
        this.knex = knex;
        this.flightService = new flightService(knex);
        this.accomodationService = new accomodationService(knex);
    }

    async Start() {
        if (this.packageArray.length > 0) {

            // trim the pacakge from the existing packages for updating
            let currentPackage = this.packageArray.shift();

            // recursive calling to finish the existing packageArray;
            return this.callOnAPI(currentPackage)
                .then((packageUpdate) => {
                    return this.updatePackage(currentPackage.packageId, packageUpdate);
                })
                .then(() => {
                    return this.Start();
                })
                .catch(err => {
                    return -1;
                });
        }
    }

    async getAllPackages() {
        // Get all packages with day_from further than today
        let currentDate = new Date();  
        // Save the package in this.packageArray
        this.packageArray = await this.knex(packages).select('*').where('day_from', '>', currentDate);
        return;
    }

    async callOnAPI(packageInfo) {
        let reProfile = {
            // Tidy up pacakgeInfo here.
        }
        // Call on API to generate 5 results based on the package
        return this.Axios.update(reProfile);
        return mutliple;
    }

    async updatePackage(packageId, packageUpdates) {
        // Update the tickets and rooms of the packages []
        if (packageUpdates.length > 0) {
            try {
                // trim the packageUpdates array for saving in database
                let newPackage = packageUpdates.shift();
                
                let ticketId = await this.flightService.addTicket(packageId, newPackage);
                let roomId = await this.accomodationService.addRooms(ticketId[0], newPackage);
 
                // Recursive calling of function to finish the packageUpdates array
                return this.updatePackage(packageId, packageUpdates);

            } catch (error) {
            }

        } else {
            return 'All packages are saved!';
        }
    }
}

module.exports = DailyUpdateService;