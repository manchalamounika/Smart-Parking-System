var iotdevice = require('aws-iot-device-sdk');
var config = require('./config');
var SensorMetaData = require('./sensor');
//console.log("confu ", config);
//console.log("device ",device);
var device = iotdevice.device({
   keyPath: config.keyPath ||"1877c4db8c-private.key",
  certPath: config.certPath ||"1877c4db8c-certificate.cert.pem",
    caPath: config.caPath ||"root-CA.crt",
  clientId: config.clientId ||"macbook",
      host: config.host ||"a3esojh98xaqm2.iot.us-west-2.amazonaws.com"
});

//console.log("device ",device);
device
  .on('connect',function(){
  console.log('connect');
  for(var i=1;i<5;i++) {
    //listenForData("topicparking/"+i);
  }
  listenForData("topicparking/"+process.argv[2]);
  //device.publish('topic_one', JSON.stringify({"sensor_id":"sensor one"}));
  //device.subscribe('topic_one');
});
device
   .on('close', function() {
      console.log('close');
   });
device
   .on('reconnect', function() {
      console.log('reconnect');
   });
device
   .on('offline', function() {
      console.log('offline');
   });
device
   .on('error', function(error) {
      console.log('error', error);
   });
device.on('message', function(topic, payload){
  console.log('message', topic,payload.toString());
});

function listenForData(topicName) {
  //var sensormeta = new SensorMetaData("sensor21","Yes");
  //console.log(sensormeta);
  //device.publish("", JSON.stringify({"sensor_id":"123","available":"avad"}));
  //device.subscribe("topicparking/123");
   var sensormeta = new SensorMetaData(process.argv[2],process.argv[2],process.argv[3]);
   console.log("publisher ",sensormeta);
   device.publish(topicName, JSON.stringify(sensormeta));
   device.subscribe(topicName);
   setTimeout(function(){
	process.exit();
},5000);
   
}
