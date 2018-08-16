import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

wait = 0.01
thr = 10
sensor_n = 4

mqttData = {
    "ip":"127.0.0.1",
    "port":1883,
    "topic":"LED-Camp/base"
}

client = mqtt.Client(protocol=mqtt.MQTTv311)


pin = [14,15,18,23]
low_count = [0 for i in range(sensor_n)]
befor = -1

def send_mqtt(base_id):
    client.connect(mqttData["ip"],port=mqttData["port"])
    client.publish(mqttData["topic"],str(base_id))


def main():
    GPIO.setmode(GPIO.BCM)
    
    #GPIO setup
    for i in range(sensor_n):
        GPIO.setup(pin[i],GPIO.IN)

    time.sleep(0.1)

    while True:
        for i in range(sensor_n):
            value = GPIO.input(pin[i])
            if value == False:
                low_count[i] += 1
            else:
                low_count[i] = 0

            if low_count[i] == thr:#and befor != i:
                print(i)
                send_mqtt(i)

        time.sleep(wait)

    GPIO.cleanup()

if __name__ == "__main__":
    main()
