// Function to calculate angles between specified keypoints
function calculateAngles() {
    for (let i = 0; i < poses.length; i++) {
        let keypoints = poses[i].pose.keypoints;

        // Define keypoint sets for angle calculation
        const keypointSets = [
            ["rightWrist", "rightElbow", "rightShoulder"],
            ["leftWrist", "leftElbow", "leftShoulder"],
            ["leftHip", "leftKnee", "leftAnkle"],
            ["rightHip", "rightKnee", "rightAnkle"],
            ["rightElbow", "rightShoulder", "rightHip"],
            ["leftElbow", "leftShoulder", "leftHip"],
            ["leftKnee", "leftHip", "leftShoulder"],
            ["rightKnee", "rightHip", "rightShoulder"],
        ];

        // Iterate through each keypoint set
        for (let keypointSet of keypointSets) {
            let [partA, partB, partC] = keypointSet;

            // Check if keypoints have valid scores
            if (
                getKeypointScore(keypoints, partA) > 0.2 &&
                getKeypointScore(keypoints, partB) > 0.2 &&
                getKeypointScore(keypoints, partC) > 0.2
            ) {
                // Calculate angle between keypoints
                let angle = calculateAngle(
                    getKeypointPosition(keypoints, partA),
                    getKeypointPosition(keypoints, partB),
                    getKeypointPosition(keypoints, partC)
                );
                // Store angle in angleData
                angleData[partB] = angle;
            }
        }
    }
}

// Function to calculate angles between specified keypoints
// function calculateAngles(poses) {
//     for (let i = 0; i < poses.length; i++) {
//         let keypoints = poses[i].pose.keypoints;

//         // Define keypoint sets for angle calculation
//         const keypointSets = [
//             ["rightWrist", "rightElbow", "rightShoulder"],
//             ["leftWrist", "leftElbow", "leftShoulder"],
//             ["leftHip", "leftKnee", "leftAnkle"],
//             ["rightHip", "rightKnee", "rightAnkle"],
//             ["rightElbow", "rightShoulder", "rightHip"],
//             ["leftElbow", "leftShoulder", "leftHip"],
//             ["leftKnee", "leftHip", "leftShoulder"],
//             ["rightKnee", "rightHip", "rightShoulder"],
//         ];

//         // Iterate through each keypoint set
//         for (let keypointSet of keypointSets) {
//             let [partA, partB, partC] = keypointSet;

//             // Check if keypoints have valid scores
//             if (
//                 getKeypointScore(keypoints, partA) > 0.2 &&
//                 getKeypointScore(keypoints, partB) > 0.2 &&
//                 getKeypointScore(keypoints, partC) > 0.2
//             ) {
//                 // Calculate angle between keypoints
//                 let angle = calculateAngle(
//                     getKeypointPosition(keypoints, partA),
//                     getKeypointPosition(keypoints, partB),
//                     getKeypointPosition(keypoints, partC)
//                 );
//                 // Store angle in angleData
//                 angleData[partB] = angle;
//             }
//         }
//     }
// }

// Function to calculate angle between three points
function calculateAngle(pointA, pointB, pointC) {
    let angle =
        atan2(pointC.y - pointB.y, pointC.x - pointB.x) -
        atan2(pointA.y - pointB.y, pointA.x - pointB.x);

    let degreesAngle = degrees(angle);
    if (degreesAngle < 0) {
        degreesAngle += 360;
    }
    return degreesAngle;
}

// Helper function to get keypoint score
function getKeypointScore(keypoints, partName) {
    let keypoint = keypoints.find((keypoint) => keypoint.part === partName);
    return keypoint ? keypoint.score : 0;
}

// Helper function to get keypoint position
function getKeypointPosition(keypoints, partName) {
    let keypoint = keypoints.find((keypoint) => keypoint.part === partName);
    return keypoint ? keypoint.position : { x: 0, y: 0 };
}

// // Helper function to get keypoint position
// function getKeypointPosition(keypoints, partName) {
//     let keypoint = keypoints.find((keypoint) => keypoint.part === partName);
//     return keypoint ? keypoint.position : { x: 0, y: 0 };
// }



// Function to check if keypoint is within noble range
function isKeypointInNobleRange(keypoint) {
    if (nobleKeypointsData.hasOwnProperty(keypoint)) {
        let angle = angleData[keypoint];
        return (
            angle >= nobleKeypointsData[keypoint].minAngle &&
            angle <= nobleKeypointsData[keypoint].maxAngle
        );
    }
    return true; // If keypoint not in noble data, consider it within range
}

