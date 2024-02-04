let video;
let poses = [];
let angleData = {};
let poseNet;
let isPoseDetectionActive = false;

// Function to handle pose detection
const useModelPose = () => {
  isPoseDetectionActive = true;
  poseNet = ml5.poseNet(video, modelLoaded);

  poseNet.on("pose", (results) => {
    handlePoseResults(results);
  });

  function modelLoaded() {
    console.log("Model Loaded!");
  }
};

function handlePoseResults(results) {
  poses = results;
  if (poses.length > 0) {
      calculateAngles();
      fillNobleKeypointsData();
      compareWithNobleKeypoints();
      drawHead();

    // const keysToCheck1 = ["leftElbow", "rightElbow"]; // Add specific keys here
    // const keysToCheck2 = ["leftShoulder", "rightShoulder"]; // Add specific keys here
    // const keysToCheck3 = ["leftHip", "rightHip"]; // Add specific keys here
    // compareWithNobleKeypoints(keysToCheck1);
    // compareWithNobleKeypoints(keysToCheck2);
    // compareWithNobleKeypoints(keysToCheck3);
  }
}

// Function to set up video and pose detection
function setup() {
  let canvasContainer = select("#video-container");
  let canvas = createCanvas(640, 480);

  canvas.parent(canvasContainer);
  // createCanvas(840, 680);
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.size(840, 680);
  video.hide();
  // useModelPose();
}

// Function to draw skeleton lines and keypoints
function draw() {
  image(video, 0, 0, width, height);
  // background(255);
  drawAnimatedSkeletons();
  // drawHead();
}

function startCanvas() {
  if (!isPoseDetectionActive) {
    useModelPose();
    isPoseDetectionActive = true;
  }

  video.play();
}

function stopCanvas() {
  if (isPoseDetectionActive) {
    console.log("Stopping canvas");
    isPoseDetectionActive = false;
  }

  // Stop poseNet
  if (poseNet) {
    poseNet.removeAllListeners(); // Remove all listeners
    poseNet = null; // Release poseNet
  }

  // Clear poses
  poses = [];

  // Clear angleData
  angleData = {};

  // Clear canvas;
  clear();
}

function refreshCanvas() {
  console.log("refreshing canvas");

  // Refresh the page
  window.location.reload();
}

function stopCanvas() {
  if (isPoseDetectionActive) {
    console.log("Stopping canvas");
    isPoseDetectionActive = false;
  }

  // Stop poseNet
  if (poseNet) {
    poseNet.removeAllListeners(); // Remove all listeners
    poseNet = null; // Release poseNet
  }

  // Clear poses
  poses = [];

  // Clear angleData
  angleData = {};

  // Clear canvas
  clear();

  // Close video with a delay
  setTimeout(function () {
    // Replace 'video' with your actual video element ID or selector
    var videoElement = document.getElementById("video");
    if (videoElement) {
      videoElement.pause(); // Pause the video
      videoElement.src = ""; // Clear the video source
      videoElement.load(); // Reload the video
    }
  }, 20000); // Adjust the delay time (in milliseconds) as needed
}

// Speech recognition for voice commands
const recognition = new (webkitSpeechRecognition || SpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = true; // Set to true to get interim results
recognition.maxAlternatives = 1;

// Function to handle speech recognition
recognition.onresult = function (event) {
  let interimTranscript = "";

  // Iterate through interim results
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript.toLowerCase();
    interimTranscript += transcript + " ";
    console.log("Interim Transcript:", transcript);
    console.log(event.results.length);

    // Example: Trigger actions based on specific phrases
    if (transcript.includes("start model")) {
      startCanvas();
    } else if (transcript.includes("close model")) {
      stopCanvas();
    }
  }
};

// Handle speechend event
recognition.onspeechend = function () {
  recognition.stop();
  // Restart recognition after a short delay
  setTimeout(function () {
    recognition.start();
  }, 2000); // Adjust the delay as needed
};
