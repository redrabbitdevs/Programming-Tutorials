import shlex
import subprocess

# Imagine this came from a web form. The payload only runs `echo`.
name = "report.txt; echo INJECTED: a second command ran"


def show(label, **kwargs):
    result = subprocess.run(capture_output=True, text=True, **kwargs)
    print(label)
    print("   ", result.stdout.rstrip().replace("\n", "\n    "))


show("list of arguments, no shell:", args=["echo", name])
show("shell=True and an f-string:", args=f"echo {name}", shell=True)
show("shell=True and shlex.quote:",
     args=f"echo {shlex.quote(name)}", shell=True)
