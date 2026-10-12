import pytest

from notebook import load_note, save_note


@pytest.mark.parametrize("text", ["", "hello", "two\nlines"])
def test_a_saved_note_reads_back_unchanged(tmp_path, text):
    save_note(tmp_path, "draft", text)
    assert load_note(tmp_path, "draft") == text


def test_a_missing_note_is_reported_by_name(tmp_path):
    with pytest.raises(FileNotFoundError, match="no note called 'plans'"):
        load_note(tmp_path, "plans")
