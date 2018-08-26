var viewer;
var dataMng;
window.onload = function(){
	dataMng = new DataMng();
	viewer = new Viewer(dataMng);
};

var client = new Paho.Client(BROKER_ADDR, 9090, "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect()
{
	console.log("onConnect");
	client.subscribe("LED-Camp/data");
	client.subscribe("LED-Camp/ranking");
	client.subscribe("LED-Camp/teamname");
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
	console.log(msg)
	if(msg.topic === "LED-Camp/data")
	{
		dataMng.update(msg.payloadString);
		viewer.update();
	}
	if(msg.topic === "LED-Camp/ranking")
	{
		dataMng.rankUpdate(msg.payloadString)
		viewer.rankUpdate();
	}
	if(msg.topic === "LED-Camp/teamname")
	{
		dataMng.teamnameUpdate(msg.payloadString)
		viewer.teamnameUpdate();
	}
};	

