import sys

from .counting import top_words


def main():
    text = " ".join(sys.argv[1:])
    for word, count in top_words(text, 3):
        print(word, count)
