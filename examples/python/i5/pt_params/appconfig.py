"""Load user settings from a JSON file whose folder can be set by APP_HOME."""

import json
import os
from pathlib import Path

DEFAULTS = {"theme": "light", "font_size": 12}


def settings_path():
    home = os.environ.get("APP_HOME")
    base = Path(home) if home else Path.home() / ".app"
    return base / "settings.json"


def load_settings(path=None):
    path = Path(path) if path else settings_path()
    if not path.exists():
        return dict(DEFAULTS)
    return {**DEFAULTS, **json.loads(path.read_text(encoding="utf-8"))}
