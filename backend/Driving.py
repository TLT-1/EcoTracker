from User import User
class Driving(User):
    def __init__(self, year, make, model, avg_speed):
        self.year = year
        self.make = make
        self.model = model
        self.avg_speed = avg_speed
    
    def car(self):
        return f"{self.year} {self.make} {self.model}"