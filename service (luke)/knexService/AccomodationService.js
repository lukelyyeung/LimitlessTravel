const {
    users,
    userPackage,
    packages,
    tickets,
    rooms,
    airlines,
    hotels
} = require('./tableName');

class AccomodationService {
    constructor(knex) {
        this.knex = knex;
    }

    findOrCreateHotel(packageInfo) {
        let reProfile = {
            hotel_name: packageInfo.hotel_name,
            city: packageInfo.hotel_city,
            location: packageInfo.location
        }

        return this.knex(hotels).select('hotel_id').where(reProfile)
            .then((hotel) => {
                if (hotel.length === 0) {
                    return this.knex(hotels).insert(reProfile).returning('hotel_id')
                    .then((id) => {
                        return id[0];
                    })
                } else {
                    return hotel[0].hotel_id;                
                }
            })
            .catch((err) => {
                console.log(err);
                return -1;
            });
    }

    addRooms(ticketId, packageInfo) {
        return this.findOrCreateHotel(packageInfo)
        .then((hotelId) => {
            return this.knex(rooms).insert({
                ticket_id: ticketId,
                hotel_id: hotelId,
                hotel_price: packageInfo.hotel_price,
                effect_date: packageInfo.effect_date
            }).returning('room_id');
        })
    }
}

module.exports = AccomodationService;