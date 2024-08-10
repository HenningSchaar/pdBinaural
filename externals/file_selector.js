inlets = 1;
outlets = 2;

let filename_left;
let filename_right;

function list() {

    const yaw = arguments[0];
    const pitch = arguments[1];
    const condition = arguments[2];
    const idx = arguments[3];

    filename_left = 'r' + idx + '-c' + condition + '-left-array-' + yaw + '-' + pitch;
    filename_right = 'r' + idx + '-c' + condition +  '-right-array-' + yaw + '-' + pitch;
}

function bang() {
    outlet(0, ['set', filename_left]);
    outlet(1, ['set', filename_right]);
}