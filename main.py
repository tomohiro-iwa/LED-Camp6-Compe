#! /usr/bin/python3

from CompeManager import CompeManager
import json
import paho.mqtt.client as mqtt

compe = CompeManager()


def onMessage(client,userdata,msg):
    data = json.dumps({"event":{"msg":"initial data"}})
    if msg.topic == "LED-Camp/message":
        if msg.payload == b"start":
            data = compe.start()

        if msg.payload == b"stop":
            data = compe.stop()

        if msg.payload == b"restart":
            data = compe.restart()
    else:
        baseID = int(msg.payload)
        data = compe.onBase(baseID)
        mqttc.publish("LED-Camp/point",compe.getData4Tank(),2)

    mqttc.publish("LED-Camp/data",data,2)

mqttc = mqtt.Client(protocol=mqtt.MQTTv311)
mqttc.on_message = onMessage
mqttc.connect("127.0.0.1",1883,60)
mqttc.subscribe("LED-Camp/base")
mqttc.subscribe("LED-Camp/message")
mqttc.loop_forever()

