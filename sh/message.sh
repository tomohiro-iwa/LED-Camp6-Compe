#! /bin/sh
mosquitto_pub -p 1883 -t "LED-Camp/message" -m $1 
