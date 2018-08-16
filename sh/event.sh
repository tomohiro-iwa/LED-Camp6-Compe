#! /bin/sh
mosquitto_pub -p 1883 -t "LED-Camp/point" -m "1,-1,0,1" 
