from User import User
class DietartyChoice(User):
    def __init__(self, diet_level, food):
        self.diet_level = diet_level
        self.food = food
        
    def food_level(self):
        return f"{self.food} {self.diet_level}"