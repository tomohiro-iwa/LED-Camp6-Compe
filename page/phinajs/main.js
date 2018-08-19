var viewdata = new ViewData();

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

function onMessageArrived(message)
{
	console.log("onMessageArrived");
	console.log(phi_obj.label);
	viewdata.update(message.payloadString);
};	

// phina.js をグローバル領域に展開
phina.globalize();

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function(opt) {
    this.superInit(opt);
    // 背景色を指定
    this.backgroundColor = '#444';
    // ラベルを生成
    timer = Label('Hello, phina.js!').addChildTo(this);
    timer.x = this.gridX.center(); // x 座標
    timer.y = this.gridY.center(); // y 座標
    timer.fill = 'white'; // 塗りつぶし色
    timer.update = function(){
	this.text = viewdata.getCompeTimeStr();
    }

    //四角を生成
    var square = RectangleShape({
    	width: 300,
	height: 300,
    }).addChildTo(this);
    square.setPosition(200,200);

  },
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    width: 800,
    height: 400,
  });
  // アプリケーション実行
  app.run();
});