// //Function to compare angles with noble keypoints
// function compareWithNobleKeypoints() {
//     for (let key in angleData) {
//         if (nobleKeypointsData.hasOwnProperty(key)) {
//             if (
//                 angleData[key] < nobleKeypointsData[key].minAngle ||
//                 angleData[key] > nobleKeypointsData[key].maxAngle
//             ) {
//                 // console.log(`${key} is outside the noble range.`);
//                 // Implement further action if needed
//                 triggerFeedback(key);
//             } else {
//                 // console.log(`${key} is in the noble range.`);
//                 // Implement further action if needed
//             }
//         }
//     }
// }

// Function to compare angles with noble keypoints
function compareWithNobleKeypoints() {
    for (let key in angleData) {
        if (nobleKeypointsData.hasOwnProperty(key)) {
            let angle = angleData[key];
            let minAngle = nobleKeypointsData[key].minAngle;
            let maxAngle = nobleKeypointsData[key].maxAngle;

            // Check if angle falls outside the noble range
            if (angle < minAngle || angle > maxAngle) {
                triggerFeedback(key);
            }
        }
    }
}
// function compareWithNobleKeypoints(keysOfInterest) {
//     for (let i = 0; i < keysOfInterest.length; i++) {
//         const key = keysOfInterest[i];

//         // Check if the key exists in angleData and nobleKeypointsData
//         if (angleData.hasOwnProperty(key) && nobleKeypointsData.hasOwnProperty(key)) {
//             // Check if the angle for the key is outside the noble range
//             if (
//                 angleData[key] < nobleKeypointsData[key].minAngle ||
//                 angleData[key] > nobleKeypointsData[key].maxAngle
//             ) {
//                 // Implement further action if needed
//                 triggerFeedback(key);
//             } else {
//                 // Implement further action if needed
//             }
//         }
//     }
// }

// Example usage:
// const keysOfInterest = ["rightElbow", "leftElbow", "rightShoulder"]; // Specify keys of interest
// compareWithNobleKeypoints(keysOfInterest);


// Function to compare angles with noble keypoints
// function compareWithNobleKeypoints(keysToCheck) {
//     for (let key in keysToCheck) {
//         if (nobleKeypointsData.hasOwnProperty(key)) {
//             if (
//                 angleData[key] < nobleKeypointsData[key].minAngle ||
//                 angleData[key] > nobleKeypointsData[key].maxAngle
//             ) {
//                 // console.log(`${key} is outside the noble range.`);
//                 // Implement further action if needed
//                 triggerFeedback(key);
//             } else {
//                 // console.log(`${key} is in the noble range.`);
//                 // Implement further action if needed
//             }
//         }
//     }
// }


// Function to fill noble keypoints data
function fillNobleKeypointsData() {
    for (let i = 0; i < poses.length; i++) {
        let keypoints = poses[i].pose.keypoints;
        for (let j = 0; j < keypoints.length; j++) {
            let keypoint = keypoints[j];
            if (!nobleKeypointsData.hasOwnProperty(keypoint.part)) {
                nobleKeypointsData[keypoint.part] = { minAngle: 0, maxAngle: 0 };
            }
            switch (keypoint.part) {
                case "leftElbow":
                    nobleKeypointsData[keypoint.part].minAngle = 90;
                    nobleKeypointsData[keypoint.part].maxAngle = 180;
                    break;
                case "rightElbow":
                    nobleKeypointsData[keypoint.part].minAngle = 90;
                    nobleKeypointsData[keypoint.part].maxAngle = 180;
                    break;
                case "leftShoulder":
                    nobleKeypointsData[keypoint.part].minAngle = 45;
                    nobleKeypointsData[keypoint.part].maxAngle = 66;
                    break;
                case "rightShoulder":
                    nobleKeypointsData[keypoint.part].minAngle = 45;
                    nobleKeypointsData[keypoint.part].maxAngle = 66;
                    break;
                case "leftWrist":
                    nobleKeypointsData[keypoint.part].minAngle = 0;
                    nobleKeypointsData[keypoint.part].maxAngle = 90;
                    break;
                case "rightWrist":
                    nobleKeypointsData[keypoint.part].minAngle = 0;
                    nobleKeypointsData[keypoint.part].maxAngle = 90;
                    break;
                case "leftHip":
                    nobleKeypointsData[keypoint.part].minAngle = 150;
                    nobleKeypointsData[keypoint.part].maxAngle = 180;
                    break;
                case "rightHip":
                    nobleKeypointsData[keypoint.part].minAngle = 150;
                    nobleKeypointsData[keypoint.part].maxAngle = 180;
                    break;
                case "leftKnee":
                    nobleKeypointsData[keypoint.part].minAngle = 170;
                    nobleKeypointsData[keypoint.part].maxAngle = 180;
                    break;
                case "rightKnee":
                    nobleKeypointsData[keypoint.part].minAngle = 170;
                    nobleKeypointsData[keypoint.part].maxAngle = 180;
                    break;
                case "leftAnkle":
                    nobleKeypointsData[keypoint.part].minAngle = 80;
                    nobleKeypointsData[keypoint.part].maxAngle = 90;
                    break;
                case "rightAnkle":
                    nobleKeypointsData[keypoint.part].minAngle = 80;
                    nobleKeypointsData[keypoint.part].maxAngle = 90;
                    break;
                // Add more keypoints and their angle ranges as needed
                default:
                    // Set default angle range if not specified
                    nobleKeypointsData[keypoint.part].minAngle = 0;
                    nobleKeypointsData[keypoint.part].maxAngle = 180;
                    break;
            }
        }
    }
}

