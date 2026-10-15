from pathlib import Path

import pytest

from jobrun.builtin import Wait
from jobrun.config import load_config, parse_config, parse_job
from jobrun.models import ConfigError


def test_a_good_job_becomes_its_plugin() -> None:
    job = parse_job({"id": "s", "kind": "wait", "seconds": 2})
    assert job == Wait("s", 2.0)


@pytest.mark.parametrize(
    ("raw", "message"),
    [
        ({"id": "x", "kind": "teleport"}, "unknown kind"),
        ({"id": "s", "kind": "wait", "seconds": -1}, "'seconds' >= 0"),
        ({"id": "s", "kind": "wait"}, "'seconds' >= 0"),
        ({"kind": "wait", "seconds": 1}, "string id and kind"),
        ("wait 1", "string id and kind"),
    ],
)
def test_bad_jobs_are_refused(raw: object, message: str) -> None:
    with pytest.raises(ConfigError, match=message):
        parse_job(raw)


@pytest.mark.parametrize(
    "data",
    [{"timeout": 0, "workers": 1, "jobs": []}, {"workers": 1, "jobs": []}, []],
)
def test_bad_config_is_refused(data: object) -> None:
    with pytest.raises(ConfigError, match="positive 'timeout'"):
        parse_config(data)


def test_invalid_json_is_a_config_error(tmp_path: Path) -> None:
    path = tmp_path / "jobs.json"
    path.write_text("{not json", encoding="utf-8")
    with pytest.raises(ConfigError, match="not valid JSON"):
        load_config(path)
