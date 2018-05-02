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
        self.gameTime = 120

    def end(self):
        self.__init__()
        print("end")

    def start(self):
        self.inGame = True
        self.startTime = time.time()
        self.startTime = time.time() + self.gameTime
        print("start")

    def load(self,data):
        #工事中
        pass

    def onBase(self,baseID):
        self.beforBase = baseID
        self.point += self.base[baseID]

        self.update(baseID)

        data = self.makeData()
        data["baseID"] = baseID
        print(data)
        return json.dumps(data)

    def makeData(self):
        data = {
            "point":self.point,
            "start":self.startTime,
            "limit":self.limitTime,
            "time":time.time(),
            "baseID":-1,
            "base":self.base,
        }
        return data

    def update(self,beforBase):
        for i in range(4):
            self.base[i]=random.randint(-1,1)

