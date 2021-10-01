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
const initModel = () => {
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

    console.log("-----> " + earLeft + "\t" + earRight);

    if (earLeft < 0.1 && earRight < 0.1) {
        return true;
    } else {
        return false;
    }
}

const euclidean_dist = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}