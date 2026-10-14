import contextlib
import sys

from todo.cli import build_parser

parser = build_parser()
with contextlib.redirect_stderr(sys.stdout):
    try:
        parser.parse_args(["lst"])
    except SystemExit as exit_request:
        print("[exit", str(exit_request.code) + "]")
