
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('travel_spots').del()
    .then(function () {
      // Inserts seed entries
      return knex('travel_spots').insert([
        {airportCode: 'KIX', city: 'Osaka', country: 'Japan', region: 'East Asia'},
        {airportCode: 'HND', city: 'Tokyo', country: 'Japan', region: 'East Asia'},
        {airportCode: 'OKA', city: 'Okinawa', country: 'Japan', region: 'East Asia'},
        {airportCode: 'TPE', city: 'Taipei', country: 'Taiwan', region: 'East Asia'},
        {airportCode: 'KHH', city: 'Kaohsiung', country: 'Taiwan', region: 'East Asia'},
        {airportCode: 'ICN', city: 'Seoul', country: 'South Korea', region: 'East Asia'},
        {airportCode: 'RGN', city: 'Yangon', country: 'Myanmar', region: 'South East Asia'},
        {airportCode: 'NYU', city: 'Bagan', country: 'Myanmar', region: 'South East Asia'},
        {airportCode: 'CNX', city: 'Chiang Mai', country: 'Thailand', region: 'South East Asia'},
        {airportCode: 'VTE', city: 'Vientiane', country: 'Laos', region: 'South East Asia'},
        {airportCode: 'TLV', city: 'Jerusalem', country: 'Israel', region: 'Middle East'},
        {airportCode: 'BOM', city: 'Mumbai', country: 'India', region: 'Middle East'},
        {airportCode: 'BLR', city: 'Bangalore', country: 'India', region: 'Middle East'},
        {airportCode: 'KEF', city: 'Reykjavik', country: 'Iceland', region: 'Europe'},
        {airportCode: 'HAM', city: 'Hamburg', country: 'Germany', region: 'Europe'},
        {airportCode: 'SFO', city: 'San Francisco', country: 'USA', region: 'North America'},
        {airportCode: 'LAS', city: 'Las Vegas', country: 'USA', region: 'North America'}
      ]);
    });
};
