class ValidationError(Exception):
    def __init__(self, field, message):
        super().__init__(f"{field}: {message}")
        self.field = field
        self.message = message


def validate(record):
    if not record.get("name"):
        raise ValidationError("name", "is required")
    if record.get("age", 0) < 0:
        raise ValidationError("age", "must not be negative")
    return record


records = [{"name": "Asha", "age": 30}, {"name": "", "age": 5}, {"name": "Ben", "age": -1}]
for record in records:
    try:
        validate(record)
        print("valid")
    except ValidationError as error:
        print("invalid field", error.field, "-", error.message)
