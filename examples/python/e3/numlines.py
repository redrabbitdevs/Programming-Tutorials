import argparse
import os
import sys


def lines_of(name):
    """Yield the lines of a file, or of standard input for "-"."""
    if name == "-":
        yield from sys.stdin
    else:
        with open(name, encoding="utf-8") as file:
            yield from file


def number_lines(names):
    number = 1
    for name in names:
        for line in lines_of(name):
            print(f"{number:>4}  {line}", end="")
            number += 1


def main(argv=None):
    parser = argparse.ArgumentParser(prog="numlines")
    parser.add_argument("files", nargs="*", default=["-"],
                        help="files to number; - or none reads stdin")
    args = parser.parse_args(argv)
    try:
        number_lines(args.files)
        sys.stdout.flush()
    except KeyboardInterrupt:
        return 130  # 128 + SIGINT, what shells expect after Ctrl-C
    except BrokenPipeError:  # the reader left, as `head` does
        os.dup2(os.open(os.devnull, os.O_WRONLY), sys.stdout.fileno())
        return 1
    except OSError as error:  # after BrokenPipeError, its subclass
        print(f"numlines: {error.filename}: {error.strerror}",
              file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
