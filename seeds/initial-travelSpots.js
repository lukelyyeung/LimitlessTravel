
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('travel_spots').del()
    .then(function () {
      // Inserts seed entries
      return knex('travel_spots').insert([
        { airportCode: 'KIX', city: 'Osaka', country: 'Japan', region: 'East Asia', location: { lat: 34.6937398, long: 135.5021820 } },
        { airportCode: 'NRT', city: 'Tokyo', country: 'Japan', region: 'East Asia', location: { lat: 35.6895266, long: 139.6916809 } },
        // {airportCode: 'OKA', city: 'Okinawa', country: 'Japan', region: 'East Asia'},
        { airportCode: 'TPE', city: 'Taipei', country: 'Taiwan', region: 'East Asia', location: { lat: 25.0476904, long: 121.5168507 } },
        // {airportCode: 'KHH', city: 'Kaohsiung', country: 'Taiwan', region: 'East Asia'},
        // {airportCode: 'ICN', city: 'Seoul', country: 'South Korea', region: 'East Asia'},
        // { airportCode: 'RGN', city: 'Yangon', country: 'Myanmar', region: 'South East Asia' },
        // {airportCode: 'NYU', city: 'Bagan', country: 'Myanmar', region: 'South East Asia'},
        {airportCode: 'CNX', city: 'Chiang Mai', country: 'Thailand', region: 'South East Asia', location: { lat: 18.7902778, long: 98.9816666 }},
        // {airportCode: 'VTE', city: 'Vientiane', country: 'Laos', region: 'South East Asia'},
        {airportCode: 'TLV', city: 'Jerusalem', country: 'Israel', region: 'Middle East', location: { lat: 31.7666667, long: 35.2333336 }},
        {airportCode: 'BOM', city: 'Mumbai', country: 'India', region: 'Middle East', location: { lat: 19.0144100, long: 72.8479385 }},
        // {airportCode: 'BLR', city: 'Bangalore', country: 'India', region: 'Middle East'},
        // {airportCode: 'KEF', city: 'Reykjavik', country: 'Iceland', region: 'Europe'},
        {airportCode: 'HAM', city: 'Hamburg', country: 'Germany', region: 'Europe', location: { lat: 53.5500000, long: 10.0000000 }},
        { airportCode: 'SFO', city: 'San Francisco', country: 'USA', region: 'North America', location: { lat: 37.7749295, long: -122.4194183 } },
        // {airportCode: 'LAS', city: 'Las Vegas', country: 'USA', region: 'North America'}
      ]);
    });
};
