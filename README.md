# spli/tter

Split those bills (in multiple interfaces and languages)

Will hopefully get around to making:

- Python CLI (prototype done - will add features to here first for testing)
- C++ CLI (because why not)
- Android App (one day)
- IOS App (pain)
- React (Sadscript)

## How to use and format CSV for splitter

```bash
python3 ./splitter_csv.py <fileName>
```

fileName is optional, defaults to splitter.csv when no arguments are specified

The CSV format is as follows

_Note: This isn't a proper CSV format, don't hurt me_

```
total amount before fees
total amount after fees
space separated list of line items
```

e.g. a bill with a grand total of 100 split between 2 people

```
80
100
20 20
40
```
