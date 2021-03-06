var Viewer = function(dataMng){
	this.dataMng = dataMng;

	var canvas = document.getElementById("canvas");
	this.ctx = canvas.getContext("2d");

	this.myPointDOM = document.getElementById("my-point");
	this.countDOM = document.getElementById("countdown-timer");
	this.rankDOM = new Array(RANK_NUM);
	for(let i=0;i<RANK_NUM;i++)
	{
		this.rankDOM[i] = {
			name:document.getElementById("rank"+(i+1)+"-name"),
			point:document.getElementById("rank"+(i+1)+"-point")
		};
	}

	this.teamnameDOM = document.getElementById("teamname");

	this.isTimerActive = false;

	/* Imageオブジェクトを生成 */
	this.LED_RED = LED_RED;
	this.LED_BLUE = LED_BLUE;
	this.LED_NONE = LED_NONE;
	this.drawCanvas();
};

Viewer.prototype.update = function()
{
	//獲得点を更新
	var point = this.dataMng.getMyPoint();
	this.myPointDOM.innerHTML = ""+point;
	
	console.log(this.dataMng.inGameTime());
	//timerの状態更新
	if(!this.isTimerActive && this.dataMng.inGameTime())
	{
		this.isTimerActive = true;
		this.timerID = setInterval(this.timeUpdate.bind(this),10);
	}

	//canvasを更新
	this.drawCanvas();
	//
	//
	this.test();
};

Viewer.prototype.drawCanvas = function()
{
	const width = 600;
	const height = 600;

	const led_coord = new Array(BASE_NUM);
	led_coord[0] = new Victor(50,50);
	led_coord[1] = new Victor(400,50);
	led_coord[2] = new Victor(400,400);
	led_coord[3] = new Victor(50,400);

	this.ctx.clearRect(0,0,600,600);
	this.ctx.beginPath();
	this.ctx.moveTo(0, 0);
	this.ctx.lineTo(600, 0);
	this.ctx.lineTo(600, 600);
	this.ctx.lineTo(0, 600);
	this.ctx.closePath();
	this.ctx.stroke();

	let point = this.dataMng.getBasePoint();
	for(let i=0;i<BASE_NUM;i++)
	{
		let x = led_coord[i].x
		let y = led_coord[i].y
		let img = this.LED_NONE;
		if(point[i]==1)
			img = this.LED_BLUE;
		if(point[i]==0)
			img = this.LED_NONE;
		if(point[i]==2)
			img = this.LED_RED;

		this.ctx.drawImage(img, x, y);
	}
};

Viewer.prototype.test = function()
{
	/* 画像を描画 */
}

//callbackに呼ばせる
Viewer.prototype.timeUpdate = function()
{
	const time_ms = this.dataMng.getGameTime();
	this.countDOM.innerHTML = Util.ms2str(time_ms);
	if(!this.dataMng.inGameTime())
	{
		this.isTimerActive = false;
		this.countDOM.innerHTML = "00:00.00";
		clearInterval(this.timerID);
	}
};

Viewer.prototype.rankUpdate = function()
{
	const ranking = this.dataMng.getRanking();
	for(let i=0;i<RANK_NUM;i++)
	{
		this.rankDOM[i].name.innerHTML = ranking[i].name;
		this.rankDOM[i].point.innerHTML = ranking[i].point;
	}
};


Viewer.prototype.teamnameUpdate = function()
{
	this.teamnameDOM.innerHTML = this.dataMng.getTeamname();
};
