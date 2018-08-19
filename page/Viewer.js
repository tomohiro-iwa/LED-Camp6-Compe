var Viewer = function(dataMng){
	this.dataMng = dataMng;

	var canvas = document.getElementById("canvas");
	this.ctx = canvas.getContext("2d");

	this.myPointDOM = document.getElementById("my-point");
	this.countDOM = document.getElementById("countdown-timer")

	this.isTimerActive = false;

	/* Imageオブジェクトを生成 */
	this.img = LED_RED;
	this.draw();
};

Viewer.prototype.update = function()
{
	//獲得点を更新
	var point = this.dataMng.getMyPoint();
	this.myPointDOM.innerHTML = ""+point;
	
	//timerの状態更新
	if(!this.isTimerActive && this.dataMng.inGameTime())
	{
		this.isTimerActive = true;
		this.timerID = setInterval(this.timeUpdate.bind(this),10);
	}

	//canvasを更新
	this.draw();
	//
	//
	this.test();
};

Viewer.prototype.draw = function()
{
};

Viewer.prototype.test = function()
{
	this.ctx.beginPath();
	this.ctx.moveTo(0, 0);
	this.ctx.lineTo(400, 0);
	this.ctx.lineTo(400, 400);
	this.ctx.lineTo(0, 400);
	this.ctx.closePath();
	this.ctx.stroke();
	/* 画像を描画 */
	this.ctx.scale(2,2);
	this.ctx.drawImage(this.img, 0, 0);
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
