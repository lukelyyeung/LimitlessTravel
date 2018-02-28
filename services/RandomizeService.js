class RandomizeService {
    constructor(knex) {
        this.knex = knex;
    }

    findAvailableDestination() {
        return this.knex.select('airportCode')
            .from('travel_spots')
            .then(data => {
                return data.map(x => x.airportCode);
            })
            .catch(err => {
                console.log(err);
                return false;
            })
    }

    pickDestination(availableDestination) {
        if (availableDestination.length == 0)
            return false;
        else {
            let max = availableDestination.length;
            let randomNum = Math.floor(Math.random() * max);
            return availableDestination[randomNum];
        }
    }

    removeDestination(destination, availableDestination) {
        let index = availableDestination.indexOf(destination);

        if (index < 0) {
            return false;
        } else {
            availableDestination.splice(index, 1);
        }
    }

}

module.exports = RandomizeService;
