var DataMng = function(){
  this.data = {
			"point":0,
			"start":0,
			"limit":1000,
			"base":{"0":0,"1":0,"2":0,"3":0},
      "event":{
          "msg":"test update",
          "place":1,
          "time":0
      }
  };
	this.ranking = new Array(RANK_NUM);
	for(let i=0;i<RANK_NUM;i++)
	{
		this.ranking[i]={
			name:"",
			point:""
		};
	}
	this.teamname = "";
	this.gosa = 0
};

DataMng.prototype.update = function(data_str)
{
	const data_dict = JSON.parse(data_str); 
	this.data = data_dict;
	this.gosa =  this.data.event.time*1000 - Date.now();
};

DataMng.prototype.getMyPoint = function()
{
	return this.data.point;
};

DataMng.prototype.getGameTime = function()
{
	const limit = this.data.limit;
	if(this.inStop())
	{
		return Math.floor(this.data.stoptime*1000);
	}
	var gameTime_ms = Math.floor( limit*1000-this.gosa - (Date.now()) );
	return gameTime_ms;

};

DataMng.prototype.inStop = function()
{
	if(this.data.stoptime == 0)
		return false;
	else
		return true;
};

DataMng.prototype.inGameTime = function()
{
	const gameTime = this.getGameTime();
	if(gameTime > 0)
	{
		return true;
	}
	return false;
};

DataMng.prototype.getBasePoint = function()
{
	let base = new Array(BASE_NUM);
	for(let i=0;i<BASE_NUM;i++)
	{
		base[i] = this.data.base[""+i];
	}
	return base;
};

DataMng.prototype.rankUpdate = function(rank_str)
{
	lines = rank_str.split(",");
	for(let i=0;i<RANK_NUM;i++)
	{
		const data = lines[i].split(" ");
		this.ranking[i].name = data[0];
		this.ranking[i].point = data[1];
	}
	
};

DataMng.prototype.getRanking = function()
{
	return this.ranking;
};
DataMng.prototype.teamnameUpdate = function(name_str)
{
	this.teamname = name_str;
};

DataMng.prototype.getTeamname = function()
{
	return this.teamname;
};
