from flask import Flask, render_template, jsonify
import requests, os

app = Flask(__name__)


url_countries = "https://coronavirus-19-api.herokuapp.com/countries"

url_emoji = (
    "https://unpkg.com/country-flag-emoji-json@1.0.2/json/flag-emojis.pretty.json"
)

filter_list = [
    "North America",
    "Europe",
    "",
    "Asia",
    "South America",
    "Oceania",
    "Africa",
    "Total:",
]


def get_countries(url):
    res_country = requests.get(url)
    data_country = res_country.json()
    country = [
        c
        for c in data_country
        if c["country"].casefold() not in (f.casefold() for f in filter_list)
    ]
    return country


def get_emoji(url):
    res_emoji = requests.get(url)
    data_emoji = res_emoji.json()
    emoji = [
        e
        for e in data_emoji
        if e["name"].casefold not in (f.casefold() for f in filter_list)
    ]
    return emoji


@app.route("/")
def index():
    country = get_countries(url_countries)
    emoji = get_emoji(url_emoji)

    return render_template("index.html", country=country, emoji=emoji)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port)
