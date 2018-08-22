#! /bin/sh
mosquitto_pub -p 1883 -t "LED-Camp/teamname" -m $1 
