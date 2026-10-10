# Using Python on Windows (trimmed extract)

Source: https://docs.python.org/3/using/windows.html (3.15.0 documentation), fetched 2026-10-10.
Trimmed to the passages the B1 install lesson relies on; wording is the page's.

## 4.1.1 Installation (Python install manager)

- "The Python install manager can be installed from the Microsoft Store app or downloaded and installed from python.org/downloads. The two versions are identical."
- Store: click "Install", then open a terminal and type `python`. python.org file: double-click and select "Install", or run `Add-AppxPackage <path to MSIX>` in Windows PowerShell.
- "After installation, the python, py, and pymanager commands should be available."
- On first runtime install you may be prompted to add a directory to PATH. "This is optional, if you prefer to use the py command". Default directory: `%LocalAppData%\Python\bin`.

## 4.1.2 Basic use

- "The recommended command for launching Python is python", which launches the requested version, an active virtual environment, or the default installed version ("the latest stable release unless configured otherwise").
- "For all scenarios involving multiple runtime versions, the recommended command is py."
- Select a version with `-V:<TAG>`, for example `py -V:3.14 ...`.

## 4.1.5 Installing runtimes

- `py install [-s=|--source=<URL>] [-f|--force] [-u|--update] [--dry-run] [<TAG>...]` adds new runtime versions.

## 4.11 The full installer (deprecated)

- "Deprecated since version 3.14: This installer is deprecated since 3.14 and will not be produced for Python 3.16 or later. See Python install manager for the modern installer."

## 4.12 Python launcher for Windows (deprecated)

- "Deprecated since version 3.14: The launcher and this documentation have been superseded by the Python Install Manager described above. This is preserved temporarily for historical interest."
