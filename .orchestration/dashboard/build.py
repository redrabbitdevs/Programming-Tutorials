"""Render the team dashboard from state.json.

Usage: python3 .orchestration/dashboard/build.py [out.html]
Then publish out.html as an Artifact (same file path each time keeps the same URL).
"""
import json, pathlib, sys

here = pathlib.Path(__file__).resolve().parent
state = json.loads((here.parent / "state.json").read_text())
langs_file = here.parent / "languages.json"
if langs_file.exists():
    state["catalog_count"] = len(json.loads(langs_file.read_text()))
html = (here / "template.html").read_text().replace(
    "/*__STATE__*/null", json.dumps(state).replace("</", "<\\/")
)
out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else here / "dashboard.html"
out.write_text(html)
print(out)
