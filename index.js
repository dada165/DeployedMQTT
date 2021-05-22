
//This is a function for the connection if it is connected or not connected
function connection(){
  document.getElementById('status').value = "Connecting...";
  client = mqtt.connect(document.getElementById('broker').value);
  client.on('connect', function () {
      document.getElementById('status').value = "You are connected to the broker!";
  })
  
  //Receiver for the incoming message
  client.on('message', function (publishedTopic, message) {
      let date = new Date();
      if(publishedTopic == document.getElementById('subTopic').value){
        document.getElementById('tableReciever').innerHTML += `<tr><td>${publishedTopic}</td><td>${message}</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()}</td></tr>`;  
      }
  })
}



//This is the function for the button subscribe  
function subscribebutton(){

  let subscribeInput = document.getElementById('subTopic');
  let date = new Date();
  
  if(subscribeInput.value != ""){
    client.subscribe(subscribeInput.value, (error) => {
      if(error){
        console.log("Error in subscribing topic!");
      }
    });
    document.getElementById('subscribeTable').innerHTML += `<tr><td>${subscribeInput.value}</td><td>${date.toDateString()+" "+ date.toLocaleTimeString()}</td></tr>`;  
  }else{
    alert("Input a topic!");
  }
}
   


//This is the function for the button publish
function publishbutton(){
  let getInput = document.getElementById('topicInput');
  let getPayload = document.getElementById('payloadInput');
  let timestamp = new Date();
    if(getInput.value != "" && getPayload != ""){
      client.publish(getInput.value,getPayload.value);
      document.getElementById('publishTable').innerHTML += `<tr><td>${getInput.value}</td><td>${getPayload.value}</td><td>${timestamp.toDateString()+" "+ timestamp.toLocaleTimeString()}</td></tr>`;  
    }else{
      alert("Input a topic and payload!");
    }
}


