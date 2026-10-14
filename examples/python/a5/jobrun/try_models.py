import io
import sys

from jobrun.models import Outcome, Sink, Status


def announce(outcome: Outcome, out: Sink) -> None:
    out.write(f"{outcome.job_id}: {outcome.status}\n")


done = Outcome("backup", Status.OK, "3 files")
print(done)
announce(done, sys.stdout)

buffer = io.StringIO()
announce(Outcome("sync", Status.TIMEOUT, "no answer"), buffer)
print(repr(buffer.getvalue()))
print(Status("failed") is Status.FAILED, f"[{Status.OK:<9}]")
