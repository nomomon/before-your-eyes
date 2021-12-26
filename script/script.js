const blink = () =>{
    console.log("blink");
};

const init = async () => {
    var previousEyesOpen = false;

    while(true){
        let facialLandmarks = await model.estimateFaces({
            input: document.querySelector("#camera")
        });

        // face found
        if(facialLandmarks.length > 0){
            var currentEyesOpen = eyesClosed(facialLandmarks[0].mesh);

            if(previousEyesOpen && !currentEyesOpen){
                blink();
            }    

            previousEyesOpen = currentEyesOpen;

            await wait(10);
        }
    }
}

startCameraStream();

var model;

loadModel().then(init);