var viewer;
var dataMng;
window.onload = function(){
	dataMng = new DataMng();
	viewer = new Viewer(dataMng);
};

var client = new Paho.MQTT.Client("127.0.0.1", 9090, "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect()
{
	console.log("onConnect");
	client.subscribe("LED-Camp/data");
};

function onConnectionLost(responseObject)
{
	console.log("onConnectionLost");
	if (responseObject.errorCode !== 0)
		console.log("onConnectionLost:"+responseObject.errorMessage);
};

function onMessageArrived(msg)
{
	console.log("onMessageArrived");
	dataMng.update( JSON.parse(msg.payloadString) );
	viewer.update();
};	

