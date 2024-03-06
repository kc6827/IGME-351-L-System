var svgMethod;
var seq;
var seq2;
var funnels;
var spacing;
var margins = [0, 0];
var lineLength;
var iterations = 1;
var offsets;
var color;
var dir;
var branches = [];
var alphabet = ["0", "1"];
var rules = ["010", "111"];

const svgTest = () => {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="49%" height="100%" viewBox="0 0 100 100">` +
        polyl(2, 'red', 'blue', 10, 83.5, 70, 33, 40, 40) +
        path("M" + 50, 0, "L" + 75, 50, 35, 40) +
        scale(translate(rotate(rect(50, 50, 20, 20, 'red', 'none'), 25, 50, 50), 10, 10), .5, 1.2) +
        `</svg>`
        ;
}

const svg1 = () => {
    seq = "";
    seq2 = "";
    lineLength = 100;
    spacing = 7;
    margins = [50 - lineLength / 2, spacing];
    funnels = "";
    offsets = [0, 0];
    dir = 0;

    var initialSize = 2;
    //initial seed
    // for (var i = 0; i < initialSize; i++) {
    //     seq += alphabet[Math.floor(Math.random() * 4)];
    // }
    seq = "0";
    console.log("initial: " + seq);

    for (var i = 0; i < iterations; i++) {
        seq2 = "";
        for (var j = 0; j < seq.length; j++) {
            seq2 += rules[Number(seq[j])];
        }

        for (var j = 0; j < seq.length; j++) {
            if (seq[j] == 0) {
                funnels += translate(
                    strokeW(
                        polyl('black', 'none',
                            0, 0,
                            lineLength / seq.length, 0,
                            (lineLength / seq.length) * .5, -spacing,
                            0, 0),
                        .1),
                    margins[0] + offsets[0], margins[1] + offsets[1]);
            }
            offsets[0] += lineLength / seq.length;
        }

        offsets[0] = 0;
        offsets[1] += spacing;

        seq = seq2;
    }

    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="49%" height="100%" viewBox="0 0 100 100">` +
        funnels +
        `</svg>`
}

const selectChange = () => {
    document.querySelector("input").value = 1;
    document.querySelector("input").onchange = e => {
        iterations = e.target.value;
    };
}

const buttonPress = () => {
    svgMethod = svg1;

    document.querySelector("button").onclick = e => {
        document.querySelector('svg').outerHTML = svgMethod();
    };
}