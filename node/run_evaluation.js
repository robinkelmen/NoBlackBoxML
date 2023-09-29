const constants = require('../common/constants.js');
const utils = require('../common/utils.js');



const KNN = require('../common/classifiers/knn.js');


const fs = require('fs');


console.log("Running Classifier...");


const {samples: trainingSamples} = JSON.parse(
    fs.readFileSync(constants.TRAINING)
);

 const kNN = new KNN(trainingSamples, 100);


const {samples:testingSamples} = JSON.parse(
    fs.readFileSync(constants.TESTING)
);


let totalCount = 0;
let correctCount = 0;

for (const sample of testingSamples){
    const {label: predictedLabel }= kNN.predict(sample.point);
    correctCount+=predictedLabel == sample.label;
    totalCount++;
}

console.log("ACCURACY: " + correctCount + "/" + totalCount + " (" +
    utils.formartPercent(correctCount/totalCount) + " )"
);


console.log("Generating Decision boundary...");

const {createCanvas} = require('canvas');

const canvas = createCanvas(100, 100);
const ctx = canvas.getContext('2d');


for (let x = 0; x < canvas.width; x ++){
    for (let y = 0; y < canvas.height; y++){
         const point = [
            x / canvas.width,
            1-y / canvas.height
         ];

         const {label} = kNN.predict(point);
         const color = utils.styles[label].color;
         ctx.fillStyle = color;
         ctx.fillRect(x, y, 1, 1);

    }
}

const buffer = canvas.toBuffer("image/jpeg");
fs.writeFileSync(constants.DECISION_BOUNDARY, buffer);



