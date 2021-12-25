/*

Code copied from @monolesan's realless and edited a little
https://realless.glitch.me/

*/

const euclidean_dist = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

const eyesClosed = (facial_keypoints) => {
    leftEye_t = 386;
    leftEye_b = 374;
    leftEye_r = 362;
    leftEye_l = 263;

    rightEye_t = 159;
    rightEye_b = 145;
    rightEye_r = 33;
    rightEye_l = 133;

    aL = euclidean_dist(
        facial_keypoints[leftEye_t][0],
        facial_keypoints[leftEye_t][1],
        facial_keypoints[leftEye_b][0],
        facial_keypoints[leftEye_b][1]
    );
    bL = euclidean_dist(
        facial_keypoints[leftEye_l][0],
        facial_keypoints[leftEye_l][1],
        facial_keypoints[leftEye_r][0],
        facial_keypoints[leftEye_r][1]
    );


    earLeft = aL / (2 * bL);

    aR = euclidean_dist(
        facial_keypoints[rightEye_t][0],
        facial_keypoints[rightEye_t][1],
        facial_keypoints[rightEye_b][0],
        facial_keypoints[rightEye_b][1]
    );
    bR = euclidean_dist(
        facial_keypoints[rightEye_l][0],
        facial_keypoints[rightEye_l][1],
        facial_keypoints[rightEye_r][0],
        facial_keypoints[rightEye_r][1]
    );
    earRight = aR / (2 * bR);

    if (earLeft < 0.1 && earRight < 0.1) {
        return true;
    } else {
        return false;
    }
}