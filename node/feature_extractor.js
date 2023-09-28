const featureFunctions = require("../common/featureFunctions.js");

const constants = require("../common/constants.js");
const utils = require("../common/utils.js");



const fs = require('fs');

console.log("Extracting features...")


const samples = JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);


const makeJSON_JS = (dir, dir_js, featureNames, samples, objName) => {

    fs.writeFileSync(
    dir, 
    JSON.stringify({
        featureNames, 
        samples: samples.map(
            s=>{
                return {
                    point : s.point, 
                    label: s.label
                }
            }
        )
    }
    )
    
);

fs.writeFileSync(
    dir_js, 
    `const ${objName} = ${JSON.stringify(
        {
            featureNames, 
            samples: samples
        }
    )};`
);

}


for (const sample of samples){
    

    const paths = JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR + "/" + sample.id + ".json"
        )
    );

    const functions = featureFunctions.inUse.map(f=> f.function);
    sample.point = functions.map(f=>f(paths));
}


const featureNames = featureFunctions.inUse.map(f=>f.name);

console.log("Generating Splits...");

const trainingAmount = samples.length * 0.5;

const training = [];
const testing = [];

for (let i = 0; i < samples.length; i++){
    if(i < trainingAmount){
        training.push(samples[i]);
        
        
    }else{
        testing.push(samples[i]);
    }
}


const minMax = utils.normalizePoints(
    training.map(s=>s.point)
);

utils.normalizePoints(
    testing.map(s=>s.point), minMax
);


makeJSON_JS(constants.TRAINING, constants.TRAINING_JS, featureNames, training, "training");
makeJSON_JS(constants.TESTING, constants.TESTING_JS,featureNames, testing, "testing");
makeJSON_JS(constants.FEATURES, constants.FEATURES_JS,featureNames, samples, "features");








fs.writeFileSync(constants.MIN_MAX_JS,
    `const minMax= ${JSON.stringify(minMax)};`)

console.log("Feature extraction Complete");

