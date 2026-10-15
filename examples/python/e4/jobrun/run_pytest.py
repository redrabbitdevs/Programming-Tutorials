"""Run the pytest tests in tests/ from validate.sh.

pytest is a third-party package. If it is not installed, this script installs it into
a temporary folder first, so the check also runs on a machine that has only the
standard library. It then checks the outcome itself: every test must pass and the count must match EXPECTED_PASSED.

Unlike the other run_pytest.py scripts, the run is under a main guard: one test
starts a process pool, and its worker processes import this script again.
"""

import contextlib
import io
import subprocess
import sys
import tempfile

EXPECTED_PASSED = 22


def load_pytest():
    try:
        import pytest
    except ImportError:
        target = tempfile.mkdtemp(prefix="pytest-")
        pip = [sys.executable, "-m", "pip", "install", "--quiet", "--target", target, "pytest==9.1.1"]
        if subprocess.run(pip, capture_output=True).returncode != 0:
            subprocess.run([sys.executable, "-m", "ensurepip"], capture_output=True)
            subprocess.run(pip, check=True, capture_output=True)
        sys.path.insert(0, target)
        import pytest
    return pytest


class Count:
    passed = 0
    failed = 0

    def pytest_runtest_logreport(self, report):
        if report.when == "call":
            Count.passed += report.passed
            Count.failed += report.failed


if __name__ == "__main__":
    pytest = load_pytest()
    sys.dont_write_bytecode = True
    # pytest's own report depends on its version and the terminal width, so hide it
    # and print only the counts, which are the same everywhere.
    with contextlib.redirect_stdout(io.StringIO()):
        code = int(pytest.main(["-qq", "--tb=no", "-p", "no:cacheprovider", "tests"], plugins=[Count()]))
    print(f"exit code {code}, {Count.passed} passed, {Count.failed} failed")
    if code != 0 or Count.passed != EXPECTED_PASSED:
        raise SystemExit(1)
