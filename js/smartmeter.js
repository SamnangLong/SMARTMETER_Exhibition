var connection_status= false;

function BtnConnect(){
  
    clientID = document.getElementById("box_clientID").value;
    host = 'pf-0ry859c31yp7gxcum4a7.cedalo.cloud';
    port = 443;

    // Create a client instance
    // client = new Paho.MQTT.Client('e8f424ec.emqx.cloud', 8083, "test");
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
    onSuccess: onConnect,
    // onFailure: onFailure,
    useSSL: true,

    userName: 'Machine1',
    password: 'admin',
    mqttVersion:4
});
}


// called when the client connects
function onConnect() {

  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  connection_status = true ;
  // alert("Connect to server is success.")

  var textBox = document.getElementById('box_clientID');
  var connectButton = document.getElementById('btn_connect');
  setTimeout(() => {
    // console.log('Connection successful!');

     // Clear the text box after connection
     textBox.value = '';
     textBox.disabled = true;
     textBox.style.backgroundColor ='red';

    // Disable the button once connected
    connectButton.disabled = true;
    connectButton.textContent = 'CONNECTED';

  }, 2000);


  const subTopic1 = 'controller1_data' ;
  const subTopic2 = 'controller1_con_status';
  // subTopic5= 'alert' ;
  qos = 0;
  client.subscribe(subTopic1);
  client.subscribe(subTopic2);

  document.getElementById('electrical1_button').disabled = false;
  document.getElementById('electrical2_button').disabled = false;
  document.getElementById('electrical3_button').disabled = false;
  document.getElementById('water1_button').disabled = false;
  document.getElementById('water2_button').disabled = false;
  document.getElementById('water3_button').disabled = false;
}
  
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+ responseObject.errorMessage);
    alert("MQTT Connection Lost");
  }
}


  
// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
    
    // Split the string into an array using comma as the delimiter
    const values = message.payloadString.split(',');

    // Display Custormer 1
    if (values[0]=='data'&&values[1]=='c1'){
      document.getElementById('box_cus_power1').value = values[2] || '';
      document.getElementById('box_cus_voltage1').value = values[3] || '';
      document.getElementById('box_cus_current1').value = values[4] || '';
      document.getElementById('box_cus_usage1').value = values[5] || '';
    }
    
    // Display Custormer 2
    if (values[0]=='data'){
      document.getElementById('box_cus_power2').value = values[7] || '';
      document.getElementById('box_cus_voltage2').value = values[8] || '';
      document.getElementById('box_cus_current2').value = values[9] || '';
      document.getElementById('box_cus_usage2').value = values[10] || '';
    }

    // Display Custormer 3
    if (values[0]=='data'&&values[11]=='c3'){
      document.getElementById('box_cus_power3').value = values[12] || '';
      document.getElementById('box_cus_voltage3').value = values[13] || '';
      document.getElementById('box_cus_current3').value = values[14] || '';
      document.getElementById('box_cus_usage3').value = values[15] || '';
    }


  const Meter1_Electric = document.querySelector('#box_cus_power1').value;
  const Meter2_Electric = document.querySelector('#box_cus_power2').value;
  const Meter3_Electric = document.querySelector('#box_cus_power3').value;
  
  const Meter1_Water = document.querySelector('#box_cus_usage1').value;
  const Meter2_Water = document.querySelector('#box_cus_usage2').value;
  const Meter3_Water = document.querySelector('#box_cus_usage3').value;

  // Total Energy
  setTimeout(() => {
    document.getElementById('box_energy').value = parseFloat(Number(Meter1_Electric) + Number(Meter2_Electric) + Number(Meter3_Electric)).toFixed(3);

    // Total Water
    document.getElementById('box_water').value = parseFloat(Number(Meter1_Water) + Number(Meter2_Water) + Number(Meter3_Water)).toFixed(3);
  }, 1000);
 
    // -----------Status---------

    // Electrical1
    if (values[0]=='status'&&values[1]=='c1'&&values[2]=='1'){
      electric_status = document.getElementById('electrical1_button');
      electric_status.textContent ='ON';
      electric_status.style.backgroundColor = 'green';
      electric_status.disabled = false;
    }
    if (values[0]=='status'&&values[1]=='c1'&&values[2]=='0'){
      electric_status = document.getElementById('electrical1_button');
      electric_status.textContent ='OFF';
      electric_status.style.backgroundColor = 'red';
      electric_status.disabled = false;
    }
    // Water1
    if (values[0]=='status'&&values[1]=='c1'&&values[3]=='1'){
      water_status = document.getElementById('water1_button');
      water_status.textContent ='ON';
      water_status.style.backgroundColor = 'green';
      water_status.disabled = false;
    }
    if (values[0]=='status'&&values[1]=='c1'&&values[3]=='0'){
      water_status = document.getElementById('water1_button');
      water_status.textContent ='OFF';
      water_status.style.backgroundColor = 'red';
      water_status.disabled = false;
    }

    // Electrical2
    if (values[0]=='status'&&values[4]=='c2'&&values[5]=='1'){
      electric_status = document.getElementById('electrical2_button');
      electric_status.textContent ='ON';
      electric_status.style.backgroundColor = 'green';
      electric_status.disabled = false;
    }
    if (values[0]=='status'&&values[4]=='c2'&&values[5]=='0'){
      electric_status = document.getElementById('electrical2_button');
      electric_status.textContent ='OFF';
      electric_status.style.backgroundColor = 'red';
      electric_status.disabled = false;
    }
    // Water2
    if (values[0]=='status'&&values[4]=='c2'&&values[6]=='1'){
      water_status = document.getElementById('water2_button');
      water_status.textContent ='ON';
      water_status.style.backgroundColor = 'green';
      water_status.disabled = false;
    }
    if (values[0]=='status'&&values[4]=='c2'&&values[6]=='0'){
      water_status = document.getElementById('water2_button');
      water_status.textContent ='OFF';
      water_status.style.backgroundColor = 'red';
      water_status.disabled = false;
    }

    // Electrical3
    if (values[0]=='status'&&values[7]=='c3'&&values[8]=='1'){
      electric_status = document.getElementById('electrical3_button');
      electric_status.textContent ='ON';
      electric_status.style.backgroundColor = 'green';
      electric_status.disabled = false;
    }
    if (values[0]=='status'&&values[7]=='c3'&&values[8]=='0'){
      electric_status = document.getElementById('electrical3_button');
      electric_status.textContent ='OFF';
      electric_status.style.backgroundColor = 'red';
      electric_status.disabled = false;
    }
    // Water3
    if (values[0]=='status'&&values[7]=='c3'&&values[9]=='1'){
      water_status = document.getElementById('water3_button');
      water_status.textContent ='ON';
      water_status.style.backgroundColor = 'green';
      water_status.disabled = false;
    }
    if (values[0]=='status'&&values[7]=='c3'&&values[9]=='0'){
      water_status = document.getElementById('water3_button');
      water_status.textContent ='OFF';
      water_status.style.backgroundColor = 'red';
      water_status.disabled = false;
    }
}


