let is_going_at_left = true;
let limit_left = 0;
let limit_right = 520;

let current_selected_icon = 0;

let selected_stats_menu = 0;
let food_stat = 4;
let fun_stat = 4;
let discipline = 100;



let selected_food = 0;



let age_display = 0;
let weight = 0;


let menu = Array();
menu[0] = "menu_food"
menu[1] = "menu_stats"
menu[2] = "menu_play"
menu[3] = "menu_toilet"
menu[4] = "menu_med"
menu[5] = "menu_sleep"
menu[6] = "menu_scold"
menu[7] = "menu_attention"


//main menu action is 8
//animation action is 9
let current_action = 8;

let is_light_on = true;


let is_moving = true;
function wander(){
    if(is_moving){
        setInterval(() => {
            movePet();
        }, 1000);
    }
}

function initPosition(){
    let pet = document.querySelector(".pet")
    pet.style.left = "260px"
    is_going_at_left = true;
}

function movePet(){
    let pet = document.querySelector(".pet")
    let num_values = (pet.style.left).replace("px","");
    num_values = parseInt(num_values);

    
    if(is_going_at_left){
        
        
        if(num_values > limit_left){
            num_values -= 10;
            pet.style.left = num_values + "px";
        }else{
            is_going_at_left = false;
            pet.classList.remove("left");
            pet.classList.add("right");
        }

    }else{
        
        if(num_values < limit_right){
            num_values += 10;
            pet.style.left = num_values + "px";
        }else{
            is_going_at_left = true;
            pet.classList.remove("right");
            pet.classList.add("left");
        }
    }

}

function currentTime() {
    let date = new Date(); /* creating object of Date class */
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    document.querySelector(".clock").innerText = hour + " : " + min ; /* adding time to the div */
    let t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}
  
function updateTime(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

function switchMainMenu(){
    let unselect = document.querySelector( "."+menu[current_selected_icon] );
    unselect.classList.remove("selected_icon");
    unselect.classList.add("unselected_icon");

    current_selected_icon++;
    if(current_selected_icon==7) current_selected_icon = 0;

    let select = document.querySelector( "."+menu[current_selected_icon] );
    select.classList.remove("unselected_icon");
    select.classList.add("selected_icon");

}

function openFoodMenu(){
    let menu = document.querySelector(".food_display");
    selected_food = 0;
    updateFoodArrow();
    menu.style.display = "block";
}

function changeSelectedFood(){
    selected_food++;
    if(selected_food ==2) selected_food=0;
}

function updateFoodArrow(){
    let arrow = document.querySelector(".food_menu_arrow");
    if(selected_food == 0){
        arrow.style.left = "200px"
    }

    if(selected_food == 1){
        arrow.style.left = "540px"
    }
}

function closeFoodMenu(){
    let menu = document.querySelector(".food_display");
    menu.style.display = "none";

    selectMenu(0)
    unselectMenu(1);
    unselectMenu(2);
    unselectMenu(3);
}

function openStatsMenu(){
    let menu = document.querySelector(".stats_display");
    menu.style.display = "block";
    selected_stats_menu = 0;

    selectMenu(0)
    unselectMenu(1);
    unselectMenu(2);
    unselectMenu(3);
}

function closeStatsMenu(){
    let menu = document.querySelector(".stats_display");
    menu.style.display = "none";
    selected_stats_menu = 0;
}

function changeStatsMenu(){


    let prev_selected = selected_stats_menu;
    selected_stats_menu++;
    if(selected_stats_menu == 4) selected_stats_menu = 0;


    unselectMenu(prev_selected);
    selectMenu(selected_stats_menu);

}

function selectMenu(to_select){
    let menu_list = Array();
    menu_list[0] = "stats_inner_front"
    menu_list[1] = "stats_inner_hunger"
    menu_list[2] = "stats_inner_happiness"
    menu_list[3] = "stats_inner_discipline"

    let select = document.querySelector( "."+menu_list[to_select] );
    select.classList.remove("unselected_stats_menu");
    select.classList.add("selected_stats_menu");
}

function unselectMenu(to_unselect){
    let menu_list = Array();
    menu_list[0] = "stats_inner_front"
    menu_list[1] = "stats_inner_hunger"
    menu_list[2] = "stats_inner_happiness"
    menu_list[3] = "stats_inner_discipline"

    let unselect = document.querySelector( "."+menu_list[to_unselect] );
    unselect.classList.remove("selected_stats_menu");
    unselect.classList.add("unselected_stats_menu");

}

function confirmFoodMenu(){

    if(selected_food == 0){
        displayAnimation(1);

    }
    if(selected_food == 1){
        displayAnimation(2);

    }

}



function pressA(){
    if(current_action == 8){
        switchMainMenu();
    }

    //food
    if(current_action ==0){
        changeSelectedFood();
        updateFoodArrow();
    }

    //check status
    if(current_action ==1){
        changeStatsMenu();
    }

}


function displayAnimation(anim_index){
    let anim_array = Array();
    anim_array[0] = "blank_screen";
    anim_array[1] = "eat_meal";
    anim_array[2] = "eat_snack";
    anim_array[3] = "success";
    anim_array[4] = "fail";
    anim_array[5] = "refuse";
    anim_array[6] = "thrash";
    anim_array[7] = "vaccine";

    current_action = 9;

    let menu = document.querySelector(".animation_display");
    let image = menu.querySelector("img");
    menu.style.display = "block";
    console.log("./images/animations/"+ anim_array[anim_index] + ".png")
    image.src = "./images/animations/"+ anim_array[anim_index] + ".png";    

}

function closeAnimation(){
    let menu = document.querySelector(".animation_display");
    menu.style.display = "none";
    current_action = 8;
}

function pressB(){
    if(current_action == 8){
        just_selected = true;
        if(current_selected_icon == 0){
            current_action = 0;
            openFoodMenu();
        }
        if(current_selected_icon == 1){
            current_action = 1;
            openStatsMenu();
        }

        setInterval(() => {
            just_selected = false;
        }, 500);
    }

    
    if(current_action == 0 && !just_selected){
        closeFoodMenu();
        confirmFoodMenu();
    }

    

}

function pressC(){
    if(current_action == 0){
        current_action = 8;
        closeFoodMenu();
    }
    if(current_action == 1){
        current_action = 8;
        closeStatsMenu();
    }

    if(current_action == 9){
        current_action = 8;
        closeAnimation();

    }
}

function start(){
    currentTime();
    initPosition();
    wander();
}

start();