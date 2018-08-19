#! /usr/bin/python3

from CompeManager import CompeManager
import json
import paho.mqtt.client as mqtt

mqttData = {
    "ip":"127.0.0.1",
    "port":1883,
    "topic":"LED-Camp/data"
}

def send(message):
    client = mqtt.Client(protocol=mqtt.MQTTv311)
    client.connect(mqttData["ip"],port=mqttData["port"])

    client.publish(mqttData["topic"],message)
    client.publish("LED-Camp/points",message)

    client.disconnect()


def onMessage(client,userdata,msg):
    data = json.dumps({"event":{"mgs":"initial data"}})
    if msg.topic == "LED-Camp/message":
        if msg.payload == b"start":
            data = compe.start()

        if msg.payload == b"end":
            data = compe.end()
    else:
        baseID = int(msg.payload)
        data = compe.onBase(baseID)

    send(data)


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

