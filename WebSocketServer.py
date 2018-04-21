from websocket_server import WebsocketServer
import paho.mqtt.client as mqtt

mqttData = {
	"ip":"127.0.0.1",
	"port":1884,
	"topic":"LED-Camp/data"
}

def message_received(client, server, message):
	print(message)
	server.send_message_to_all(message)

	client = mqtt.Client(protocol=mqtt.MQTTv311)
	client.connect(mqttData["ip"],port=mqttData["port"])
	client.publish(mqttData["topic"],message)
	client.disconnect()


if __name__ == "__main__":
	server = WebsocketServer(port=12345, host='127.0.0.1', )
	server.set_fn_message_received(message_received)
	server.run_forever()
