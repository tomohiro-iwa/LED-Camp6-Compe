# LED-Camp6-Compe
## 使いかた
~~~
$ mosquitto　-p 1884
~~~

~~~
$ python3 main.py
~~~

~~~
$ python3 WebSocketServer.py
~~~

の3つをそれぞれ別プロセスで走らせている状態で  
page/LED-CampMonitor.htmlをブラウザで開く  

- port 1884
- topic LED-Camp/base
- value 0~3の整数  

でパブリッシュするとベースを踏んだ事になり  
ページに表示されている情報が更新される  

## 依存パッケージ
websocket-server
websocket-client
paho-mqtt

## 今後
gpioでベース
デザイン調整
システム見直し
