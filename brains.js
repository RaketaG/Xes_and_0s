const button_list = document.querySelectorAll(".game_button")

const x_button = document.getElementById("x_button");
const o_button = document.getElementById("o_button");
const restart_button = document.getElementById("restart_button");

const popup_section = document.querySelector(".popup");
const popup_text = document.querySelector(".popup_text");
const new_game_button = document.querySelector(".popup_button");

let user_symbol = "X";
let robot_symbol = "0";
x_button.disabled = true;

const button_matrix_generator = (rows, columns) => {
    const button_matrix = [];
    let counter = 0;
    for (let i = 0; i < rows; i++) {
        const inner_matrix = []
        for (let j = 0; j < columns; j++) {
            inner_matrix.push(button_list[counter]);
            counter++
        }
        button_matrix.push(inner_matrix);
    }
    return button_matrix;
}

const button_matrix = button_matrix_generator(3, 3)

const check_for_winner = (in_a_row) => {

    let counter;
    for (let i = 0; i < button_matrix.length; i++) {
        counter = 1;
        for (let j = 1; j < button_matrix.length; j++) {
            if (button_matrix[i][j].value === button_matrix[i][j - 1].value &&
                button_matrix[i][j].length !== 1) {
                counter++;
                if (counter === in_a_row) return true;
            } else {
                counter = 1;
            }
        }
    }

    for (let i = 0; i < button_matrix[0].length; i++) {
        counter = 1;
        for (let j = 1; j < button_matrix.length; j++) {
            if (button_matrix[j][i].value === button_matrix[j - 1][i].value &&
                button_matrix[j][i].length !== 1) {
                counter++;
                if (counter === in_a_row) return true;
            } else {
                counter = 1;
            }
        }
    }

    for (let i = 0; i < button_matrix.length; i++) {
        for (let j = 0; j < button_matrix[i].length; j++) {
            if (i + in_a_row - 1 < button_matrix.length && j + in_a_row - 1 < button_matrix[i].length) {
                counter = 1;
                for (let k = 1; k < in_a_row; k++) {
                    if (button_matrix[i + k][j + k].value === button_matrix[i][j].value &&
                        button_matrix[i + k][j + k].length !== 1) {
                        counter++;
                        if (counter === in_a_row) return true;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    for (let i = 0; i < button_matrix.length; i++) {
        for (let j = button_matrix[i].length - 1; j >= 0; j--) {
            if (i + in_a_row - 1 < button_matrix.length && j - in_a_row + 1 >= 0) {
                counter = 1;
                for (let k = 1; k < in_a_row; k++) {
                    if (button_matrix[i + k][j - k].value === button_matrix[i][j].value &&
                        button_matrix[i + k][j - k].length !== 1) {
                        counter++;
                        if (counter === in_a_row) return true;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    return false;
}

x_button.onclick = function () {
    user_symbol = "X";
    robot_symbol = "0";
    this.disabled = true;
    o_button.disabled = false;
}

o_button.onclick = function () {
    user_symbol = "0";
    robot_symbol = "X";
    this.disabled = true;
    x_button.disabled = false;
}

restart_button.onclick = re_start;

new_game_button.onclick = function() {
    popup_section.style.display = "none";
    re_start();
}

function re_start() {
    user_symbol = "X";
    robot_symbol = "0";
    for (const button of button_list) {
        button.innerText = "";
        button.disabled = false;
        button.value = button.id;
    }
    x_button.disabled = true;
    o_button.disabled = false;
}

function finishing_popup(display_text) {
    popup_section.style.display = "flex";
    popup_text.innerText = display_text;
}

function game_button_performance(button) {
    x_button.disabled = true;
    o_button.disabled = true;
    button.innerText = user_symbol;
    button.disabled = true;
    button.value = user_symbol;
    if (check_for_winner(3)) {
        for (const button of button_list) {
            button.disabled = true;
        }
        finishing_popup("You Win !");
    }
    else if ([...button_list].every(button => button.disabled)){
        finishing_popup("Draw!");
    }
    else {
        stupid_robot(3);
    }
}

function stupid_robot(in_a_row) {

    let found = false;
    const action_performer = (i, j) => {
        button_matrix[i][j].innerText = robot_symbol;
        button_matrix[i][j].disabled = true;
        button_matrix[i][j].value = robot_symbol;
        found = true
    }

    for (const running_symbol of [robot_symbol, user_symbol]) {
        for (let i = 0; i < button_matrix.length; i++) {
            for (let j = 0; j < button_matrix.length; j++) {
                console.log(j + in_a_row - 1)
                if (j + in_a_row - 1 < button_matrix.length) {
                    if (button_matrix[i][j].value === button_matrix[i][j + 1].value &&
                        !button_matrix[i][j + in_a_row - 1].disabled) {
                        action_performer(i, j + in_a_row - 1);
                        break;
                    } else if (button_matrix[i][j].value === button_matrix[i][j + in_a_row - 1].value &&
                        !button_matrix[i][j + 1].disabled) {
                        action_performer(i, j + 1);
                        break;
                    } else if (button_matrix[i][j + in_a_row - 2].value === button_matrix[i][j + in_a_row - 1].value &&
                        !button_matrix[i][j].disabled) {
                        action_performer(i, j);
                        break;
                    }
                }
            }
        }
        if (found) break;
        for (let i = 0; i < button_matrix[0].length; i++) {
            for (let j = 0; j < button_matrix.length; j++) {
                if (j + in_a_row - 1 < button_matrix[0].length) {
                    if (button_matrix[j][i].value === button_matrix[j + 1][i].value &&
                        !button_matrix[j + in_a_row - 1][i].disabled) {
                        action_performer(j + in_a_row - 1, i);
                        break;
                    } else if (button_matrix[j][i].value === button_matrix[j + in_a_row - 1][i].value &&
                        !button_matrix[j + 1][i].disabled) {
                        action_performer(j + 1, i);
                        break;
                    } else if (button_matrix[j + in_a_row - 2][i].value === button_matrix[j + in_a_row - 1][i].value &&
                        !button_matrix[j - 1][i].disabled) {
                        action_performer(j, i);
                        break;
                    }
                }
            }
        }
        if (found) break;
        for (let i = 0; i < button_matrix.length; i++) {
            for (let j = 0; j < button_matrix[i].length; j++) {
                if (i + in_a_row - 1 < button_matrix.length && j + in_a_row - 1 < button_matrix[i].length) {
                    for (let k = 1; k < in_a_row; k++) {
                        if (button_matrix[i + k][j + k].value === button_matrix[i][j].value &&
                            !button_matrix[i + in_a_row - 1][j + in_a_row - 1].disabled) {
                            action_performer(i + in_a_row - 1, j + in_a_row - 1);
                            break;
                        }
                        else if (button_matrix[i][j].value === button_matrix[i + in_a_row - 1][j + in_a_row - 1].value &&
                            !button_matrix[i + k][j + k].disabled) {
                            action_performer(i + k, j + k);
                            break;
                        }
                        else if (button_matrix[i + in_a_row - 2][j + in_a_row - 2].value ===
                            button_matrix[i + in_a_row - 1][j + in_a_row - 1].value &&
                            !button_matrix[i][j].disabled) {
                            action_performer(i, j);
                            break;
                        }
                    }
                }
            }
        }
        if (found) break;
        for (let i = 0; i < button_matrix.length; i++) {
            for (let j = button_matrix[i].length - 1; j >= 0; j--) {
                if (i + in_a_row - 1 < button_matrix.length && j - in_a_row + 1 >= 0) {
                    for (let k = 1; k < in_a_row; k++) {
                        if (button_matrix[i + k][j - k].value === button_matrix[i][j].value &&
                            button_matrix[i + in_a_row][j - in_a_row].disabled) {
                            action_performer(i + in_a_row, j - in_a_row);
                            break;
                        }
                        else if (button_matrix[i][j].value === button_matrix[i + in_a_row - 1][j - in_a_row + 1].value &&
                            !button_matrix[i + k][j - k].disabled) {
                            action_performer(i + k, j - k);
                            break;
                        }
                        else if (button_matrix[i + in_a_row - 2][j - (in_a_row - 2)].value ===
                            button_matrix[i + in_a_row - 1][j - (in_a_row - 1)].value &&
                            !button_matrix[i][j].disabled) {
                            action_performer(i, j);
                            break;
                        }
                    }
                }
            }
        }
        if (!found && running_symbol === user_symbol) {
            while (!found) {
                let randomizer = Math.floor(Math.random() * 9);
                if (!button_list[randomizer].disabled) {
                    {
                        button_list[randomizer].innerText = robot_symbol;
                        button_list[randomizer].disabled = true;
                        button_list[randomizer].value = robot_symbol;
                        found = true;
                    }
                }
            }
        }
    }
    if (check_for_winner(3)) {
        for (const button of button_list) {
            button.disabled = true;
        }
        finishing_popup("Robot Wins !");
    }
}

button_matrix[0][0].onclick = function() {
    game_button_performance(this)
};

button_matrix[0][1].onclick = function() {
    game_button_performance(this)
};

button_matrix[0][2].onclick = function() {
    game_button_performance(this)
};

button_matrix[1][0].onclick = function() {
    game_button_performance(this)
};

button_matrix[1][1].onclick = function() {
    game_button_performance(this)
};

button_matrix[1][2].onclick = function() {
    game_button_performance(this)
};

button_matrix[2][0].onclick = function() {
    game_button_performance(this)
};

button_matrix[2][1].onclick = function() {
    game_button_performance(this)
};

button_matrix[2][2].onclick = function() {
    game_button_performance(this)
};
