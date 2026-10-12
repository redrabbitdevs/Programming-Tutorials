import pytest

from spendlog.cli import main


def test_summary_for_one_month(csv_file, capsys):
    code = main(["--file", str(csv_file), "--month", "2026-03"])

    assert code == 0
    last_line = capsys.readouterr().out.splitlines()[-1]
    assert last_line.split() == ["total", "711.65"]


def test_missing_file_gives_exit_code_1(tmp_path, capsys):
    code = main(["--file", str(tmp_path / "none.csv")])

    assert code == 1
    assert "cannot find" in capsys.readouterr().err


@pytest.mark.parametrize("month", ["2026-13", "March", "2026"])
def test_bad_month_is_a_usage_error(month):
    with pytest.raises(SystemExit) as stop:
        main(["--month", month])
    assert stop.value.code == 2
