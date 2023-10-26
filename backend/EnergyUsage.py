from User import User
class EnergyUsage(User):
    def __init__(self, appliance, watts, hours_day):
        self.appliance = appliance
        self.watts = watts
        self.hours_day = hours_day
        
    def watts_days(self):
        return f"{self.watts} in {self.hours_day}"