// // Function to fill noble keypoints data
// function fillNobleKeypointsData(poses) {
//     for (let i = 0; i < poses.length; i++) {
//         let keypoints = poses[i].pose.keypoints;
//         for (let j = 0; j < keypoints.length; j++) {
//             let keypoint = keypoints[j];
//             if (!nobleKeypointsData.hasOwnProperty(keypoint.part)) {
//                 nobleKeypointsData[keypoint.part] = { minAngle: 0, maxAngle: 0 };
//             }
//             switch (keypoint.part) {
//                 case "leftElbow":
//                 case "rightElbow":
//                     nobleKeypointsData[keypoint.part].minAngle = 90;
//                     nobleKeypointsData[keypoint.part].maxAngle = 180;
//                     break;
//                 case "leftShoulder":
//                 case "rightShoulder":
//                     nobleKeypointsData[keypoint.part].minAngle = 45;
//                     nobleKeypointsData[keypoint.part].maxAngle = 66;
//                     break;
//                 case "leftWrist":
//                 case "rightWrist":
//                     nobleKeypointsData[keypoint.part].minAngle = 0;
//                     nobleKeypointsData[keypoint.part].maxAngle = 90;
//                     break;
//                 case "leftHip":
//                 case "rightHip":
//                     nobleKeypointsData[keypoint.part].minAngle = 150;
//                     nobleKeypointsData[keypoint.part].maxAngle = 180;
//                     break;
//                 case "leftKnee":
//                 case "rightKnee":
//                     nobleKeypointsData[keypoint.part].minAngle = 170;
//                     nobleKeypointsData[keypoint.part].maxAngle = 180;
//                     break;
//                 case "leftAnkle":
//                 case "rightAnkle":
//                     nobleKeypointsData[keypoint.part].minAngle = 80;
//                     nobleKeypointsData[keypoint.part].maxAngle = 90;
//                     break;
//                 // Add more keypoints and their angle ranges as needed
//                 default:
//                     // Set default angle range if not specified
//                     nobleKeypointsData[keypoint.part].minAngle = 0;
//                     nobleKeypointsData[keypoint.part].maxAngle = 180;
//                     break;
//             }
//         }
//     }
// }


// Function to calculate body mass center using linear interpolation
function calculateBodyMass(poses) {
    let bodyMasses = [];

    // Loop through each detected pose
    for (let i = 0; i < poses.length; i++) {
        let keypoints = poses[i].pose.keypoints;

        // Check if keypoints for shoulders, waist, and knees are detected
        if (
            keypoints[5].score > 0.2 &&
            keypoints[11].score > 0.2 &&
            keypoints[25].score > 0.2 &&
            keypoints[12].score > 0.2 &&
            keypoints[14].score > 0.2
        ) {
            let shoulderLeft = keypoints[5];
            let shoulderRight = keypoints[6];
            let waist = keypoints[11];
            let kneeLeft = keypoints[25];
            let kneeRight = keypoints[26];

            // Calculate body mass center as the midpoint between the shoulders
            let bodyMassX = (shoulderLeft.position.x + shoulderRight.position.x) / 2;
            let bodyMassY = (shoulderLeft.position.y + shoulderRight.position.y) / 2;

            // Calculate the midpoint between the shoulders and the waist (upper part) using linear interpolation
            let upperPartX =
                shoulderLeft.position.x +
                (waist.position.x - shoulderLeft.position.x) * 0.5;
            let upperPartY =
                shoulderLeft.position.y +
                (waist.position.y - shoulderLeft.position.y) * 0.5;

            // Calculate the midpoint between the knees (lower part)
            let lowerPartX = (kneeLeft.position.x + kneeRight.position.x) / 2;
            let lowerPartY = (kneeLeft.position.y + kneeRight.position.y) / 2;

            // Store the body mass center, upper part, and lower part
            let bodyMass = {
                x: bodyMassX,
                y: bodyMassY,
            };

            let upperPart = {
                x: upperPartX,
                y: upperPartY,
            };

            let lowerPart = {
                x: lowerPartX,
                y: lowerPartY,
            };

            // Push body mass, upper part, and lower part to the bodyMasses array
            bodyMasses.push({ bodyMass, upperPart, lowerPart });
        }
    }

    return bodyMasses;
}

