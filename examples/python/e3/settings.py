from dataclasses import dataclass, field

TRUE = {"1", "true", "yes", "on"}


class ConfigError(Exception):
    """The environment does not describe a runnable service."""


@dataclass(frozen=True)
class Settings:
    port: int
    debug: bool
    database_url: str = field(repr=False)  # may hold a password
    api_key: str = field(repr=False)

    @classmethod
    def from_env(cls, env):
        try:
            port = int(env.get("SHOP_PORT", "8000"))
        except ValueError:
            raise ConfigError("SHOP_PORT must be a whole number") from None
        if "SHOP_API_KEY" not in env:
            raise ConfigError("SHOP_API_KEY is required")
        return cls(
            port=port,
            debug=env.get("SHOP_DEBUG", "").lower() in TRUE,
            database_url=env.get("SHOP_DATABASE_URL", "sqlite:///shop.db"),
            api_key=env["SHOP_API_KEY"],
        )


url = "postgresql://shop:s3cret@db.internal/shop"
print(Settings.from_env({"SHOP_API_KEY": "k-91f2", "SHOP_DEBUG": "yes",
                        "SHOP_DATABASE_URL": url}))
for env in ({"SHOP_PORT": "80a", "SHOP_API_KEY": "k"}, {}):
    try:
        Settings.from_env(env)
    except ConfigError as error:
        print("ConfigError:", error)
