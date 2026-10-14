import argparse
import contextlib
import sys


def show(args):
    print("showing notes")


parser = argparse.ArgumentParser(prog="notes")
sub = parser.add_subparsers(dest="command", required=True)
sub.add_parser("show").set_defaults(handler=show)

with contextlib.redirect_stderr(sys.stdout):
    for argv in (["show"], []):
        try:
            args = parser.parse_args(argv)
            args.handler(args)
        except SystemExit as exit_request:
            print("[exit", str(exit_request.code) + "]")
