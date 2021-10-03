const startCameraStream = () => {
    let camera = document.querySelector("#camera")

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                camera.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
}
startCameraStream();


const endCameraStream = () => {
    let camera = document.querySelector("#camera")

    let stream = camera.srcObject;
    let tracks = stream.getTracks();

    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }

    camera.srcObject = null;
}

/* TF.js face landmarks model */

var model;
const initModel = async () => {
    model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
}
initModel();

/*

Code copied from @monolesan
https://realless.glitch.me/

*/
const eyeClosed = (keypoints) => {
    leftEye_t = 386;
    leftEye_b = 374;
    leftEye_r = 362;
    leftEye_l = 263;

    rightEye_t = 159;
    rightEye_b = 145;
    rightEye_r = 33;
    rightEye_l = 133;

    aL = euclidean_dist(
        keypoints[leftEye_t][0],
        keypoints[leftEye_t][1],
        keypoints[leftEye_b][0],
        keypoints[leftEye_b][1]
    );
    bL = euclidean_dist(
        keypoints[leftEye_l][0],
        keypoints[leftEye_l][1],
        keypoints[leftEye_r][0],
        keypoints[leftEye_r][1]
    );


    earLeft = aL / (2 * bL);

    aR = euclidean_dist(
        keypoints[rightEye_t][0],
        keypoints[rightEye_t][1],
        keypoints[rightEye_b][0],
        keypoints[rightEye_b][1]
    );
    bR = euclidean_dist(
        keypoints[rightEye_l][0],
        keypoints[rightEye_l][1],
        keypoints[rightEye_r][0],
        keypoints[rightEye_r][1]
    );
    earRight = aR / (2 * bR);

    // console.log("-----> " + earLeft + "\t" + earRight);

    if (earLeft < 0.1 && earRight < 0.1) {
        return true;
    } else {
        return false;
    }
}

const euclidean_dist = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/* let the show begin */

let counter = 0;

const blinked = () => {
    console.log("*blink*")

    counter = !counter;
    vid = document.querySelector("#vid");

    if(counter){
        vid.play();
    }else{
        vid.pause();
    }
}

const init = async () => {

    var previousEyeState = false;

    while(true){
        let facialLandmarks = await model.estimateFaces({
            input: document.querySelector("#camera")
        });

        if(facialLandmarks.length > 0){
            var currentEyeState = eyeClosed(facialLandmarks[0].mesh);
        }

        if(currentEyeState != previousEyeState){
            blinked();
        }

        previousEyeState = currentEyeState;
    
        // await (new Promise(resolve => setTimeout(resolve, 10)))
    }
}

setTimeout(init, 5000)



