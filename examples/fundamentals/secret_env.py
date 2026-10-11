import os

key = os.environ.get("TUTORIAL_API_KEY")
if key is None:
    print("TUTORIAL_API_KEY is not set")
else:
    print("key loaded, length", len(key))
