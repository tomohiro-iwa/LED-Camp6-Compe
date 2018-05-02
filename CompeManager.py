import json
import random
import time

class CompeManager:
    def __init__(self):
        self.startTime = 0
        self.limitTime = 0
        self.point = 0
        self.base = [0,0,0,0]
        self.beforBase = -1
        self.inGame = False

        #Game Config
        self.gameTime = 20

    def end(self):
        self.__init__()
        print("end")
        return self.makeJson(msg="end",time=now)

    def start(self):
        self.inGame = True
        now = time.time()
        self.startTime = now
        self.limitTime = now + self.gameTime
        print("start")
        return self.makeJson(msg="start",time=now)

    def load(self,data):
        #工事中
        pass

    def onBase(self,baseID):
        now = time.time()
        data = ""
        if self.inGame and now < self.limitTime:
            self.beforBase = baseID
            self.point += self.base[baseID]

            self.update(baseID)
            data = self.makeJson(msg="onBase",place=baseID,time=now)
        else:
            data = self.makeJson(msg="time over",place=baseID,time=now)

        print(data)
        return data

    def makeJson(self,msg="",place=-1,time=-1):
        data = {
            "state":{
                "point":self.point,
                "start":self.startTime,
                "limit":self.limitTime,
                "base":self.base,
            },
            "event":{
                "msg":msg,
                "place":place,
                "time":time,
            }
        }
        return json.dumps(data)

    def update(self,beforBase):
        for i in range(4):
            self.base[i]=random.randint(-1,1)

