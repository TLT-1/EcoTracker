import User
class DietartyChoice(User):
    def __init__(self, diet_level, food):
        self.diet_level = diet_level
        self.food = food