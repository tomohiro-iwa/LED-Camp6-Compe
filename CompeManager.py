import json

class CompeManager:
	def __init__(self):
		self.point = 0
		self.base = [0,0,0,0]
		self.beforBase = -1


	def onBase(self,baseID):
		self.beforBase = baseID
		self.point += self.base[baseID]

		self.update(baseID)

		data = json.dumps({"point":self.point,"baseID":baseID,"base":self.base})
		print(data)

		return json.dumps(data)


	def update(self,beforBase):
		pass


if __name__ == "__main__":
	compe = CompeManager()
	compe.onBase(1)
