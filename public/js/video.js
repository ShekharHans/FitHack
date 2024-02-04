const getWebcamStream = () => {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
            // Use createCapture to create a p5.js video element
            const video = createCapture(VIDEO);

            // Assign the stream to the video element
            video.elt.srcObject = stream;

            // Play the video
            video.elt.play();

            // Optionally, you can position the video or set its size
            video.size(640, 480);
            video.position(0, 0);

            // Append the video element to the DOM
            document.body.appendChild(video.elt);
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });
};


const closeVideo = () => {
    // var video = document.getElementById("my_video");
    var stream = video.srcObject;

    if (stream) {
        var tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
    }

    video.style.display = "none"; // hide the video
    close.style.display = "none"; // hide the close video
    record.style.display = "none"; // Hide the record button
};