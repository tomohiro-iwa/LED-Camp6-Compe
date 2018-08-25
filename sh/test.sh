#! /bin/bash
for i in {0..99}
do
./message.sh start
sleep 1s
./message.sh stop
sleep 1s
done

