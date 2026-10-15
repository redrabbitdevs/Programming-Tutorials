import io
import json
from pathlib import Path

import pytest

from jobrun.cli import main


def write_jobs(folder: Path, jobs: list[dict[str, object]]) -> Path:
    path = folder / "jobs.json"
    data = {"timeout": 1.0, "workers": 1, "jobs": jobs}
    path.write_text(json.dumps(data), encoding="utf-8")
    return path


def test_all_ok_exits_0_and_reports(tmp_path: Path) -> None:
    path = write_jobs(tmp_path, [
        {"id": "w", "kind": "words", "text": "to be or not to be"},
        {"id": "p", "kind": "primes", "below": 20},
    ])
    out = io.StringIO()
    assert main([str(path)], out=out) == 0
    assert out.getvalue().splitlines() == [
        "w  ok        to=2, be=2, or=1",
        "p  ok        8 primes below 20",
        "2 jobs: 2 ok",
    ]


def test_json_logs_name_the_job(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    path = write_jobs(tmp_path, [{"id": "w", "kind": "words", "text": "hi"}])
    argv = [str(path), "--log-level", "INFO", "--log-format", "json"]
    assert main(argv, out=io.StringIO()) == 0
    err = capsys.readouterr().err
    records = [json.loads(line) for line in err.splitlines()]
    assert records == [
        {"level": "INFO", "job": "w", "message": "started"},
        {"level": "INFO", "job": "w", "message": "ok: hi=1"},
    ]


def test_bad_config_exits_2(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    path = write_jobs(tmp_path, [{"id": "x", "kind": "teleport"}])
    assert main([str(path)]) == 2
    assert capsys.readouterr().err == "jobrun: x: unknown kind 'teleport'\n"
