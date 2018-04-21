from CompeManager import CompeManager
from websocket import create_connection
import paho.mqtt.client as mqtt

mqttData = {
	"ip":"127.0.0.1",
	"port":1884,
	"topic":"LED-Camp/data"
}


def onMessage(client,userdata,msg):
	print(msg.payload)
	baseID = int(msg.payload)
	data = compe.onBase(baseID)
	print(data)
	create_connection("ws://127.0.0.1:12345").send(data)

def onConnect(client,userdata,flags,responsCode):
	client.subscribe(mqttData["topic"])


compe = CompeManager()
if __name__ == "__main__":
	client = mqtt.Client(protocol=mqtt.MQTTv311)
	client.on_message = onMessage
	client.on_connect = onConnect
	client.connect(mqttData["ip"],port=mqttData["port"],keepalive=60)
	client.loop_forever()

