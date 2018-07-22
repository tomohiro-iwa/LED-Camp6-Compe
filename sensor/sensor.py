import RPi.GPIO as GPIO
import time

mqttData = {
    "ip":"127.0.0.1",
    "port":1883,
    "topic":"LED-Camp/data"
}

sensor_n = 4
pin = [14,15,18,23]
old = [True for i in range(sensor_n)]

if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM)

    for i in range(sensor_n):
        GPIO.setup(pin[i],GPIO.IN)

    for _ in range(100000):
        for i in range(sensor_n):
            value = GPIO.input(pin[i])
            if value == False and old[i] == True:
                #client = mqtt.Client(protocol=mqtt.MQTTv311)
                #client.connect(mqttData["ip"],port=mqttData["port"])
                #client.publish(mqttData["topic"],str(i))
                print(i)
            old[i] = value
        time.sleep(0.1)

    GPIO.cleanup()

