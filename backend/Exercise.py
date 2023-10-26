from User import User
class Exercise(User):
    def __init__(self, activity, freq_per_week, duration_per_day_min):
        self.activity = activity
        self.freq_per_week = freq_per_week
        self.duration_per_day_min = duration_per_day_min
        
    def exercise(self):
        return f"{ self.duration_per_day_min} {self.freq_per_week}"
    
