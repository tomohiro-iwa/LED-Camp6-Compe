//通信用のオブジェクトを生成
var connection = new WebSocket("ws://127.0.0.1:12345");

connection.onopen = function()
{
	//通信が開始されたことを通知
	console.log("open");
};

connection.onerror = function(error)
{
	//errorを通知
	console.log("error");
};

//メッセージが送られてきた時に実行される関数
connection.onmessage = function(e)
{
	//id talk_boxの中に送られてきた内容を追記
	var obj = JSON.parse(e.data);//refactaring
	var obj = JSON.parse(obj);
	console.log(obj);
	
	document.getElementById("talk_box").innerHTML+= obj.point+"<br>"
};

//sendボタンが押された時に実行される関数
function send_message()
{
	//id msg_boxに書かれたテキストを変数messageに代入
	var message = document.getElementById("msg_box").value;
	//サーバにmessageに代入された文字列を送信
	connection.send(message);
}
