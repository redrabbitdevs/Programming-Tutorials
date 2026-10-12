import unittest
from unittest.mock import Mock, patch

from showtests import run_tests


def fetch_with_retry(fetch, attempts=3):
    """Call fetch() until it works, at most `attempts` times, pausing between tries."""
    import time

    for attempt in range(1, attempts + 1):
        try:
            return fetch()
        except ConnectionError:
            if attempt == attempts:
                raise
            time.sleep(attempt)


class RetryTests(unittest.TestCase):
    @patch("time.sleep")
    def test_succeeds_on_the_third_try(self, fake_sleep):
        fetch = Mock(side_effect=[ConnectionError, ConnectionError, 7])
        self.assertEqual(fetch_with_retry(fetch), 7)
        self.assertEqual(fetch.call_count, 3)
        self.assertEqual([c.args for c in fake_sleep.call_args_list], [(1,), (2,)])

    @patch("time.sleep")
    def test_gives_up_after_the_last_attempt(self, fake_sleep):
        fetch = Mock(side_effect=ConnectionError("down"))
        with self.assertRaises(ConnectionError):
            fetch_with_retry(fetch, attempts=2)
        self.assertEqual(fetch.call_count, 2)
        fake_sleep.assert_called_once_with(1)

    @patch("time.sleep")
    def test_no_pause_when_the_first_call_works(self, fake_sleep):
        self.assertEqual(fetch_with_retry(Mock(return_value="ok")), "ok")
        fake_sleep.assert_not_called()


print(run_tests(RetryTests))
