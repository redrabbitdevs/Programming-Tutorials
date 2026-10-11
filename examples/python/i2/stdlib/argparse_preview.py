import argparse

parser = argparse.ArgumentParser(description="Repeat a word.")
parser.add_argument("word")
parser.add_argument("--count", type=int, default=1)
parser.add_argument("--shout", action="store_true")

args = parser.parse_args(["--count", "3", "hello"])
text = args.word.upper() if args.shout else args.word
print(" ".join([text] * args.count))

args = parser.parse_args(["--shout", "hi"])
print(args.word, args.count, args.shout)
