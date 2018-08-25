#! /bin/bash
pay=""
while read data
do
	pay=${pay}${data},
done < ./ranking.txt
mosquitto_pub -p 1883 -t "LED-Camp/ranking" -m "$pay"