const buttonStates = {
  button1: false,
  button2: false,
  button3: false,
  button4: false,
  button5: false,
  button6: false,
};


// customer 1
function toggleState1(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton1 = document.getElementById('electrical1_button');
  if(toggleButton1){
    toggleButton1.disabled = true;
    // toggleButton1.textContent = 'OFF';
  }
}
function toggleState2(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton2 = document.getElementById('water1_button');

  if(toggleButton2){
    toggleButton2.disabled = true;
    // toggleButton2.textContent = 'OFF';
  }
}
// customer 2
function toggleState3(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton1 = document.getElementById('electrical2_button');

  if(toggleButton1){
    toggleButton1.disabled = true;
    // toggleButton1.textContent = 'OFF';
  }
}
function toggleState4(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton2 = document.getElementById('water2_button');

  if(toggleButton2){
    toggleButton2.disabled = true;
    // toggleButton2.textContent = 'OFF';
  }
}
// customer 3
function toggleState5(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton1 = document.getElementById('electrical3_button');

  if(toggleButton1){
    toggleButton1.disabled = true;
    // toggleButton1.textContent = 'OFF';
  }
}

function toggleState6(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton2 = document.getElementById('water3_button');
  if(toggleButton2){
    toggleButton2.disabled = true;
    // toggleButton2.textContent = 'OFF';
  }
}





// PUBLISH DATA
function publishData() {
  const message = `pub,c1,${buttonStates.button1 ? '1' : '0'},${buttonStates.button2 ? '1' : '0'},c2,${buttonStates.button3 ? '1' : '0'},${buttonStates.button4 ? '1' : '0'},c3,${buttonStates.button5 ? '1' : '0'},${buttonStates.button6 ? '1' : '0'}`;                
  client.send('controller1_con_pub', message);
  console.log('Published customer:', message);
}