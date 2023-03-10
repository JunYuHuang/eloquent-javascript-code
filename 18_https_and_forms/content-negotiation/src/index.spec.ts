export { };
import "jest";

const URL = "https://eloquentjavascript.net/author";

describe('fetch()', () => {
    it('exists', () => {
        expect(fetch).toBeDefined();
    })
    it(`should return some plain text content when called on "${URL}" with the right headers`, () => {
        expect.assertions(2);
        return fetch(URL, {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            },
        }).then(res => {
            if (!res.ok) throw new Error("Network response error");
            expect(res.status).toStrictEqual(200);
            expect(res.headers.get("Content-Type")).toStrictEqual("text/plain");
            // console.log(res);
        });
    })
    it(`should return some html text content when called on "${URL}" with the right headers`, () => {
        expect.assertions(2);
        return fetch(URL, {
            method: "GET",
            headers: {
                "Accept": "text/html"
            },
        }).then(res => {
            if (!res.ok) throw new Error("Network response error");
            expect(res.status).toStrictEqual(200);
            expect(res.headers.get("Content-Type")!.indexOf("text/html") != -1).toStrictEqual(true);
            // console.log(res);
        });
    })
    it(`should return some JSON content when called on "${URL}" with the right headers`, () => {
        expect.assertions(2);
        return fetch(URL, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
        }).then(res => {
            if (!res.ok) throw new Error("Network response error");
            expect(res.status).toStrictEqual(200);
            expect(res.headers.get("Content-Type")).toStrictEqual("application/json");
            // console.log(res);
        });
    })
    it(`should not return valid content when called on "${URL}" with an invalid header`, async () => {
        expect.assertions(1);
        const res = await fetch(URL, {
            method: "GET",
            headers: {
                "Accept": "application/rainbows+unicorns"
            },
        });
        expect(res.status != 200).toBeTruthy();
        console.log(res.status);
        // returns status code of 406
    })
})