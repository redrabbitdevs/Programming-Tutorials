class ConfigError(Exception):
    pass


def read_workers(env):
    text = env.get("SHOP_WORKERS", "4")
    try:
        workers = int(text)
    except ValueError:
        raise ConfigError(f"SHOP_WORKERS must be a whole number, "
                          f"not {text!r}") from None
    if not 1 <= workers <= 32:
        raise ConfigError(f"SHOP_WORKERS must be 1 to 32, not {workers}")
    return workers


for env in ({}, {"SHOP_WORKERS": "8"}, {"SHOP_WORKERS": "0"},
            {"SHOP_WORKERS": "many"}):
    try:
        print(read_workers(env))
    except ConfigError as error:
        print("ConfigError:", error)
