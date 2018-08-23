#! /bin/sh
pay=""
for i in (1 2 3);
do
	read data <ranking.txt
	pay=${pay}${data},
done
mosquitto_pub -p 1883 -t "LED-Camp/ranking" -m "$pay"
