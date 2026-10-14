import site
import sys
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as tmp:
    sitedir = Path(tmp)
    (sitedir / "lib").mkdir()
    (sitedir / "lib" / "acme_boot.py").write_text(
        "def configure():\n    print('acme startup hook ran')\n",
        encoding="utf-8")
    (sitedir / "acme.pth").write_text(
        "lib\nimport sys; print('acme import line ran')\n",
        encoding="utf-8")
    (sitedir / "acme.start").write_text(
        "acme_boot:configure\n", encoding="utf-8")

    site.addsitedir(tmp)
    print("lib on sys.path:", str(sitedir / "lib") in sys.path)
