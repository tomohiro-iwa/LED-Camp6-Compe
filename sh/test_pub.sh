#! /bin/bash

for i in {0..99}
do
mosquitto_pub -p 1883 -t "LED-Camp/test" -m "$i"
done
