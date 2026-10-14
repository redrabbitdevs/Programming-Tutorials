import contextlib
import io
import tempfile
import unittest
from pathlib import Path

from todo.cli import main


def run(*argv):
    """Call main() in-process and return (exit code, stdout, stderr)."""
    out, err = io.StringIO(), io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
        try:
            code = main(list(argv))
        except SystemExit as exit_request:
            code = exit_request.code
    return code, out.getvalue(), err.getvalue()


class TodoCliTest(unittest.TestCase):
    def setUp(self):
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.file = str(Path(folder.name, "todo.json"))

    def test_add_then_list(self):
        run("--file", self.file, "add", "Ship it")
        code, out, err = run("--file", self.file, "list")
        self.assertEqual((code, out, err), (0, " 1 [ ] Ship it\n", ""))

    def test_unknown_task_is_exit_1_on_stderr(self):
        code, out, err = run("--file", self.file, "done", "3")
        self.assertEqual((code, out), (1, ""))
        self.assertIn("no task #3", err)

    def test_bad_usage_is_exit_2(self):
        code, _, err = run("--file", self.file, "done")
        self.assertEqual(code, 2)
        self.assertIn("usage: todo done", err)


if __name__ == "__main__":
    unittest.main()
