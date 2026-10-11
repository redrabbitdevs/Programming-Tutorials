class AppError(Exception):
    pass


class ConfigError(AppError):
    pass


print(ConfigError.__mro__ == (ConfigError, AppError, Exception, BaseException, object))
print(issubclass(ConfigError, Exception))
print(isinstance(ConfigError("x"), AppError))
