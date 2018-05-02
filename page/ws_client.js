var connection = new WebSocket("ws://127.0.0.1:12345");

connection.onopen = function()
{
	console.log("connection open");
};

connection.onerror = function(error)
{
	console.log("connection error");
	console.log(error);
};

connection.onmessage = function(e)
{
	var obj = JSON.parse(e.data);//refactaring
	console.log(obj);
	
	document.getElementById("point_box").innerHTML = obj.state.point;
	for(var i=0;i<4;i++)
	{
		document.getElementById("base"+i).innerHTML = obj.state.base[i];
	}
};

