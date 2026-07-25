let result = JSON.parse(
localStorage.getItem("result")
);
const sheetURL = 
"https://script.google.com/macros/s/AKfycbzP4qMbQYT6_k5whw0l5uTcCymKu8tHEAIeItajt1MLwLyoTj0Hl5AgN1gpDaIxbQ06/exec";
console.log(result);


if(!result){

document.getElementById("result").innerHTML =
"<h2>ไม่พบคะแนน</h2>";

}

else{

function interpret(type, score){

if(type === "S"){

if(score >= 41)
return "จุดแข็งโดดเด่น ใช้เป็นข้อได้เปรียบ";

if(score >= 31)
return "ดี ควรพัฒนาต่อ";

if(score >= 21)
return "ปานกลาง";

return "ควรเร่งเสริม";

}


if(type === "W"){

if(score >= 41)
return "ต้องรีบแก้ไข";

if(score >= 31)
return "ควรวางแผนพัฒนา";

if(score >= 21)
return "มีบางจุดที่ต้องระวัง";

return "อยู่ในระดับดี";

}


if(type === "O"){

if(score >= 41)
return "มีโอกาสเติบโตสูง";

if(score >= 31)
return "ใช้โอกาสได้ดี";

if(score >= 21)
return "ยังใช้โอกาสไม่เต็มที่";

return "ควรมองหาโอกาสใหม่";

}


if(type === "T"){

if(score >= 41)
return "ความเสี่ยงสูง ต้องมีแผนรับมือ";

if(score >= 31)
return "ควรเตรียมแผนสำรอง";

if(score >= 21)
return "จัดการได้";

return "ความเสี่ยงต่ำ";

}

}

document.getElementById("result").innerHTML = `


<div class="score-grid">


<div class="score-card s-card">

<h3>🟢 จุดแข็ง (S)</h3>

<h1>${result.S}</h1>

<p>คะแนน / 50</p>

<p>
${interpret("S", result.S)}
</p>

</div>



<div class="score-card w-card">

<h3>🔴 จุดอ่อน (W)</h3>

<h1>${result.W}</h1>

<p>คะแนน / 50</p>
<p>
${interpret("W", result.W)}
</p> 
</div>



<div class="score-card o-card">

<h3>🔵 โอกาส (O)</h3>

<h1>${result.O}</h1>

<p>คะแนน / 50</p>
<p>
${interpret("O", result.O)}
</p> 
</div>



<div class="score-card t-card">

<h3>🟠 อุปสรรค (T)</h3>

<h1>${result.T}</h1>

<p>คะแนน / 50</p>
<p>
${interpret("T", result.T)}
</p>
</div>


</div>


`;
new Chart(
document.getElementById("swotChart"),
{

type:"radar",

data:{

labels:[
"Strength",
"Weakness",
"Opportunity",
"Threat"
],

datasets:[{

label:"คะแนน SWOT",

data:[
result.S,
result.W,
result.O,
result.T
],

fill:true

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

scales:{
r:{
min:0,
max:50,
ticks:{
stepSize:10
}
}
}

}

});

}

function backHome(){

window.location.href="index.html";

}

function saveToSheet(){

console.log("saveToSheet ทำงาน");

let result = JSON.parse(
localStorage.getItem("result")
);

console.log("ส่งข้อมูล", result);

fetch(sheetURL,{
  method:"POST",
  mode:"no-cors",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({

    name:localStorage.getItem("userName"),
    department:localStorage.getItem("department"),
    S:result.S,
    W:result.W,
    O:result.O,
    T:result.T

  })
})
.then(()=>{
  console.log("ส่งข้อมูลแล้ว");
})
.catch(error=>{
  console.log(error);
});

}


if(localStorage.getItem("saved") !== "yes"){

    saveToSheet();

    localStorage.setItem("saved","yes");

}
