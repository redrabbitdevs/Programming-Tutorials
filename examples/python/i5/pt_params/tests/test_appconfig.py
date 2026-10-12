from pathlib import Path

from appconfig import DEFAULTS, load_settings, settings_path


def test_missing_file_gives_the_defaults(tmp_path):
    assert load_settings(tmp_path / "nothing-here.json") == DEFAULTS


def test_file_values_override_defaults(settings_file):
    settings = load_settings(settings_file)
    assert settings["theme"] == "dark"
    assert settings["font_size"] == 12


def test_settings_path_follows_app_home(monkeypatch, tmp_path):
    monkeypatch.setenv("APP_HOME", str(tmp_path))
    assert settings_path() == tmp_path / "settings.json"


def test_settings_path_falls_back_to_the_home_folder(monkeypatch):
    monkeypatch.delenv("APP_HOME", raising=False)
    assert settings_path() == Path.home() / ".app" / "settings.json"


def test_load_settings_uses_app_home(monkeypatch, settings_file):
    monkeypatch.setenv("APP_HOME", str(settings_file.parent))
    assert load_settings()["theme"] == "dark"


def test_fixture_teardown_runs_after_the_test(events):
    events.append("test body")
    assert events == ["setup", "test body"]
