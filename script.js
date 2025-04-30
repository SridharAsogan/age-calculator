

const mName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
let name = "";
let year = 0;
let month = 0;
let date = 0;
  
window.onload = function()
{
  const input = document.getElementById('name');
  const yDropDown = document.getElementById("year");
  const mDropDown = document.getElementById("month");
  const dDropDown = document.getElementById("date");
  const calc = document.getElementById("calc");
  const res = document.getElementById("res");
  
  
  setInterval(setDateTime,1000);

  input.addEventListener('change', function(){
    name = this.value;
    if(name == '') return;
    setYear(yDropDown);
  });
  
  yDropDown.addEventListener('input', function(){
    mDropDown.innerHTML = '';
    if(yDropDown.value === '--SELECT--'){
      alert("Select valid year.");
      mDropDown.innerHTML = '';
      dDropDown.innerHTML = '';
      year = "";
      month = "";
      date = "";
      return;
    }
    year = Number(yDropDown.value);
    setMonth(mDropDown);
  });
  
  mDropDown.addEventListener('input', function(){
    dDropDown.innerHTML = '';
    if(mDropDown.value === '--SELECT--'){
      alert("Select valid month.");
      dDropDown.innerHTML = '';
      month = "";
      date = "";
      return;
    }
    month = mName.indexOf(mDropDown.value);
    setDate(dDropDown);
  });
  
  dDropDown.addEventListener('change', function(){
    if(dDropDown.value === '--SELECT--'){
      alert("Select valid date.");
      return;
    }
    date = Number(dDropDown.value);
    calc.disabled = false;
  });
  
  calc.addEventListener('click', function(){
    if(name === ''){
      alert('Fill name field');
      return;
    }
    
    const dob = new Date(year,month,date);
    const now = new Date();
    let ageYear = now.getFullYear() - dob.getFullYear();
    let ageMonth = now.getMonth() - dob.getMonth();
    let ageDate = now.getDate() - dob.getDate();

    
    if(ageDate < 0){
      ageMonth--;
      ageDate += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    
    if(ageMonth < 0){
      ageYear--;
      ageMonth += 12;
    }
    
    res.textContent = `Hi ${name}! Your age is ${ageYear} years ${ageMonth} months  and ${ageDate} days`;
    
    input.value = "";
    yDropDown.innerHTML = "";
    mDropDown.innerHTML = "";
    dDropDown.innerHTML = "";
    
    reset();
    calc.disabled = true;
  });
  
};

function setDateTime()
{
  const dateObject = new Date();
  let date = dateObject.getDate() < 10 ? "0"+ dateObject.getDate() : dateObject.getDate();
  let month = dateObject.getMonth()+1 < 10 ? "0"+(dateObject.getMonth()+1) : (dateObject.getMonth()+1) ;
  let year = dateObject.getFullYear();
  let hour = (dateObject.getHours() % 12) < 10 ? "0"+(dateObject.getHours() % 12) : dateObject.getHours();
  let minute = dateObject.getMinutes() < 10 ? "0"+dateObject.getMinutes() : dateObject.getMinutes();
  let second = dateObject.getSeconds() < 10 ? "0"+dateObject.getSeconds() : dateObject.getSeconds();
  document.getElementById('dmy').textContent = `${date}/${month}/${year}`;
  document.getElementById('time').textContent = `${hour}:${minute}:${second}`;
}

function setYear(select)
{
  const now = new Date();
  addDefault(select);
  for(let y = now.getFullYear(); y >=1900;y--){
    const option = document.createElement('option');
    option.textContent = y;
    select.appendChild(option);
  }
}

function setMonth(select)
{
  addDefault(select);
  const now = new Date();
  for(let m of mName){
    const option = document.createElement('option');
    option.textContent = m;
    select.appendChild(option);
    if(year === Number(now.getFullYear())){
      if(mName.indexOf(m) === Number(now.getMonth())){
        break;
      }
    }
  }
}

function setDate(select)
{
  addDefault(select);
  const now = new Date();
  const dates = new Date(year, month+1, 0).getDate();
  
  for(let d = 1;d<=dates;d++){
    const option = document.createElement('option');
    option.textContent = d < 10 ? '0' + d : d;
    select.appendChild(option);
    if(year === Number(now.getFullYear())){
      if(month === Number(now.getMonth())){
        if(d === Number(now.getDate())){
          break;
        }
      }
    }
  }
}

function reset()
{
  name = "";
  year = 0;
  month = 0;
  date = 0;
}

function addDefault(select)
{
  const option = document.createElement('option');
  option.textContent = '--SELECT--';
  select.appendChild(option);
}
