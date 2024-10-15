const button_1 = document.getElementById("button_1");
const button_2 = document.getElementById("button_2");
const button_3 = document.getElementById("button_3");
const button_4 = document.getElementById("button_4");
const button_5 = document.getElementById("button_5");
const button_6 = document.getElementById("button_6");
const button_7 = document.getElementById("button_7");
const button_8 = document.getElementById("button_8");
const button_9 = document.getElementById("button_9");

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

function check_for_winner() {
    return (button_1.value === button_2.value && button_2.value === button_3.value) ||
        (button_4.value === button_5.value && button_5.value === button_6.value) ||
        (button_7.value === button_8.value && button_8.value === button_9.value) ||
        (button_1.value === button_4.value && button_4.value === button_7.value) ||
        (button_2.value === button_5.value && button_5.value === button_8.value) ||
        (button_3.value === button_6.value && button_6.value === button_9.value) ||
        (button_1.value === button_5.value && button_5.value === button_9.value) ||
        (button_7.value === button_5.value && button_5.value === button_3.value)
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
    if (check_for_winner()) {
        for (const button of button_list) {
            button.disabled = true;
        }
        finishing_popup("You Win !");
    }
    else if (button_1.disabled && button_3.disabled && button_3.disabled &&
        button_4.disabled && button_5.disabled && button_6.disabled &&
        button_7.disabled && button_8.disabled && button_9.disabled){
        finishing_popup("Draw!");
    }
    else {
        stupid_robot();
    }
}

function stupid_robot() {
    let is_available = true;
    function action_performer(button) {
        button.innerText = robot_symbol;
        button.disabled = true;
        button.value = robot_symbol;
    }
    for (const running_symbol of [robot_symbol, user_symbol]) {
        if (button_1.value === button_2.value && !button_3.disabled && button_1.value === running_symbol) {
            action_performer(button_3);
        }
        else if (button_2.value === button_3.value && !button_1.disabled && button_2.value === running_symbol) {
            action_performer(button_1);
        }
        else if (button_1.value === button_3.value && !button_2.disabled && button_1.value === running_symbol) {
            action_performer(button_2);
        }
        else if (button_4.value === button_5.value && !button_6.disabled && button_4.value === running_symbol) {
            action_performer(button_6);
        }
        else if (button_5.value === button_6.value && !button_4.disabled && button_5.value === running_symbol) {
            action_performer(button_4);
        }
        else if (button_4.value === button_6.value && !button_5.disabled && button_4.value === running_symbol) {
            action_performer(button_5);
        }
        else if (button_7.value === button_8.value && !button_9.disabled && button_7.value === running_symbol) {
            action_performer(button_9);
        }
        else if (button_8.value === button_9.value && !button_7.disabled && button_8.value === running_symbol) {
            action_performer(button_7);
        }
        else if (button_7.value === button_9.value && !button_8.disabled && button_7.value === running_symbol) {
            action_performer(button_8);
        }
        else if (button_1.value === button_4.value && !button_7.disabled && button_1.value === running_symbol) {
            action_performer(button_7);
        }
        else if (button_4.value === button_7.value && !button_1.disabled && button_4.value === running_symbol) {
            action_performer(button_1);
        }
        else if (button_1.value === button_7.value && !button_4.disabled && button_1.value === running_symbol) {
            action_performer(button_4);
        }
        else if (button_2.value === button_5.value && !button_8.disabled && button_2.value === running_symbol) {
            action_performer(button_8);
        }
        else if (button_5.value === button_8.value && !button_2.disabled && button_5.value === running_symbol) {
            action_performer(button_2);
        }
        else if (button_2.value === button_8.value && !button_5.disabled && button_2.value === running_symbol) {
            action_performer(button_5);
        }
        else if (button_3.value === button_6.value && !button_9.disabled && button_3.value === running_symbol) {
            action_performer(button_9);
        }
        else if (button_6.value === button_9.value && !button_3.disabled && button_6.value === running_symbol) {
            action_performer(button_3);
        }
        else if (button_3.value === button_9.value && !button_6.disabled && button_3.value === running_symbol) {
            action_performer(button_6);
        }
        else if (button_1.value === button_5.value && !button_9.disabled && button_1.value === running_symbol) {
            action_performer(button_9);
        }
        else if (button_5.value === button_9.value && !button_1.disabled && button_5.value === running_symbol) {
            action_performer(button_1);
        }
        else if (button_1.value === button_9.value && !button_5.disabled && button_1.value === running_symbol) {
            action_performer(button_5);
        }
        else if (button_7.value === button_5.value && !button_3.disabled && button_7.value === running_symbol) {
            action_performer(button_3);
        }
        else if (button_5.value === button_3.value && !button_7.disabled && button_5.value === running_symbol) {
            action_performer(button_7);
        }
        else if (button_3.value === button_7.value && !button_5.disabled && button_3.value === running_symbol) {
            action_performer(button_5);
        }
        else if (running_symbol === user_symbol) {
            while (is_available) {
                let randomizer = Math.floor(Math.random() * 9);
                if (!button_list[randomizer].disabled) {
                    {
                        button_list[randomizer].innerText = robot_symbol;
                        button_list[randomizer].disabled = true;
                        button_list[randomizer].value = robot_symbol;
                        is_available = false;
                    }
                }
            }
        }
    }
    if (check_for_winner()) {
        for (const button of button_list) {
            button.disabled = true;
        }
        finishing_popup("Robot Wins !");
    }
}

button_1.onclick = function() {
    game_button_performance(this)
};

button_2.onclick = function() {
    game_button_performance(this)
};

button_3.onclick = function() {
    game_button_performance(this)
};

button_4.onclick = function() {
    game_button_performance(this)
};

button_5.onclick = function() {
    game_button_performance(this)
};

button_6.onclick = function() {
    game_button_performance(this)
};

button_7.onclick = function() {
    game_button_performance(this)
};

button_8.onclick = function() {
    game_button_performance(this)
};

button_9.onclick = function() {
    game_button_performance(this)
};
