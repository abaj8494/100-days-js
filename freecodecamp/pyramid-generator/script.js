const character = '#';
const count = 8; // multiply by 2 + 1 to guarantee the apex

const rows = [];

let inverted = false;

// nifty logic to produce a pyramid.
function padRow(rowNumber, rowCount) {
    return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowCount + 1 - 2*(rowCount - rowNumber + 1)) + " ".repeat(rowCount - rowNumber)
}

for (let i = 1; i <= count; i++) {
    if (inverted) {
        rows.unshift(padRow(i, count)) // adds to beginning of array
    } else {
        rows.push(padRow(i, count))
    }
}

let result = ""

// never seen this for syntax before.
for (const row of rows) {
    result = result + row + "\n"; // don't forget semi-colons, heh
}

console.log(result);
