let nobleKeypointsData = {};


// Function to draw animated skeletons and angles
function drawAnimatedSkeletons() {
    if (poses.length > 0) {
        for (let i = 0; i < poses.length; i++) {
            let keypoints = poses[i].pose.keypoints;
            let skeleton = poses[i].skeleton;

            // Draw skeleton lines
            for (let j = 0; j < skeleton.length; j++) {
                let partA = skeleton[j][0];
                let partB = skeleton[j][1];
                if (partA.score > 0.2 && partB.score > 0.2) {
                    if (
                        isKeypointInNobleRange(partA.part) &&
                        isKeypointInNobleRange(partB.part)
                    ) {
                        stroke(0, 255, 0); // Green for inside range
                    } else {
                        // stroke(255, 0, 0); // Red for outside range
                    }
                    strokeWeight(2);
                    line(
                        partA.position.x,
                        partA.position.y,
                        partB.position.x,
                        partB.position.y
                    );
                }
            }

            // Draw keypoints
            for (let j = 0; j < keypoints.length; j++) {
                let keypoint = keypoints[j];
                if (keypoint.score > 0.2) {
                    fill(0, 255, 0); // Default green color for keypoints
                    // if (!isKeypointInNobleRange(keypoint.part)) {
                    //   fill(255, 0, 0); // Red for keypoints outside noble ranges
                    // }
                    ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
                }
            }

            // Draw angles
            for (let key in angleData) {
                let angle = angleData[key];
                fill(0);
                textSize(12);
                textAlign(CENTER, CENTER);
                // text(
                //     `${key}: ${angle.toFixed(2)}°`,
                //     keypoints.find((k) => k.part === key).position.x,
                //     keypoints.find((k) => k.part === key).position.y - 10
                // );
            }
        }
    }
}

function drawHead() {
    if (poses.length > 0) {
        for (let i = 0; i < poses.length; i++) {
            let keypoints = poses[i].pose.keypoints;

            // Get nose keypoints directly
            let noseX = keypoints[0].position.x;
            let noseY = keypoints[0].position.y;

            // Draw head points at the nose position
            fill(255, 165, 0); // Orange color for head points
            ellipse(noseX, noseY, 10, 10);

            // Calculate the middle point between the right and left shoulders
            let shoulderMidX =
                (keypoints[5].position.x + keypoints[6].position.x) / 2;
            let shoulderMidY =
                (keypoints[5].position.y + keypoints[6].position.y) / 2;

            // Draw a line from the nose position to the middle of the shoulders
            stroke(255, 165, 0); // Orange color for the line
            line(noseX, noseY, shoulderMidX, shoulderMidY);

            // Declare and store the throat point
            let throatX = (noseX + shoulderMidX) / 2;
            let throatY = (noseY + shoulderMidY) / 2;

            // Draw lines from shoulders to the throat
            stroke(255, 165, 0); // Orange color for the lines
            line(keypoints[5].position.x, keypoints[5].position.y, throatX, throatY);
            line(keypoints[6].position.x, keypoints[6].position.y, throatX, throatY);

            // Draw throat points
            fill(0, 0, 255); // Orange color for head points
            ellipse(throatX, throatY, 10, 10);
        }
    }
}