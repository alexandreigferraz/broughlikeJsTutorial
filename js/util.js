function tryTo(description, callback) {
    for(let timeout = 1000; timeout > 0; timeout--) {
        if (callback()) {
            return;
        }
    };
    // MDN: The throw statement throws a user-defined exception. Execution of the current function will stop (the statements after throw won't be executed), and control will be passed to the first catch block in the call stack
    throw 'Timeout while trying to ' + description;
};

// returns a random number within 'min' and 'max' parameters
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// return the array entered as a parameter after shuffling it
function shuffle(arr) {
    let temp, r;
    for (let i = 1; i < arr.length; i++) {
        r = randomRange(0, i);
        temp = arr[i];
        arr[i] = arr[r];
        arr[r] = temp;
    }
    return arr;
};