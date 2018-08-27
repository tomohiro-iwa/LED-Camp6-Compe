import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

wait = 0.01
thr = 10
sensor_n = 4

mqttc = mqtt.Client(protocol=mqtt.MQTTv311)
mqttc.connect("192.168.20.52",1883,60)
mqttc.loop_start()


pin = [14,15,18,23]
low_count = [0 for i in range(sensor_n)]
befor = -1

def send_mqtt(base_id):
    mqttc.publish("LED-Camp/data",str(base_id))


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
