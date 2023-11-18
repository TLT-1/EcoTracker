class User:
    def __init__(self, _id, first_name, last_name, gender, age, weight_lb, dob):
        self.id = _id
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.age = age
        self.weight_lb = weight_lb
        self.dob = dob
    
    def name(self):
        return f"{self.first_name} {self.last_name}"