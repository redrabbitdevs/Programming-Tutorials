import contextlib
import shlex
import sys
import tempfile

from todo.cli import main


def run(command_line):
    """Run one command line as a shell would, and show its exit code."""
    print("$", command_line)
    argv = shlex.split(command_line)[1:]
    with contextlib.redirect_stderr(sys.stdout):
        try:
            code = main(argv)
        except SystemExit as exit_request:
            code = exit_request.code
    print(f"[exit {code}]")


with tempfile.TemporaryDirectory() as folder, contextlib.chdir(folder):
    run("todo add 'Write the release notes'")
    run("todo add 'Tag v1.0'")
    run("todo done 1")
    run("todo list")
    run("todo done 7")
    run("todo done one")
    run("todo")
