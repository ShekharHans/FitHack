let defaultStrokeColor;
let defaultFillColor;

function triggerFeedback(key) {
    // Store the current stroke and fill colors
    defaultStrokeColor = getStroke();
    defaultFillColor = getFill();

    // Visual feedback
    // Change the color of the keypoints and the lines connecting them to red
    let keypoints = poses[0].pose.keypoints;
    let skeleton = poses[0].skeleton;

    // Change the color of the keypoints to red
    fill(255, 0, 0); // Red fill color
    noStroke(); // Remove stroke for keypoints
    for (let j = 0; j < keypoints.length; j++) {
        if (keypoints[j].part === key) {
            ellipse(keypoints[j].position.x, keypoints[j].position.y, 10, 10); // Red keypoints
        }
    }

    // Change the color of the lines to red
    stroke(255, 0, 0); // Red stroke color
    for (let j = 0; j < skeleton.length; j++) {
        let partA = skeleton[j][0];
        let partB = skeleton[j][1];
        if (partA.part === key || partB.part === key) {
            line(
                partA.position.x,
                partA.position.y,
                partB.position.x,
                partB.position.y
            );
        }
    }

    // Restore the default stroke and fill colors after a delay
    setTimeout(() => {
        stroke(defaultStrokeColor);
        fill(defaultFillColor);
    }, 1000); // Adjust the delay time as needed

    // Audio feedback

    // Play audio feedback based on the keypoint
    if (audioFiles.hasOwnProperty(key)) {
        playAudio(audioFiles[key]);
    } else {
        // Play a default audio file
        playDefaultAudio();
    }
}

// Placeholder functions to get current stroke and fill colors
function getStroke() {
    return color(0, 255, 0); // Green stroke color
}

function getFill() {
    return color(0, 255, 0); // Green fill color
}