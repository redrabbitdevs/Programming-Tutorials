# docs.python.org/3/library/logging.html, logging.basicConfig (extract, fetched 2026-10-11)

Does basic configuration for the logging system by either creating a
StreamHandler with a default Formatter
or using the  given formatter instance, and adding it to the
root logger. The functions debug(), info(), warning(),
error() and critical() will call basicConfig() automatically
if no handlers are defined for the root logger.
This function does nothing if the root logger already has handlers
configured, unless the keyword argument force is set to True.
Note
have a formatter set will be assigned the
default formatter created in this function.
Note that this argument is incompatible
with filename or stream - if both
are present, a ValueError is raised.
force
If this keyword argument is specified as
true, any existing handlers attached to the
root logger are removed and closed, before
carrying out the configuration as specified
by the other arguments.
encoding
If this keyword argument is specified along
with filename, its value is used when the
FileHandler is created, and thus
used when opening the output file.
errors
If this keyword argument is specified along
with filename, its value is used when the
FileHandler is created, and thus
used when opening the output file. If not
specified, the value ‘backslashreplace’ is
used. Note that if None is specified,
it will be passed as such to open(),
which means that it will be treated the
same as passing ‘errors’.
formatter
If specified, set this formatter instance
(see Formatter Objects)
for all involved handlers.
If not specified, the default is to create
and use an instance of
logging.Formatter based on
arguments format, datefmt and style.
When formatter is specified together with
any of the three arguments format,
datefmt and style, a ValueError is
raised to signal that these arguments would
lose meaning otherwise.
Changed in version 3.2: The style argument was added.
Changed in version 3.3: The handlers argument was added. Additional checks were added to
catch situations where incompatible arguments are specified (e.g.
handlers together with stream or filename, or stream
together with filename).
Changed in version 3.8: The force argument was added.
Changed in version 3.9: The encoding and errors arguments were added.
Changed in version 3.15: The formatter argument was added.
