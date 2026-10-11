import argparse

parser = argparse.ArgumentParser(description="Greet someone.")
parser.add_argument("name")
parser.add_argument("--times", type=int, default=1)

args = parser.parse_args(["Ana", "--times", "2"])
for _ in range(args.times):
    print(f"Hello, {args.name}!")
