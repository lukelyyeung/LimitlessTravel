
exports.seed = function (knex, Promise) {
  let user1 = {
    name: 'user1',
    email: 'user1@gmail.com',
    google: 'google1',
    facebook: 'facebook1',
    instagram: 'instagram1'
  }

  let user2 = {
    name: 'user2',
    email: 'user2@gmail.com',
    google: 'google2',
    facebook: 'facebook2',
    instagram: 'instagram2'
  }

  let userpackage1 = {
    user_id: 1,
    package_id: 1
  }

  let userpackage2 = {
    user_id: 1,
    package_id: 2
  }

  let userpackage3 = {
    user_id: 2,
    package_id: 1
  }

  let userpackage4 = {
    user_id: 2,
    package_id: 2
  }

  let package1 = {
    day_from: '2010-07-10',
    day_to: '2010-07-14',
    city_from: 'HongKong',
    city_to: 'Japan'
  }

  let package2 = {
    day_from: '2010-10-10',
    day_to: '2010-10-14',
    city_from: 'HongKong',
    city_to: 'New York'
  }


  let ticket1 = {
    package_id: 1,
    id: 'CX',
    flight_code: '789',
    airport_from: 'HKG',
    airport_to: 'KIX',
    day_from: '2010-07-10',
    day_to: '2010-07-14',
    flight_price: 1439.8
  }

  let ticket2 = {
    package_id: 2,
    id: 'CX',
    flight_code: '987',
    airport_from: 'HKG',
    airport_to: 'NYC',
    day_from: '2010-10-10',
    day_to: '2010-10-14',
    flight_price: 3439.8
  }

  let hotel1 = {
    hotel_name: 'New York Hotel',
    city: 'New York',
    location: {
      lat: 100,
      long: 100
    }
  };

  let hotel2 = {
    hotel_name: 'Osaka Hotel',
    city: 'Japan',
    location: {
      lat: 200,
      long: 200
    }
  };

  let booking1 = {
    ticket_id: 1,
    hotel_id: 2,
    hotel_price: 1400,
    effect_date: '2010-05-02',
  };

  let booking2 = {
    ticket_id: 2,
    hotel_id: 1,
    hotel_price: 4400,
    effect_date: '2010-05-02',
  };

  let airlines = require('./airlines.json');
    
  return knex('users').insert(user1)
    .then(() => { return knex('users').insert(user2) })
    .then(() => { return knex('packages').insert(package1) })
    .then(() => { return knex('packages').insert(package2) })
    .then(() => {
      return knex
        .batchInsert('userpackage', [userpackage1, userpackage2, userpackage3, userpackage4], 30)
    })
    .then(() => { return knex('hotels').insert(hotel1) })
    .then(() => { return knex('hotels').insert(hotel2) })
    .then(() => {
      return knex
        .batchInsert('airlines', airlines, 100);
    })
    .then(() => { return knex('tickets').insert(ticket1) })
    .then(() => { return knex('tickets').insert(ticket2) })
    .then(() => { return knex('rooms').insert(booking1) })
    .then(() => { return knex('rooms').insert(booking2) })
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}