// Function to calculate the center of mass of the body
function calculateCenterMass(poses) {
    let bodyMassesCenter = [];

    // Loop through each detected pose
    for (let i = 0; i < poses.length; i++) {
        let keypoints = poses[i].pose.keypoints;

        // Calculate total mass (sum of keypoints scores)
        let totalMass = keypoints.reduce(
            (acc, keypoint) => acc + keypoint.score,
            0
        );

        // Calculate weighted average for x and y coordinates
        let centerX = 0;
        let centerY = 0;

        for (let j = 0; j < keypoints.length; j++) {
            centerX += (keypoints[j].position.x * keypoints[j].score) / totalMass;
            centerY += (keypoints[j].position.y * keypoints[j].score) / totalMass;
        }

        // Store the center of mass
        let centerOfMass = { x: centerX, y: centerY };

        bodyMassesCenter.push(centerOfMass);
    }

    return bodyMassesCenter;
}

// Function to recognize waist curls
function recognizeWaistCurls(poses) {
    let waistCurlsCounter = 0;

    // Calculate body mass for each pose
    let bodyMasses = calculateBodyMass(poses);

    // Loop through each calculated body mass
    for (let i = 0; i < bodyMasses.length; i++) {
        let bodyMass = bodyMasses[i].bodyMass;
        let upperPart = bodyMasses[i].upperPart;
        let lowerPart = bodyMasses[i].lowerPart;

        // Check if upper part and lower part are moving relative to the body mass center
        if (upperPart.y < bodyMass.y && lowerPart.y > bodyMass.y) {
            waistCurlsCounter++;
        }
    }
    updateCounters();

    return waistCurlsCounter;
}

// Function to recognize hand curls
function recognizeHandCurls(poses) {
    let curlCounter = 0;

    // Loop through each detected pose
    for (let i = 0; i < poses.length; i++) {
        let keypoints = poses[i].pose.keypoints;

        // Check if keypoints for left and right wrists are detected
        if (keypoints[9].score > 0.2 && keypoints[10].score > 0.2) {
            let leftWrist = keypoints[9];
            let rightWrist = keypoints[10];

            // Check if the left wrist is above the left elbow
            if (leftWrist.position.y < keypoints[7].position.y) {
                curlCounter++;
            }

            // Check if the right wrist is above the right elbow
            if (rightWrist.position.y < keypoints[8].position.y) {
                curlCounter++;
            }
        }
    }
    updateCounters();
    return curlCounter;
}

// Function to recognize leg curls
function recognizeLegCurls(poses) {
    let curlCounter = 0;

    // Loop through each detected pose
    for (let i = 0; i < poses.length; i++) {
        let keypoints = poses[i].pose.keypoints;

        // Check if keypoints for left and right ankles are detected
        if (keypoints[15].score > 0.2 && keypoints[16].score > 0.2) {
            let leftAnkle = keypoints[15];
            let rightAnkle = keypoints[16];

            // Check if the left ankle is above the left knee
            if (leftAnkle.position.y < keypoints[13].position.y) {
                curlCounter++;
            }

            // Check if the right ankle is above the right knee
            if (rightAnkle.position.y < keypoints[14].position.y) {
                curlCounter++;
            }
        }
    }
    updateCounters();
    return curlCounter;
}

function calculateAnglesForThroatRelativeToHead() {
    if (poses.length > 0) {
        for (let i = 0; i < poses.length; i++) {
            let keypoints = poses[i].pose.keypoints;

            // Check if keypoints for nose, right shoulder, and left shoulder are detected
            if (
                keypoints[0].score > 0.2 && // Nose
                keypoints[6].score > 0.2 && // Right shoulder
                keypoints[5].score > 0.2   // Left shoulder
            ) {
                // Calculate throat position relative to the head
                let throatX = (keypoints[0].position.x + keypoints[6].position.x + keypoints[5].position.x) / 3;
                let throatY = (keypoints[0].position.y + keypoints[6].position.y + keypoints[5].position.y) / 3;

                // Calculate angle between throat and shoulders
                let angle = calculateAngle(
                    { x: keypoints[6].position.x, y: keypoints[6].position.y }, // Right shoulder
                    { x: throatX, y: throatY }, // Throat
                    { x: keypoints[5].position.x, y: keypoints[5].position.y } // Left shoulder
                );

                // Store angle in angleData
                angleData['throat'] = angle;
            }
        }
    }
}