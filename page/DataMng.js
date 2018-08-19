var DataMng = function(){
        this.data = {
            "state":{
                "point":5,
                "start":0,
                "limit":1000,
                "base":[1,0,1,0],
            },
            "event":{
                "msg":"test update",
                "place":1,
                "time":0
            }
        };
};

DataMng.prototype.update = function(data_dict)
{
	this.data = data_dict;
	console.log(this.data)
};

DataMng.prototype.getMyPoint = function()
{
	return 1996;
};

DataMng.prototype.getGameTime = function()
{
	const limit = this.data.state.limit;
	var gameTime_ms = Math.floor( limit*1000 - (Date.now()) );
	return gameTime_ms;

};
DataMng.prototype.inGameTime = function()
{
	const gameTime = this.getGameTime();
	if(gameTime > 0)
	{
		return true;
	}else
	{
		return false;
	}
}