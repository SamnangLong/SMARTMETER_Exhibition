const idInput = document.getElementById('box_clientID');
const connectButton = document.getElementById('btn_connect');
// const locked_electric1 = document.getElementById('electrical1_button');

idInput.addEventListener('input', validateInput);     
function validateInput() {
  const inputValue = idInput.value.trim();
  const isValidInput = inputValue !== '';
  connectButton.disabled = !isValidInput;
  if (!isValidInput) {
    console.log('Please input your ID name.');
  }
}

// Add an event listener to the checkbox
var s1 = document.getElementById('switch1');
s1.addEventListener("change", swe1);
function swe1()
{
    if (s1.checked) {
        e1='1';
        console.log('Hello');
    } else {
        e1='0';
    }
    msg_control = 'pub,c1,' + e1 + ',' + w1 + ',c2,' + e2 + ',' + w2 +  ',c3,' + e3 + ',' + w3  ;
    publishToMQTT(msg_control);
}

var s2 = document.getElementById('switch2');
s2.addEventListener("change", sww1);
function sww1()
{
    if (s2.checked) {
        w1='1';
        console.log('Hi');
    } else {
        w1='0';
    }
    msg_control = 'pub,c1,' + e1 + ',' + w1 + ',c2,' + e2 + ',' + w2 +  ',c3,' + e3 + ',' + w3  ;
    publishToMQTT(msg_control);
}

var s3 = document.getElementById('switch3');
s3.addEventListener("change", swe2);
function swe2()
{
    if (s3.checked) {
        e2='1';
    } else {
        e2='0';
    }
    msg_control = 'pub,c1,' + e1 + ',' + w1 + ',c2,' + e2 + ',' + w2 +  ',c3,' + e3 + ',' + w3  ;
    publishToMQTT(msg_control);
}

var s4 = document.getElementById('switch4');
s4.addEventListener("change", sww2);
function sww2()
{
    if (s4.checked) {
        w2='1';
    } else {
        w2='0';
    }
    msg_control = 'pub,c1,' + e1 + ',' + w1 + ',c2,' + e2 + ',' + w2 +  ',c3,' + e3 + ',' + w3  ;
    publishToMQTT(msg_control);
}

var s5 = document.getElementById('switch5');
s5.addEventListener("change", swe3);
function swe3()
{
    if (s5.checked) {
        e3='1';
    } else {
        e3='0';
    }
    msg_control = 'pub,c1,' + e1 + ',' + w1 + ',c2,' + e2 + ',' + w2 +  ',c3,' + e3 + ',' + w3  ;
    publishToMQTT(msg_control);
}

var s6 = document.getElementById('switch6');
s6.addEventListener("change", sww3);
function sww3()
{
    if (s6.checked) {
        w3='1';
    } else {
        w3='0';
    }
    msg_control = 'pub,c1,' + e1 + ',' + w1 + ',c2,' + e2 + ',' + w2 +  ',c3,' + e3 + ',' + w3  ;
    publishToMQTT(msg_control);
}

