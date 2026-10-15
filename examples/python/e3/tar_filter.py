import io
import tarfile
import tempfile
from pathlib import Path


def hostile_archive():
    """An archive with one honest member and three escape attempts."""
    buffer = io.BytesIO()
    with tarfile.open(fileobj=buffer, mode="w") as tar:
        for name in ["notes.txt", "../outside.txt", "/etc/cron.d/job"]:
            info = tarfile.TarInfo(name)
            info.size = 2
            tar.addfile(info, io.BytesIO(b"hi"))
        link = tarfile.TarInfo("passwd")
        link.type, link.linkname = tarfile.SYMTYPE, "/etc/passwd"
        tar.addfile(link)
    buffer.seek(0)
    return buffer


with tempfile.TemporaryDirectory() as folder:
    with tarfile.open(fileobj=hostile_archive()) as tar:
        for member in tar.getmembers():
            try:
                tar.extract(member, folder, filter="data")
                print("extracted:", member.name)
            except tarfile.FilterError as error:
                print("refused:  ", member.name, type(error).__name__)
    files = [p for p in Path(folder).rglob("*") if p.is_file()]
    print(sorted(p.relative_to(folder).as_posix() for p in files))
