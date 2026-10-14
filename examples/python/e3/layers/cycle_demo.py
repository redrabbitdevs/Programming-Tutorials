import subprocess
import sys

RUNS = {
    "cyclic": "from cyclic.customers import Customer\n"
              "print(Customer('Ana').place(9).total)",
    "acyclic": "from acyclic.customers import Customer\n"
               "from acyclic.orders import place\n"
               "print(place(Customer('Ana'), 9).total)",
}
for package, code in RUNS.items():
    result = subprocess.run([sys.executable, "-c", code],
                            capture_output=True, text=True)
    error = result.stderr.strip().splitlines()[-1:] or [""]
    print(f"{package}:", result.stdout.strip() or error[0].split(" (/")[0])
