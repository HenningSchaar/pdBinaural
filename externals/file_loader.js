inlets = 2;
outlets = 3;

let folder = '../resources/convolved';
let idx = 0;
let conditions = 1;

let yaw_range = 0;
let yaw_resolution = 1;
let pitch_range = 0;
let pitch_resolution = 1;

function list() {
    
    if (inlet == 0) {
        idx = arguments[5]
        conditions = arguments[4]

        yaw_range = arguments[0];
        yaw_resolution = arguments[1]
        pitch_range = arguments[2]
        pitch_resolution = arguments[3];

        // avoid zeros for loop
        if (yaw_resolution === 0) {yaw_resolution = 1}
        if (pitch_resolution === 0) {pitch_resolution = 1}
        if (conditions === 0) {conditions = 1}
    }

    if (inlet == 1) {
        folder = Array.from(arguments).join(" ");
        post('Folder path updated to "' + folder + '"');
    }
}

function bang() {
     
    // create and fill file container
     outlet(2, 'clear');
     let pos_x = 100.0;
     let pos_y = 40.0;

     for(c = 1; c <= conditions; c += 1) {
        for (i = -yaw_range; i <= yaw_range; i += yaw_resolution) {
            for (j = -pitch_range; j <= pitch_range; j += pitch_resolution) {
                const array_left = 'r' + idx + '-c' + c + '-left-array-' + i + '-' + j;
                const array_right = 'r' + idx + '-c' + c +  '-right-array-' + i + '-' + j;

                const spawn_left = ['obj', pos_x, pos_y, 'array', 'define', array_left];
                const spawn_right = ['obj', pos_x, pos_y + 22.0, 'array', 'define', array_right];

                outlet(2, spawn_left);
                outlet(2, spawn_right);
                
                const path_left = folder + '/convolved_R' + idx + '_C' + c + '_' + i + 'azim_' + j + 'elev_left.wav';
                const path_right = folder + '/convolved_R' + idx + '_C' + c + '_' + i + 'azim_' + j + 'elev_right.wav';
                const read_left = ['read', '-resize', path_left, array_left];
                const read_right = ['read', '-resize', path_right, array_right];

                outlet(1, read_left);
                outlet(1, read_right);
                pos_y += 60.0;
            }
            pos_y = 40.0;
            pos_x += 280.0;
        }
        outlet(0, 'bang');
    }

    post('\nfiles loaded with .. ')
    post('\nconditions: ' + conditions + '\nyaw range (bipolar): ' + yaw_range + '\nyaw resolution: ' + yaw_resolution + '\npitch range (bipolar): ' + pitch_range + '\npitch resolution: ' + pitch_resolution + '\n\n');
}