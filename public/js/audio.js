let audio;
let isSoundPlaying = false;

// Define audio files for different keypoints or feedback types
const audioFiles = {
    leftElbow: "js/asset/elbow.mp3",
    rightElbow: "js/asset/elbow.mp3",
    leftShoulder: "js/asset/elbow.mp3",
    rightShoulder: "/jsasset/elbow.mp3",
    leftWrist: "js/asset/wrist.mp3",
    rightWrist: "js/asset/wrist.mp3",
    leftHip: "js/asset/hip.mp3",
    rightHip: "js/asset/hip.mp3",
    leftKnee: "js/asset/knee.mp3",
    rightKnee: "js/asset/knee.mp3",
    leftAnkle: "js/asset/ankle.mp3",
    rightAnkle: "js/asset/ankle.mp3"
    // Add more keypoints or feedback types as needed
};

// Function to play audio
function playAudio(audioFile) {
    // Check if audio is already playing
    if (!isSoundPlaying) {
        // Create a new audio element
        audio = new Audio(audioFile);

        // Set flag to true to indicate sound is playing
        isSoundPlaying = true;

        // Play the audio
        audio.play()
            .then(() => {
                // Audio playback started successfully
                // console.log('Audio playback started.');
            })
            .catch((error) => {
                // Audio playback failed
                console.error('Error playing audio:', error.message);
                isSoundPlaying = false; // Reset the flag
            });

        // After the audio duration, set flag to false to allow playing again
        audio.addEventListener("ended", () => {
            setTimeout(() => {
                isSoundPlaying = false;
            }, 5000); // 40 seconds in milliseconds
        });
    }
}

// Function to play default audio when keypoint-specific audio is not available
function playDefaultAudio() {
    // Play a default audio here if needed
    playWarningSound();
}

// Function to play a warning sound
function playWarningSound() {
    // Check if audio is already playing
    if (!isSoundPlaying) {
        // Create a new audio element
        audio = new Audio("./asset/Recording.wav"); // Update the file path to your audio file

        // Set flag to true to indicate sound is playing
        isSoundPlaying = true;

        // Play the audio
        audio.play()
            .then(() => {
                // Audio playback started successfully
                // console.log('Audio playback started.');
            })
            .catch((error) => {
                // Audio playback failed
                console.error('Error playing audio:', error.message);
                isSoundPlaying = false; // Reset the flag
            });

        // After 40 seconds, set flag to false to allow playing again
        setTimeout(() => {
            isSoundPlaying = false;
        }, 20000); // 40 seconds in milliseconds
    }
}

