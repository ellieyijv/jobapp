import { delay } from "q";

describe(`The Question Detail Component`, ()=>{
    beforeEach(()=>{
        console.log("before each")
    });
    beforeAll(()=>{
        console.log("before all")
    })
    it(`should not regress`, ()=>{
        expect(2+2).toEqual(4);
    })
    it(`should not regress`, ()=>{
        expect(2+2).toEqual(5);
    })
    it.only("async test 1", done=>{
        setTimeout(done, 100);
    })
    it.only("async test 2", ()=>{
        return new Promise(
            resolve=>setTimeout(resolve, 1500)
        )
    })
    it.skip("async test 3, the demo import delay from redux-saga",
             async ()=>await delay(100)  
        )           
    afterEach(()=>{
        console.log("after each")
    })
    afterAll(()=>{
        console.log("after all")
    })
})