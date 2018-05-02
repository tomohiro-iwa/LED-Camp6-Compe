from CompeManager import CompeManager
from websocket import create_connection
import paho.mqtt.client as mqtt

mqttData = {
    "ip":"127.0.0.1",
    "port":1883,
    "topic":"LED-Camp/data"
}

def addLog(txt):
    with open("data/log.txt","a") as f:
        f.write(txt)

def onBase(baseID):
    data = compe.onBase(baseID)
    addLog(data)

    create_connection("ws://127.0.0.1:12345").send(data)

def onMessage(client,userdata,msg):
    if msg.topic == "LED-Camp/message":
        if msg.payload == b"start":
            data = compe.start()

        if msg.payload == b"end":
            data = compe.end()
        
        addLog(data)

        create_connection("ws://127.0.0.1:12345").send(data)
        return

    baseID = int(msg.payload)
    onBase(baseID)

def onConnect(client,userdata,flags,responsCode):
    client.subscribe("LED-Camp/base")
    client.subscribe("LED-Camp/message")


compe = CompeManager()
if __name__ == "__main__":
    client = mqtt.Client(protocol=mqtt.MQTTv311)
    client.on_message = onMessage
    client.on_connect = onConnect
    client.connect(mqttData["ip"],port=mqttData["port"],keepalive=60)
    client.loop_forever()

