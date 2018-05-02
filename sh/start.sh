#! /bin/sh

python3 WebSocketServer.py &
ws=$!

sleep 10

python3 main.py &
main=$!

read a

kill $ws
kill $main
