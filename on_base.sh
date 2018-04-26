#! /bin/sh
mosquitto_pub -p 1884 -t LED-Camp/base -m $1

