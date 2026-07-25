let current = 0;

let answers = [];



function showQuestion(){


document.getElementById("progress").innerHTML =
"ข้อที่ " + (current + 1) + " / " + questions.length;



document.getElementById("questionText").innerHTML =
questions[current].text;



let category =
document.getElementById("category");



if(questions[current].type === "S"){

category.innerHTML =
"🟢 จุดแข็ง (Strength)";

}

else if(questions[current].type === "W"){

category.innerHTML =
"🔴 จุดอ่อน (Weakness)";

}

else if(questions[current].type === "O"){

category.innerHTML =
"🔵 โอกาส (Opportunity)";

}

else if(questions[current].type === "T"){

category.innerHTML =
"🟠 อุปสรรค (Threat)";

}



let buttons =
document.querySelectorAll("#choices button");



buttons.forEach(btn=>{

btn.classList.remove("selected");

});



if(answers[current]){

buttons[answers[current]-1].classList.add("selected");

}


}




function selectScore(score){


answers[current] = score;



let buttons =
document.querySelectorAll("#choices button");



buttons.forEach(btn=>{

btn.classList.remove("selected");

});



buttons[score-1].classList.add("selected");


}




function nextQuestion(){


if(!answers[current]){

alert("กรุณาเลือกคะแนนก่อน");

return;

}



if(current < questions.length - 1){


current++;

showQuestion();


}

else{


let result = {

S:0,
W:0,
O:0,
T:0

};



questions.forEach((q,index)=>{


result[q.type] += answers[index];


});



localStorage.setItem(
"answers",
JSON.stringify(answers)
);



localStorage.setItem(
"result",
JSON.stringify(result)
);



window.location.href =
"result.html";


}


}




function previousQuestion(){


if(current > 0){

current--;

showQuestion();

}


}



showQuestion();