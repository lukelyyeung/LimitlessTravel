const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('./tableName');

class SaveService {
    constructor(knex) {
        this.knex = knex;
    }

    async findOrCreateUserPackage(userId, newPackageArray) {
        // finding if the package exist in database
        try {
            console.log(newPackageArray);
            let newPackage = newPackageArray[0];
            console.log('At findOrCreate, newPackage= ', newPackage);
            let packageId = await this.knex(packages).select('package_id').where({
                day_from: newPackage.departure_date,
                day_to: newPackage.return_date,
                city_from: newPackage.flight.flyFrom,
                city_to: newPackage.flight.flyTo,
                budget: newPackage.budget
            })

            if (packageId.length === 0) {
                // Case for no exisiting package
                console.log('creating new package');
                return await this.createPackage(userId, newPackageArray);
            } else {
                await this.knex.raw(`INSERT INTO userpackage (user_id, package_id) SELECT ?, ? WHERE NOT EXISTS(SELECT 1 FROM userpackage WHERE user_id = ? AND package_id = ?)`
                    , [userId, packageId[0].package_id, userId, packageId[0].package_id]);

                let msg = `Package ${packageId[0].package_id} exists!`;
                console.log(msg);
                return msg;
                // return await this.updatePackage(packageId[0].package_id, newPackageArray);
            }
        } catch (err) { console.log(err); }
    }

    async createPackage(userId, newPackageArray) {
        // trim the package from newPackageArray for saving
        try {
            let newPackage = newPackageArray.shift();
            let newPackageId = await this.knex(packages).insert({
                day_from: newPackage.departure_date,
                day_to: newPackage.return_date,
                city_from: newPackage.flight.flyFrom,
                city_to: newPackage.flight.flyTo,
                budget: newPackage.budget
            }).returning('package_id');

            // creating user-package relation
            console.log('created package with ', newPackageId)
            // console.log('created package with ', PackageId[0])
            await this.knex(userPackage).insert({
                user_id: userId,
                package_id: newPackageId[0]
            });

            // creating package-ticket relation
            console.log('created User-Package');
            let ticketId = await this.addTicket(newPackageId[0], newPackage);

            // creating ticket-room relation
            console.log('created ticket with ', ticketId[0]);
            await this.addRooms(ticketId[0], newPackage);

            // recursive calling to finish the newPcakageArray
            return await this.updatePackage(newPackageId[0], newPackageArray);
        } catch (err) { console.log(err); }
    }

    async addTicket(packageId, wholePackage) {
        try {
            // console.log('creating tickets');
            console.log(wholePackage);
            const { package_price, flight } = wholePackage;
            return await this.knex(tickets).insert({
                package_id: packageId,
                departure_airline: flight.flightDetails[0].airline,
                return_airline: flight.flightDetails[1].airline,
                departure_details: flight.flightDetails[0],
                return_details: flight.flightDetails[1],
                total_price: package_price,
                flight_price: flight.price,
                deep_link: flight.deep_link
            })
                .returning('ticket_id');
        } catch (err) { console.log(err); }
    }

    async findOrCreateHotel(wholePackage) {
        console.log('creating hotels');
        try {
            let { accommodation } = wholePackage
            let hotelProfile = {
                property_name: accommodation.property_name,
                address: accommodation.address,
            }

            let hotel = await this.knex(hotels).select('hotel_id').where(hotelProfile)
            // .then((hotel) => {
            if (hotel.length === 0) {
                let hotelId = await this.knex(hotels).insert(hotelProfile).returning('hotel_id')
                return hotelId[0];

            } else {

                return hotel[0].hotel_id;
            }
        } catch (err) { console.log(err); }
    }

    async addRooms(ticketId, wholePackage) {
        console.log('creating rooms');
        try {
            let hotelId = await this.findOrCreateHotel(wholePackage)
            return await this.knex(rooms).insert({
                ticket_id: ticketId,
                hotel_id: hotelId,
                hotel_price: wholePackage.accommodation.price,
                effect_date: wholePackage.effective
            }).returning('room_id');
        } catch (err) { console.log(err); }
    }

    async updatePackage(packageId, newPackageArray) {
        try {
            if (newPackageArray.length > 0) {
                try {
                    let newPackage = newPackageArray.shift();
                    // console.log('package id: ', packageId);
                    let ticketId = await this.addTicket(packageId, newPackage);
                    // console.log('ticket id: ', ticketId[0]);
                    let roomId = await this.addRooms(ticketId[0], newPackage);
                    // console.log('room id: ', roomId[0]);
                    return await this.updatePackage(packageId, newPackageArray);
                } catch (error) {
                    console.error(error);
                }

            } else {
                return 'All packages are saved!';
            }
        } catch (err) { console.log(err); }
    }

}

module.exports = SaveService;