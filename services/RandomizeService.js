class RandomizeService {
    constructor(knex) {
        this.knex = knex;
        this.availableDestination = [];
    }

    findAvailableDestination() {
        return this.knex.select('airportCode')
            .from('travel_spots')
            .then(data => {
                this.availableDestination = data.map(x => x.airportCode);
                return this.availableDestination;
            })
            .catch(err => {
                console.log(err);
                return false;
            })
    }

    pickDestination() {
        if (this.availableDestination.length == 0)
            return false;
        else {
            let max = this.availableDestination.length;
            let randomNum = Math.floor(Math.random() * max);
            return this.availableDestination[randomNum];
        }
    }

    removeDestination(destination) {
        let index = this.availableDestination.indexOf(destination);

        if (index < 0) {
            return false;
        } else {
            this.availableDestination.splice(index, 1);
        }
    }

}

module.exports = RandomizeService;

// validateBudget(destination, price, budget) {
//     let index = this.availableDestination.indexOf(destination);

//     if (index < 0) {
//         return -1;  //Supposing it's checked by pickDestination method, it's for safe..
//     } else if (price < budget) {
//         return 1;
//     } else if (price > budget) {
//         this.availableDestination.splice(index, 1);
//         return 0;
//     }
// }