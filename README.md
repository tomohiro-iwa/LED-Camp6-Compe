# LED-Camp6-Compe
## 使いかた
### 準備
~~~:/etc/mosquitto/mosquitto.conf
listener 1883

listener 9090 127.0.0.1
protocol websockets
~~~
/etc/mosquitto/mosquitto.confに上の3行を追加

~~~
$ sudo service mosquitto restart
~~~

### 起動
~~~
$ python3 main.py
~~~

page/LED-CampMonitor.htmlをブラウザで開く  

### 競技

~~~
$ ./sh/message.sh start
~~~
で競技がスタートする

~~~
$ ./sh/on_base.sh [base番号0~3]
~~~
でベースを踏んだことになり点数が更新される

## 依存
### python package
paho-mqtt
### other
mosquitto

## 今後
gpioでベース
デザイン調整

