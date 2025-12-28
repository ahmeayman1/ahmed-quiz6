const questions = [
  {q:"The historical approach to labour management favored passive treatment, while modern practice emphasizes active management.", a:true},
  {q:"Active management of labour is defined as loose observation without documentation or partogram.", a:false},
  {q:"One advantage of active management of labour is reduced incidence of prolonged labour.", a:true},
  {q:"Active management can decrease maternal distress such as dehydration and ketosis.", a:true},
  {q:"Active management reduces the load on nursing and medical staff.", a:false},
  {q:"Components of active management include antenatal education and management of all labour stages plus newborn care.", a:true},
  {q:"Antenatal education aims only at teaching technical procedures.", a:false},
  {q:"A complete obstetric history includes previous cesarean births.", a:true},
  {q:"History of present labour includes pain description, bleeding, fluid gush, and fetal movements.", a:true},
  {q:"General examination in labour includes assessment of vital signs.", a:true},
  {q:"Abdominal examination in labour does not assess fetal heart sounds.", a:false},
  {q:"PV examination should document cervical dilatation, effacement, position, and consistency.", a:true},
  {q:"When membranes are ruptured, cord prolapse should be excluded.", a:true},
  {q:"Presenting part, position, station, and moulding are not relevant in PV exam.", a:false},
  {q:"Pelvic capacity and CPD tests are part of labour examination.", a:true},
  {q:"Routine investigations may include blood group, Rh, urine analysis, Hb, and ultrasound if not done.", a: true},
  {q:"Active procedures include evacuation of bladder and rectum and vulval preparation.", a:true},
  {q:"Shaving the vulva is never performed in labour preparation.", a:false},
  {q:"Nutrition, posture, and analgesia are considered in active management.", a:true},
  {q:"Pethidine 50–100 mg IM is an option for labour analgesia.", a:true},
  {q:"Epidural anesthesia and inhalational analgesia are anesthetic options.", a:true},
  {q:"Intrapartum monitoring includes clinical monitoring, EFM, and scalp sampling.", a:true},
  {q:"Diagnosis of second stage onset and lithotomy position are part of second-stage management.", a:true},
  {q:"Complete asepsis does not require attention to instruments.", a:false},
  {q:"Pudendal nerve block and local infiltration are used in second stage.", a:true},
  {q:"Bearing down requires continuous pushing without relaxation.", a:false},
  {q:"Perineal protection includes support, episiotomy when indicated, and controlled head delivery.", a:true},
  {q:"After head delivery, eyes, nose, and mouth are swabbed before body delivery.", a:true},
  {q:"Anterior shoulder is delivered first by lifting head posteriorly.", a:false},
  {q:"Holding infant by ankles with head down is standard for all newborns.", a:false},
  {q:"Cord massage toward the umbilicus transfers about 100 cc of blood to the infant.", a:true},
  {q:"The cord is cut between two clamps before neonatal care.", a:true},
  {q:"Conservative third-stage management includes waiting for placental separation signs.", a:true},
  {q:"Placenta and membranes should be inspected after delivery.", a:true},
  {q:"Ergometrine or oxytocin may be given after placental delivery.", a:true},
  {q:"Active third-stage management may include ergometrine at anterior shoulder and controlled cord traction.", a:true},
  {q:"Active method decreases blood loss but may increase retained placenta risk.", a:true},
  {q:"Newborn care begins only after placental delivery.", a:false},
  {q:"Initial newborn care includes suction, cord care, measurements, anomaly check, and eye prophylaxis.", a:true},
  {q:"Apgar score assesses five signs, each scored 0–2; 7–10 is good.", a:true},
  {q:"Apgar score of 4–6 is moderate asphyxia; <4 is severe.", a:true},
  {q:"Heart rate over 100 bpm scores 2 in Apgar.", a:true},
  {q:"Asphyxia livida has blue color, strong heartbeat, good tone, and good prognosis.", a:true},
  {q:"Asphyxia pallida has pale color, weak heartbeat, absent respiration, and poor prognosis.", a:true},
  {q:"Prophylaxis for neonatal asphyxia includes good ANC and avoiding morphine.", a:true},
  {q:"Additional prophylaxis includes good oxygenation and vitamin K to the mother.", a:true},
  {q:"Neonatal airway management includes suction, oxygen, Ambu bag, and intubation.", a:true},
  {q:"Circulatory support may include cardiac massage and adrenaline.", a:true},
  {q:"Naloxone is indicated if neonatal hypoxia is due to maternal morphine.", a:true},
  {q:"CNS stimulants are first-line for neonatal hypoxia.", a:false},
  {q:"Metabolic acidosis may be treated with sodium bicarbonate.", a:true},
  {q:"Maintaining warmth and avoiding cooling are essential in newborn care.", a:true},
  {q:"Episiotomy is given to all premature infants.", a:false},
  {q:"Vitamin K administration to the mother is listed as prophylaxis.", a:true},
];

let index=0;
let answered=false;
let results=[];

const qText=document.getElementById("questionText");
const counter=document.getElementById("counter");
const trueBtn=document.getElementById("trueBtn");
const falseBtn=document.getElementById("falseBtn");
const nextBtn=document.getElementById("nextBtn");
const retryBtn=document.getElementById("retryBtn");
const qList=document.getElementById("questionsList");

function toggleMenu(){
  const m=document.getElementById("sideMenu");
  const o=document.getElementById("overlay");
  if(m.style.right==="0px"){m.style.right="-250px";o.style.display="none";}
  else{m.style.right="0";o.style.display="block";}
}

function startQuiz(){
  shuffle();
  index=0;
  results=Array(questions.length).fill(null);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.querySelector(".options").style.display="flex";
  document.getElementById("questionsBtn").style.display="block";
  retryBtn.style.display="none";
  loadQuestion();
}

function loadQuestion(){
  answered=false;
  trueBtn.style.background="#3498db";
  falseBtn.style.background="#3498db";
  nextBtn.style.display="none";
  counter.innerText=`Question ${index+1} / ${questions.length}`;
  qText.innerText=questions[index].q;
}

function answer(val){
  if(answered) return;
  answered=true;
  const correct=questions[index].a;
  results[index]=(val===correct);

  if(val===correct){
    (val?trueBtn:falseBtn).style.background="#27ae60";
  }else{
    (val?trueBtn:falseBtn).style.background="#e74c3c";
    (correct?trueBtn:falseBtn).style.background="#27ae60";
  }

  if(results.every(r=>r!==null)){
    finishQuiz();
  }else{
    nextBtn.style.display="inline-block";
  }
}

function nextQuestion(){
  index = results.findIndex((r,i)=>r===null && i>index);
  if(index===-1){
    index = results.findIndex(r=>r===null);
  }
  loadQuestion();
}

function finishQuiz(){
  qText.innerText=`✅ Finished — Score: ${results.filter(r=>r).length} / ${questions.length}`;
  document.querySelector(".options").style.display="none";
  document.getElementById("questionsBtn").style.display="none";
  nextBtn.style.display="none";
  retryBtn.style.display="inline-block";
}

function retryQuiz(){
  startQuiz();
}

function toggleQuestions(){
  qList.innerHTML="";
  qList.style.display=qList.style.display==="block"?"none":"block";
  results.forEach((r,i)=>{
    const d=document.createElement("div");
    d.className="q-item "+(r===true?"correct":r===false?"wrong":"unanswered");
    d.innerText=i+1;
    d.onclick=()=>{
      index=i;
      loadQuestion();
      qList.style.display="none";
    };
    qList.appendChild(d);
  });
}

function shuffle(){
  questions.sort(()=>Math.random()-0.5);
}
