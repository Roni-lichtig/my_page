/* ========== New_Res_JS.js ========== */

/* --- DOM helpers --- */
const $ = id => document.getElementById(id);

const form      = $('reservationForm'),
      resetBtn  = $('resetBtn'),
      restName  = $('restName'),  resDate  = $('resDate'), resTime = $('resTime'),
      partySize = $('partySize'), fullName = $('fullName'),
      email     = $('email'),    phone    = $('phone'),
      notes     = $('notes'),    notesCnt = $('notesCounter');

const err = {
  rest   : $('errRestaurant'), date : $('errDate'), time : $('errTime'),
  party  : $('errParty'),      seating : $('errSeating'),
  name   : $('errName'),       email : $('errEmail'), phone : $('errPhone')
};

const blueModal = $('largeGroupModal'),
      redModal  = $('formErrModal'),
      okModal   = $('successModal'),
      okText    = $('successText');

/* --- modal helpers --- */
function showModal(m){ m.classList.remove('d-none'); document.body.classList.add('modal-open'); }
function hideModal(m){ m.classList.add('d-none');    document.body.classList.remove('modal-open'); }
document.querySelectorAll('[data-close-modal]')
        .forEach(b => b.addEventListener('click', () => hideModal(b.closest('.dw-modal'))));
document.addEventListener('keyup', e=>{
  if(e.key==='Escape') document.querySelectorAll('.dw-modal:not(.d-none)').forEach(hideModal);
});

/* --- live counter --- */
notes.addEventListener('input', () => notesCnt.textContent = `${notes.value.length} / 250`);

/* --- date ≥ today & time slots --- */
const todayISO = new Date().toISOString().split('T')[0];
resDate.min = todayISO;
resDate.addEventListener('change', () => {
  resTime.innerHTML = '<option value="">Select time</option>';
  for(let h=10; h<=20; h++){
    const t = `${String(h).padStart(2,'0')}:00`;
    resTime.appendChild(new Option(t,t));
  }
  validateField(resDate);
});

/* --- regex --- */
const reName  = /^[A-Za-z\s'-]{2,}$/;
const reEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const rePhone = /^\d{10}$/;

/* --- error helpers --- */
function setErr(el,div,msg){ el.classList.add('is-invalid'); div.textContent = msg; }
function clearErr(el,div){   el.classList.remove('is-invalid'); div.textContent = ''; }

/* --- per‑field validation --- */
function validateField(el){
  switch(el){
    case restName: if(restName.value.trim())                     clearErr(restName,err.rest); break;
    case resDate : if(resDate.value && resDate.value>=todayISO)  clearErr(resDate ,err.date); break;
    case resTime : if(resTime.value)                             clearErr(resTime ,err.time); break;
    case partySize:{
      const g = +partySize.value;
      if(g>=1){ clearErr(partySize,err.party); if(g>12) showModal(blueModal); }
    } break;
    case fullName: if(reName .test(fullName.value))              clearErr(fullName,err.name ); break;
    case email   : if(reEmail.test(email.value))                 clearErr(email   ,err.email); break;
    case phone   : if(rePhone.test(phone.value))                 clearErr(phone   ,err.phone); break;
  }
}

/* --- live listeners --- */
[restName,resDate,resTime,partySize,fullName,email,phone].forEach(el=>{
  el.addEventListener('input',  ()=>validateField(el));
  el.addEventListener('change', ()=>validateField(el));
});
document.querySelectorAll('input[name="seating"]')
        .forEach(r=>r.addEventListener('change',()=>err.seating.textContent=''));

/* --- full form validation --- */
function validateAll(){
  // clear previous
  [restName,resDate,resTime,partySize,fullName,email,phone]
    .forEach((el,i)=>clearErr(el,Object.values(err)[i]));
  err.seating.textContent = '';

  let ok = true;
  if(!restName.value.trim())                 { setErr(restName ,err.rest ,'Required'); ok=false; }
  if(!resDate.value||resDate.value<todayISO) { setErr(resDate  ,err.date ,'Invalid date'); ok=false; }
  if(!resTime.value)                         { setErr(resTime  ,err.time ,'Required'); ok=false; }
  if(!(+partySize.value>=1))                 { setErr(partySize,err.party,'At least one guest'); ok=false; }
  if(!document.querySelector('input[name="seating"]:checked'))
                                             { err.seating.textContent='Choose seating'; ok=false; }
  if(!reName .test(fullName.value))          { setErr(fullName ,err.name ,'Letters A‑Z only'); ok=false; }
  if(!reEmail.test(email.value))             { setErr(email    ,err.email,'Must include @'); ok=false; }
  if(!rePhone.test(phone.value))             { setErr(phone    ,err.phone,'10 digits');     ok=false; }
  return ok;
}

/* prevent Enter submit */
form.addEventListener('keydown', e => { if(e.key==='Enter') e.preventDefault(); });

/* --- submit handler (Option B) --- */
form.addEventListener('submit', e=>{
  e.preventDefault();                   // עוצר שליחה מיידית

  if(!validateAll()){
    showModal(redModal);
    return;
  }

  /* success: show modal then POST */
  okText.innerHTML =
    `Awesome! Your reservation for <strong>${partySize.value}</strong> guests<br>`+
    `on <strong>${resDate.value}</strong> at <strong>${resTime.value}</strong> is confirmed.<br>`+
    `Can't wait to see you soon!`;
  showModal(okModal);

  // שולח אחרי 100 ms כדי שהמודאל ייראה
  setTimeout(()=>form.submit(), 3000);
});

/* reset = full refresh */
resetBtn.addEventListener('click', () => location.reload());
