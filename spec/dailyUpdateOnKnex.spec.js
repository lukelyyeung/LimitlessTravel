const dailyUpdateOnKnex = require('../../service/knexService/dailyUpdateOnKnex');
describe("The dailyUpdate Function should", function() {
    let mock = {};

    beforeEach(function() {
        mock.cb = jasmine.createSpy().and.callFake(function () {
            return new Promise((resolve, reject) => {
                resolve();
            })
        });
        jasmine.clock().install();
    })

    afterEach(function(){
        jasmine.clock().uninstall();
    })
   
    it("should take a function and trigger it at the given time", function() {
        dailyUpdateOnKnex(mock.cb.bind(mock), new Date().getTime() + 5000, 5000);
        expect(mock.cb).not.toHaveBeenCalled();
        jasmine.clock().tick(5001);
        expect(mock.cb).toHaveBeenCalled();
    })
    
    it("should trigger immediately when no time is given", function () {
        dailyUpdateOnKnex(mock.cb.bind(mock));
        jasmine.clock().tick(1);
        expect(mock.cb).toHaveBeenCalled();
    })

    it("should repeat the function at the given interval", function() {
        dailyUpdateOnKnex(mock.cb.bind(mock), new Date().getTime() + 5000, 5000);
        expect(mock.cb).not.toHaveBeenCalled();
        jasmine.clock().tick(5001);
        expect(mock.cb.calls.count()).toEqual(1);
        jasmine.clock().tick(10002);
        expect(mock.cb.calls.count()).toEqual(2);
        jasmine.clock().tick(15003);
        expect(mock.cb.calls.count()).toEqual(3);
    });

    it("should repeat the function at the very short interval", function () {
        dailyUpdateOnKnex(mock.cb.bind(mock), new Date().getTime() + 10, 10);
        expect(mock.cb).not.toHaveBeenCalled();
        jasmine.clock().tick(10);
        expect(mock.cb.calls.count()).toEqual(1);
        jasmine.clock().tick(20);
        expect(mock.cb.calls.count()).toEqual(2);
        jasmine.clock().tick(30);
        expect(mock.cb.calls.count()).toEqual(3);
    });

    it("should repeat the function at the very long interval", function () {
        dailyUpdateOnKnex(mock.cb.bind(mock), new Date().getTime() + 86400000, 86400000);
        expect(mock.cb).not.toHaveBeenCalled();
        jasmine.clock().tick(86400001);
        expect(mock.cb.calls.count()).toEqual(1);
        jasmine.clock().tick(86400001 * 2);
        expect(mock.cb.calls.count()).toEqual(2);
        jasmine.clock().tick(86400001 * 3);
        expect(mock.cb.calls.count()).toEqual(3);
    });

})
