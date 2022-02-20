/*
 * Written by Mukuldeep Maiti
 * Date 19th Feb 2022
 */
function trigger(char){
    return new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        char : char,
        key : char,
    });
}
var curr_pointer=1;
var end_of_word=false;
var game_ended=false;
var curr_input=[];
var gss_wrd=get_next_word();
var submission_cnt=0;

/* does it sense! starts*/
const ran=(mn, mx)=> {return Math.random() * (mx - mn) + mn;}
const ran_index=(max_index)=>{return Math.floor(ran(1, max_index))-1;}
gss_wrd=next_value_word[ran_index(21)][1];
my_guessed_word=gss_wrd;
/* does it sense! ends*/
for(var i=0;i<5;i++){
    document.getElementById("d" + (curr_pointer+i)).innerHTML=gss_wrd[i];
}

function change_guess_word(word){
    my_guessed_word=word;
    gss_wrd=my_guessed_word;
    for(var i=0;i<5;i++){
        document.getElementById("d" + (curr_pointer+i)).innerHTML=gss_wrd[i];
    }
    document.getElementById("multiple_answer").innerHTML = "keep enjoying wordle!";
}
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }
    var keyPressed=event.key.toLowerCase();
    if(keyPressed==="escape"){
        location.reload();
    }
    //console.log(keyPressed);
    if(!game_ended) {
        if(keyPressed!='i') {
            document.getElementById("multiple_answer").innerHTML = "keep enjoying wordle!";
        }
        if (keyPressed === "enter") {
            if (end_of_word) {
                console.log(curr_input);
                submission_cnt++;
                var xxx=process_arr(curr_input);
                if(xxx<25 || submission_cnt>=5){
                    if(submission_cnt>=5)console.log("choose the common word among these",next_value_word);
                    window.dispatchEvent(trigger('i'));
                }
                // gss_wrd=get_next_word();
                // for(var i=0;i<5;i++){
                //     document.getElementById("d" + (curr_pointer+i)).innerHTML=gss_wrd[i];
                // }


                if (curr_pointer < 30) {
                    end_of_word = false;
                    curr_pointer++;
                } else {
                    game_ended = true;
                }
                if(!game_ended){
                    gss_wrd=get_next_word();
                    if(gss_wrd===""){
                        document.getElementById("multiple_answer").innerHTML = "Sorry! The word is not in our database or something went wrong!";
                    }else {
                        for (var i = 0; i < 5; i++) {
                            document.getElementById("d" + (curr_pointer + i)).innerHTML = gss_wrd[i];
                        }
                    }
                }

                curr_input = [];
            }
        } else if (keyPressed === "backspace") {
            if (curr_pointer % 5 != 1) {
                if (end_of_word) {
                    //document.getElementById("d" + curr_pointer).innerHTML = "";
                    end_of_word = false;
                } else {
                    curr_pointer--;
                }
                curr_input.pop();
            }
            document.getElementById("d" + curr_pointer).classList.remove("btn-correct");
            document.getElementById("d" + curr_pointer).classList.remove("btn-semi-correct");
            document.getElementById("d" + curr_pointer).classList.remove("btn-wrong");
        } else if (keyPressed === "a" || keyPressed === "s" || keyPressed === "d") {
            if (!end_of_word) {
                if (keyPressed === "a") {
                    document.getElementById("d" + curr_pointer).classList.add("btn-correct");
                    curr_input.push(1);
                } else if (keyPressed === "s") {
                    document.getElementById("d" + curr_pointer).classList.add("btn-semi-correct");
                    curr_input.push(2);
                } else if (keyPressed === "d") {
                    document.getElementById("d" + curr_pointer).classList.add("btn-wrong");
                    curr_input.push(0);
                }
                if (curr_pointer % 5 != 0) {
                    curr_pointer++;
                } else {
                    end_of_word = true;
                }
            }
        }else if(keyPressed==="i"){
            console.log("inside i pressed");
            var n_words=(next_value_word.length>50?50:next_value_word.length);
            var low_pad=document.getElementById("multiple_answer");
            var to_add="";
            to_add+="<div class='grid-row'>Choose from the below list, click to select</div><div class='grid-row'>";
            console.log("n_words:",n_words);
            for(var i=0;i<n_words;i++){
                console.log(next_value_word[i][1]);
                to_add+="<div class=\"low-pad-element\" onclick=\"change_guess_word('"+next_value_word[i][1]+"')\">"+next_value_word[i][1]+"</div>";
                if((i%14)===13)to_add+="</div><div class='grid-row'>";
            }
            to_add+="</div>";
            low_pad.innerHTML=to_add;

        }
    }


    event.preventDefault();
}, true);

//modal stuffs
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
