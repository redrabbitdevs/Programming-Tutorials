class SnakeCase:
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        for key, value in vars(cls).items():
            if callable(value) and key != key.lower():
                raise TypeError(f"{cls.__name__}.{key} is not snake_case")
