import io
from contextlib import redirect_stdout

buffer = io.StringIO()
with redirect_stdout(buffer):
    print("captured line")
print("buffer holds:", repr(buffer.getvalue()))
