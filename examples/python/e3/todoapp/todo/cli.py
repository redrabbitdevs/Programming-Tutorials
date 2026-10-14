import argparse
import json
import sys
from pathlib import Path


class TodoError(Exception):
    """A problem the user can fix. Reported in one line, no traceback."""


def load(path):
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8"))


def save(path, tasks):
    path.write_text(json.dumps(tasks, indent=1), encoding="utf-8")


def cmd_add(args):
    tasks = load(args.file)
    tasks.append({"text": args.text, "done": False})
    save(args.file, tasks)
    print(f"added #{len(tasks)}")


def cmd_list(args):
    for number, task in enumerate(load(args.file), start=1):
        mark = "x" if task["done"] else " "
        print(f"{number:>2} [{mark}] {task['text']}")


def cmd_done(args):
    tasks = load(args.file)
    if not 1 <= args.number <= len(tasks):
        raise TodoError(f"there is no task #{args.number}")
    tasks[args.number - 1]["done"] = True
    save(args.file, tasks)


def build_parser():
    parser = argparse.ArgumentParser(
        prog="todo", description="Keep a small list of tasks."
    )
    parser.add_argument("--file", type=Path, default=Path("todo.json"),
                        help="where the tasks are stored")
    sub = parser.add_subparsers(dest="command", required=True)

    add = sub.add_parser("add", help="add a task")
    add.add_argument("text", help="what needs doing")
    add.set_defaults(handler=cmd_add)

    show = sub.add_parser("list", help="show all tasks")
    show.set_defaults(handler=cmd_list)

    done = sub.add_parser("done", help="mark a task as done")
    done.add_argument("number", type=int, help="the task's number")
    done.set_defaults(handler=cmd_done)
    return parser


def main(argv=None):
    args = build_parser().parse_args(argv)
    try:
        args.handler(args)
    except TodoError as error:
        print(f"todo: {error}", file=sys.stderr)
        return 1
    return 0
