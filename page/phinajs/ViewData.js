var ViewData = function(){
	this.in_compe = false;
	this.time_limit = 0;
	this.data="null";
}

ViewData.prototype.update = function(jsontxt)
{
	this.data = JSON.parse(jsontxt);
	console.log(data);
}

ViewData.prototype.getCompeTimeStr = function()
{
	var millisec = -1;
	console.log(this.data)
	if(this.data == "null")
		millisec = this.calcRemainMS(this.data.state.limit);

	if(millisec <= 0)
	{
		return "00:00.00";
	}

	var timestr = this.millisec2str(millisec);
	return timestr;
}

ViewData.prototype.calcRemainMS = function(limit)
{
	return Math.floor( data.state.limit*1000 - (Date.now()) );
}

ViewData.prototype.millisec2str = function(time)
{
	var m = Math.floor(time / (1000*60));
	time -= m*(1000*60);

	var s = Math.floor(time / 1000);
	time -= s*1000;

	var ms = Math.floor(time / 10);
	return this.fillzero(m)+":"+this.fillzero(s)+"."+ms;
}

ViewData.prototype.fillzero = function(n)
{
	if(n<10)
		return "0"+n;
	else
		return ""+n;
}
