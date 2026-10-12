import json

import pytest


@pytest.fixture
def settings_file(tmp_path):
    """A settings file on disk with one custom value."""
    path = tmp_path / "settings.json"
    path.write_text(json.dumps({"theme": "dark"}), encoding="utf-8")
    return path


@pytest.fixture
def events():
    """A list that records set-up and tear-down, to show the fixture order."""
    log = ["setup"]
    yield log
    log.append("teardown")
    assert log == ["setup", "test body", "teardown"]
