import re
import subprocess
import sys

SNIPPETS = [
    "import sre_parse",
    "x = ~True",
    "import re; re.match('a', 'abc')",
    "import profile",
    "import tempfile\nwith tempfile.TemporaryFile('w+') as f: f.write('é')",
]

for code in SNIPPETS:
    result = subprocess.run([sys.executable, "-W", "default", "-c", code],
                            capture_output=True, text=True)
    found = re.findall(r"\b(\w+(?:Error|Warning))\b", result.stderr)
    first_line = code.splitlines()[0]
    print(f"{first_line:<34} exit {result.returncode}",
          found[-1] if found else "silent")
