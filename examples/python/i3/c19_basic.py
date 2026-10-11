class AppError(Exception):
    """Base class for every error this application raises."""


try:
    raise AppError("something went wrong")
except AppError as error:
    print(type(error).__name__, "-", error)
