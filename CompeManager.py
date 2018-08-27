import json
import random
import time

class CompeManager:
    def __init__(self):
        self.stopTime = 0
        self.limitTime = 0
        self.point = 0
        self.base = [0,0,0,0]
        self.beforBase = -1
        self.inGame = False

        #Game Config
        self.gameTime = 50

    def start(self):
        self.inGame = True
        self.stopTime = 0
	self.beforBase = random.randint(0,3)
        now = time.time()
        self.limitTime = now + self.gameTime
        self.update()
        return self.makeJson(msg="start")

    def stop(self):
        self.inGame = False
        now = time.time();
        self.stopTime = self.limitTime - now
        return self.makeJson(msg="stop")

    def restart(self):
        now = time.time()
        if self.stopTime == 0:
          return self.makeJson(msg="can't restart")
        self.inGame = True
        self.limitTime = now + self.stopTime
        self.stopTime = 0
        return self.makeJson(msg="restart")

    def onBase(self,baseID):
        data = ""
        now = time.time();
        if self.inGame and now < self.limitTime:
            self.beforBase = baseID
            self.point += self.base[baseID]

            self.update()
            data = self.makeJson(msg="onBase",place=baseID)

        return data

    def getData4Tank(self):
        result = ""
        for i in range(4):
            result+=str(self.base[i])+","
        result+=str(self.beforBase)
	
        return result
        

    def makeJson(self,msg="",place=-1):
        now = time.time()
        baseDict = {}

        for i in range(4):
          baseDict[str(i)] = self.base[i]

        data = {
            "point":self.point,
            "limit":self.limitTime,
            "base":baseDict,
            "stoptime":self.stopTime,
            "event":{
                "msg":msg,
                "place":place,
                "time":now
            }
        }
        #print(msg)
        print(json.dumps(data))
        return json.dumps(data)

    def update(self):
        for i in range(4):
            if i == self.beforBase:
	        self.base[i] = 0
	    if i == (self.beforBase+2)%4:
	    	self.base[i] = 2
	    else:
	        self.base[i] = 1
