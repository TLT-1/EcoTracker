import User
class DietartyChoice(User):
    def __init__(self, appliance, watts, hours_day):
        self.appliance = appliance
        self.watts = watts
        self.hours_day = hours_day