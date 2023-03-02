export { };
import "jest";
import { buildTable } from "./index";

describe('buildTable()', () => {
    it('exists', () => {
        expect(buildTable).toBeDefined();
    })
    it('builds a HTML table from an array of objects', () => {
        document.body.innerHTML = `
            <!doctype html>
            <h1>Mountains</h1>
            <div id="mountains"></div>
        `;
        const res = `
            <h1>Mountains</h1>
            <div id="mountains">
            <table>
                <tr>
                    <th>name</th>
                    <th>height</th>
                    <th>place</th>
                </tr>
                <tr>
                    <td>Kilimanjaro</td>
                    <td style=\"text-align:right;\">5895</td>
                    <td>Tanzania</td>
                </tr>
                <tr>
                    <td>Everest</td>
                    <td style=\"text-align:right;\">8848</td>
                    <td>Nepal</td>
                </tr>
                <tr>
                    <td>Mount Fuji</td>
                    <td style=\"text-align:right;\">3776</td>
                    <td>Japan</td>
                </tr>
                <tr>
                    <td>Vaalserberg</td>
                    <td style=\"text-align:right;\">323</td>
                    <td>Netherlands</td>
                </tr>
                <tr>
                    <td>Denali</td>
                    <td style=\"text-align:right;\">6168</td>
                    <td>United States</td>
                </tr>
                <tr>
                    <td>Popocatepetl</td>
                    <td style=\"text-align:right;\">5465</td>
                    <td>Mexico</td>
                </tr>
                <tr>
                    <td>Mont Blanc</td>
                    <td style=\"text-align:right;\">4808</td>
                    <td>Italy/France</td>
                </tr>
            </table>
            </div>
        `;
        buildTable(document.getElementById("mountains"));
        const allWhiteSpaceRegex = /\s/g;
        expect(document.body.innerHTML.replace(allWhiteSpaceRegex, "")).toStrictEqual(res.replace(allWhiteSpaceRegex, ""));
    })
})