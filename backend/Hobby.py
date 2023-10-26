from User import User
class Hobby(User):
    def __init__(self, activity, freq_per_week, duration_per_day_min):
        self.activity = activity
        self.freq_per_week = freq_per_week
        self.duration_per_day_min = duration_per_day_min
    
    def activity_weekly(self):
        return f"{self.activity} {self.freq_per_week}"