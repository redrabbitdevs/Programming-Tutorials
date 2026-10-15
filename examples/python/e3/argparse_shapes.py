import argparse

common = argparse.ArgumentParser(add_help=False)
common.add_argument("-v", "--verbose", action="count", default=0)

parser = argparse.ArgumentParser(prog="fetch", parents=[common])
parser.add_argument("--version", action="version", version="fetch 1.0")
parser.add_argument("urls", nargs="+", metavar="URL")
parser.add_argument("--retries", type=int, default=3)
parser.add_argument("--format", choices=["json", "csv"], default="json")
parser.add_argument("-H", "--header", action="append", default=[])
parser.add_argument("--color", action=argparse.BooleanOptionalAction,
                    default=True)
output = parser.add_mutually_exclusive_group()
output.add_argument("-q", "--quiet", action="store_true")
output.add_argument("-o", "--output", metavar="FILE")

args = parser.parse_args(["-vv", "--format", "csv", "-H", "A: 1",
                          "-H", "B: 2", "--no-color", "https://a.example"])
for name, value in vars(args).items():
    print(f"{name:<8} {value!r}")
