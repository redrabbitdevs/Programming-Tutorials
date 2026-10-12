"""Code that talks to the network, split so the network part can be replaced."""

import json
from urllib.request import urlopen


def fetch_temperature(city):
    url = f"https://weather.example.com/api?city={city}"
    with urlopen(url, timeout=5) as response:
        return json.load(response)["celsius"]


def describe(city):
    celsius = fetch_temperature(city)
    if celsius < 5:
        return f"{city}: {celsius} C, wear a coat"
    return f"{city}: {celsius} C, no coat needed"
