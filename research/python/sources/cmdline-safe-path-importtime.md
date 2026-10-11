# Extract: Command line and environment (fetched 2026-10-11 from https://docs.python.org/3/using/cmdline.html)


-P¶
Don’t prepend a potentially unsafe path to sys.path:

python -m module command line: Don’t prepend the current working
directory.
python script.py command line: Don’t prepend the script’s directory.
If it’s a symbolic link, resolve symbolic links.
python -c code and python (REPL) command lines: Don’t prepend an
empty string, which means the current working directory.

See also the PYTHONSAFEPATH environment variable, and -E
and -I (isolated) options.

Added in version 3.11.





-q¶
Don’t display the copyright and version messages even in interactive mode.

Added in version 3.2.





-R¶
Turn on hash randomization. This option only has an effect if the
PYTHONHASHSEED environment variabl

[...]

-X importtime to show how long each import takes. It shows module
name, cumulative time (including nested imports) and self time (excluding
nested imports).  Note that its output may be broken in multi-threaded
application.  Typical usage is python -X importtime -c 'import asyncio'.
-X importtime=2 enables additional output that indicates when an
imported module has already been loaded.  In such cases, the string
cached will be printed in both time columns.
See also PYTHONPROFILEIMPORTTIME.

Added in version 3.7.


Changed in version 3.14: Added -X importtime=2 to also trace imports of loaded modules,
and reserved values other than 1 and 2 for future use.


-X dev: enable Python Development Mode, introducing
additional runtime checks that are too expensive to be enabled by
default.  See also PYTHONDEVMODE.

Added in version 3.7.


-X utf8 enables the Python UTF-8 Mode.
-X utf8=0 explicit
