# Extracts (fetched 2026-10-11 from docs.python.org/3/): library/sys.html (sys.path), library/venv.html, tutorial/modules.html

sys.path¶
A list of strings that specifies the search path for modules. Initialized from
the environment variable PYTHONPATH, plus an installation-dependent
default.
By default, as initialized upon program startup, a potentially unsafe path
is prepended to sys.path (before the entries inserted as a result
of PYTHONPATH):

python -m module command line: prepend the current working
directory.
python script.py command line: prepend the script’s directory.
If it’s a symbolic link, resolve symbolic links.
python -c code and python (REPL) command lines: prepend an empty
string, which means the current working directory.

To not prepend this potentially unsafe path, use the -P command
line option or the PYTHONSAFEPATH environment variable.
A program is free to modify this list for its own purposes.  Only strings
should be added to sys.path; all other data types are
ignored during import.

See also

Module site This describes how to use .pth files to
extend sys.path.


[...]

venv — Creation of virtual environments¶

Added in version 3.3.

Source code: Lib/venv/

The venv module supports creating lightweight “virtual environments”,
each with their own independent set of Python packages installed in
their site directories.
A virtual environment is created on top of an existing
Python installation, known as the virtual environment’s “base” Python, and by
default is isolated from the packages in the base environment,
so that only those explicitly installed in the virtual environment are
available. See Virtual Environments and site’s
virtual environments documentation
for more information.
When used from within a virtual environment, common installation tools such as
pip will install Python packages into a virtual environment
without needing to be told to do so explicitly.
A virtual environment is (amongst other things):

Used to contain a specific Python interpreter and software libraries and
binaries which are needed to support a project (library or application). These
are by default isolated from software in other virtual environments and Python
interpreters and libraries installed in the operating system.
Contained in a directory, conventionally named .venv or venv in
the project directory, or under a container directory for lots of virtual
environments, such as ~/.virtualenvs.
Not checked into source control systems such as Git.
Considered as disposable – it should be simple to delete and recreate it from
scratch. You don’t place any project code in the environment.
Not considered as movable or copyable – you just recreate the same
environment in the target location.

See PEP 405 for more background on Python virtual environments.

See also
Python Packaging User Guide: Creating and using virtual environments


[...]

6. Modules¶
If you quit from the Python interpreter and enter it again, the definitions you
have made (functions and variables) are lost. Therefore, if you want to write a
somewhat longer program, you are better off using a text editor to prepare the
input for the interpreter and running it with that file as input instead.  This
is known as creating a script.  As your program gets longer, you may want to
split it into several files for easier maintenance.  You may also want to use a
handy function that you’ve written in several programs without copying its
definition into each program.
To support this, Python has a way to put definitions in a file and use them in a
script or in an interactive instance of the interpreter. Such a file is called a
module; definitions from a module can be imported into other modules or into
the main module (the collection of variables that you have access to in a
script executed at the top level and in calculator mode).
A module is a file containing Python definitions and statements.  The file name
is the module name with the suffix .py appended.  Within a module, the
module’s name (as a string) is available as the value of the global variable
__name__.  For instance, use your favorite text editor to create a file
called fibo.py in the current directory with the following contents:
# Fibonacci numbers module

def fib(n):
    """Write Fibonacci series up to n."""
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

def fib2(n):
    """Return Fibonacci series up to n."""
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a+b
    return result



[...]

## venv: how venvs work and activation (library/venv.html, fetched 2026-10-11)

How venvs work¶
When a Python interpreter is running from a virtual environment,
sys.prefix and sys.exec_prefix
point to the directories of the virtual environment,
whereas sys.base_prefix and sys.base_exec_prefix
point to those of the base Python used to create the environment.
It is sufficient to check
sys.prefix != sys.base_prefix to determine if the current interpreter is
running from a virtual environment.
A virtual environment may be “activated” using a script in its binary directory
(bin on POSIX; Scripts on Windows).
This will prepend that directory to your PATH, so that running
python will invoke the environment’s Python interpreter
and you can run installed scripts without having to use their full path.
The invocation of the activation script is platform-specific
(<venv> must be replaced by the path to the directory
containing the virtual environment):

Platform
Shell
Command to activate virtual environment

POSIX
bash/zsh
$ source <venv>/bin/activate

fish
$ source <venv>/bin/activate.fish

csh/tcsh
$ source <venv>/bin/activate.csh

pwsh
$ <venv>/bin/Activate.ps1

Windows
cmd.exe
C:\> <venv>\Scripts\activate.bat

PowerShell
PS C:\> <venv>\Scripts\Activate.ps1

Added in version 3.4: fish and csh activation scripts.

Added in version 3.8: PowerShell activation scripts installed under POSIX for PowerShell Core
support.

You don’t specifically need to activate a virtual environment,
as you can just specify the full path to that environment’s
Python interpreter when invoking Python.
Furthermore, all scripts installed in the environment
should be runnable without activating it.
In order to achieve this, scripts installed into virtual environments have
a “shebang” line which points to the environment’s Python interpreter,
#!/<path-to-venv>/bin/python.
This means that the script will run with that interpreter regardless of the
value of PATH. On Windows, “shebang” line processing is supported if
you have the Python install manager installed. Thus, double-clicking an installed
script in a Windows Explorer window should run it with the correct interpreter
without the environment needing to be activated or on the PATH.
When a virtual environment has been activated, the VIRTUAL_ENV
environment variable is set to the path of the environment.
Since explicitly activating a virtual environment is not required to use it,
VIRTUAL_ENV cannot be relied upon to determine
whether a virtual environment is being used.

Warning
Because scripts installed in environments should not expect the
environment to be activated, their shebang lines contain the absolute paths
to their environment’s interpreters. Because of this, environments are
inherently non-portable, in the general case. You should always have a
simple means of recreating an environment (for example, if you have a
requirements file requirements.txt, you can invoke pip install -r
requirements.txt using the environment’s pip to install all of the
packages needed by the environment). If for any reason you need to move the
environment to a new location, you should recreate it at the desired
location and delete the one at the old location. If you move an environment
because you moved a parent directory of it, you should recreate the
environment in its new location. Otherwise, software installed into the
environment may not work as expected.

You can deactivate a virtual environment by typing deactivate in your shell.
The exact mechanism is platform-specific and is an internal implementation
detail (typically, a script or shell function will be used).

