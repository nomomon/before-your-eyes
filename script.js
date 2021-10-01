const startCameraStream = () => {
    let video = document.querySelector("#video")
    
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
}

const endCameraStream = () => {
    let video = document.querySelector("#video")

    let stream = video.srcObject;
    let tracks = stream.getTracks();

    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }

    video.srcObject = null;
}

/* TF.js */

var model;
const initModel = () =>{
    model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
}
initModel();