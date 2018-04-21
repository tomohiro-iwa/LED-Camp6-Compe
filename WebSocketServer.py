from websocket_server import WebsocketServer
import paho.mqtt.client as mqtt
 
mqttData = {
	"ip":"127.0.0.1",
	"port":1884,
	"topic":"LED-Camp/data"
}
# Callback functions
def new_client(client, server):
	pass#何もしない

def client_left(client, server):
	pass#何もしない
 
def message_received(client, server, message):
	#メッセージ内容を表示
	print(message)
	#すべてのクライエントにmessageを送信
	server.send_message_to_all(message)

	client = mqtt.Client(protocol=mqtt.MQTTv311)
	client.connect(mqttData["ip"],port=mqttData["port"])
	client.publish(mqttData["topic"],message)
	client.disconnect()
 
# Main
if __name__ == "__main__":
	#オブジェクトを生成
	server = WebsocketServer(port=12345, host='127.0.0.1', )
	#関数を登録
	server.set_fn_new_client(new_client)
	server.set_fn_client_left(client_left)
	server.set_fn_message_received(message_received)
	#サーバーを開始
	server.run_forever()
