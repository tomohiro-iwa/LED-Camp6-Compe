var connection = new WebSocket("ws://127.0.0.1:12345");
var data;
var timer;

function updatePoint(jsontxt)
{
	data = JSON.parse(jsontxt);
	console.log(data);

	timer = setInterval(updateTime,10);

	document.getElementById("point_box").innerHTML = data.state.point;
	for(var i=0;i<4;i++)
	{
		document.getElementById("base"+i).innerHTML = data.state.base[i];
	}
}

var flg = true;
function updateTime()
{
	var millisec = Math.floor( data.state.limit*1000 - (Date.now()) );
	var timestr = millisec2str(millisec);
	if(flg){
		console.log(timestr);
		flg = false;
	}

	if(millisec <= 0)
	{
		document.getElementById("time_area").innerHTML = "00:00.00";
		clearInterval(timer);
	}else
	{
		document.getElementById("time_area").innerHTML = timestr;
	}
}

function millisec2str(time)
{
	var m = Math.floor(time / (1000*60));
	time -= m*(1000*60);

	var s = Math.floor(time / 1000);
	time -= s*1000;

	var ms = Math.floor(time / 10);
	return fillzero(m)+":"+fillzero(s)+"."+ms;
}

function fillzero(n)
{
	if(n<10)
		return "0"+n;
	else
		return ""+n;
}
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
	updatePoint(e.data);
};

