var connection_status= false;
var msg_control = '';
var e1='0', w1='0' ,e2='0', w2='0',e3='0', w3='0';

function BtnConnect(){
  
    clientID = document.getElementById("box_clientID").value;
    host = 'pf-huhru7kr45jybh0pk1rs.cedalo.cloud';
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

    userName: 'SAMNANG',
    password: 'samnang123',
    mqttVersion:4
});
}


// called when the client connects
function onConnect() {

  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  console.log('Connection successful!');
  connection_status = true ;
  // alert("Connect to server is success.")

  const textBox = document.getElementById('box_clientID');
  const connectButton = document.getElementById('btn_connect');
  connectButton.disabled = true;
  setTimeout(() => {
    // console.log('Connection successful!');

     // Clear the text box after connection
    //  textBox.value = '';
     textBox.disabled = true;
     textBox.style.backgroundColor ='#bfd4ee';

    // Disable the button once connected
    connectButton.disabled = true;
    connectButton.textContent = 'CONNECTED';
    connectButton.style.Color = 'red';

  }, 1000);


  const subTopic1 = 'controller1_data' ;
  const subTopic2 = 'controller1_con_status';
  // subTopic5= 'alert' ;
  qos = 0;
  client.subscribe(subTopic1);
  client.subscribe(subTopic2);


}
  
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+ responseObject.errorMessage);
    alert("MQTT Connection Lost");
  }
}


 
function publishToMQTT(value) {
    // Replace this with your MQTT logic to publish the value
    // For example, you can use the Paho MQTT library:
    // client.send('your_topic', value);
    // console.log('Published to MQTT:', value);
    client.send('controller1_con_pub', value);
}

  // called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);

    const values = message.payloadString.split(',');


  //   // Check if the message is of the expected format
  // if (values[0] === "status" && values[1] === "c1") {
  //   // Update the checkbox based on the received value
  //   var checkbox = document.getElementById("switch");
  //   checkbox.checked = values[2] === "1";
  // }
  if(values[0] === "data")
  {
    document.getElementById('box_cus_energy1').value = values[2] ;
    document.getElementById('box_cus_voltage1').value = values[3] ;
    document.getElementById('box_cus_current1').value = values[4] ;
    document.getElementById('box_cus_usage1').value = values[5] ;

    document.getElementById('box_cus_energy2').value = values[7] ;
    document.getElementById('box_cus_voltage2').value = values[8] ;
    document.getElementById('box_cus_current2').value = values[9] ;
    document.getElementById('box_cus_usage2').value = values[10] ;

    document.getElementById('box_cus_energy3').value = values[12] ;
    document.getElementById('box_cus_voltage3').value = values[13] ;
    document.getElementById('box_cus_current3').value = values[14] ;
    document.getElementById('box_cus_usage3').value = values[15] ; 
    
    document.getElementById('box_energy').value= parseFloat(Number(values[2]) + Number(values[7]) + Number(values[12])).toFixed(3);
    document.getElementById('box_water').value= parseFloat(Number(values[5]) + Number(values[10]) + Number(values[15])).toFixed(3);
  }
  else if(values[0] === "status")
  {
    if(values[2] == '1') 
    {
      document.getElementById('switch1').checked=true ;
      e1='1';
    }
    else 
    {
      document.getElementById('switch1').checked=false ;
      e1='0';
    }
    if(values[3] == '1') 
    {
      document.getElementById('switch2').checked=true ;
      w1='1';
    }
    else 
    {
      document.getElementById('switch2').checked=false ;
      w1='0';
    }

    if(values[5] == '1') 
    {
      document.getElementById('switch3').checked=true ;
      e2='1';
    }
    else 
    {
      document.getElementById('switch3').checked=false ;
      e2='0';
    }
    if(values[6] == '1') 
    {
      document.getElementById('switch4').checked=true ;
      w2='1';
    }
    else 
    {
      document.getElementById('switch4').checked=false ;
      w2='0';
    }

    if(values[8] == '1') 
    {
      document.getElementById('switch5').checked=true ;
      e3='1';
    }
    else 
    {
      document.getElementById('switch5').checked=false ;
      e3='0';
    }
    if(values[9] == '1') 
    {
      document.getElementById('switch6').checked=true ;
      w3='1';
    }
    else 
    {
      document.getElementById('switch6').checked=false ;
      w3='0';
    }
  }

}  
