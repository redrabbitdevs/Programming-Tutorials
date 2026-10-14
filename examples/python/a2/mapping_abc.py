from collections.abc import Mapping


class EnvView(Mapping):
    """Read-only view of the variables that start with a prefix."""

    def __init__(self, environ, prefix):
        self._environ = environ
        self._prefix = prefix

    def __getitem__(self, key):
        return self._environ[self._prefix + key]

    def __iter__(self):
        n = len(self._prefix)
        return (k[n:] for k in self._environ if k.startswith(self._prefix))

    def __len__(self):
        return sum(1 for _ in self)


env = {"APP_HOST": "db", "APP_PORT": "5432", "HOME": "/home/ada"}
app = EnvView(env, "APP_")
print(dict(app), len(app))
print("PORT" in app, app.get("USER", "-"), app == {"HOST": "db", "PORT": "5432"})
