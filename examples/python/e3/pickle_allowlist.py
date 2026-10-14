import io
import pickle
from datetime import date


class AllowListUnpickler(pickle.Unpickler):
    ALLOWED = {("datetime", "date")}

    def find_class(self, module, name):
        if (module, name) in self.ALLOWED:
            return super().find_class(module, name)
        raise pickle.UnpicklingError(f"{module}.{name} is not allowed")


def safe_loads(data):
    return AllowListUnpickler(io.BytesIO(data)).load()


class Surprise:
    def __reduce__(self):
        return (print, ("this must not run",))


print(safe_loads(pickle.dumps({"due": date(2026, 10, 14)})))
try:
    safe_loads(pickle.dumps(Surprise()))
except pickle.UnpicklingError as error:
    print("refused:", error)
