/*                Promise Wait                  */

const wait = (ms) => {
    return new Promise(resolve => 
        setTimeout(resolve, ms)
    );
};

/*                  Camera                     */

const startCameraStream = (qs) => {
    qs = qs || "#camera";
    let camera = document.querySelector();

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                camera.srcObject = stream;
            })
            .catch((error) => {
                console.log("Something went wrong!\n", error);
            });
    }
}

const endCameraStream = (qs) => {
    qs = qs || "#camera";
    let camera = document.querySelector()
    
    let stream = camera.srcObject;
    let tracks = stream.getTracks();
    
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }
    
    camera.srcObject = null;
}


/*          Load facial landmarks model          */

const loadModel = async () => {
    model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
}