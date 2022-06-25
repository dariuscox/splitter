import csv
import sys
from splitter import get_extra_fee_percentage_ez, is_number

def read_csv(filename):
    """
    read data from csv file and push contents into an array
    schema
    80.00 # sub total, before tax + fees
    100.00 # total after tax + fees
    20 20 # first person items
    20 20 # second person items
    """
    return_data = []
    with open(filename, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for row in reader:
            return_data.append(row)
    return return_data

def get_total_with_fees_from_items(items, percent_added):
    """
    sum array of items and add fees
    """
    participant_total = 0
    for item in items:
        if is_number(item):
            participant_total += float(item)
        elif item == " ":
            pass
        else:
            raise Exception('invalid item provided - exiting')
    fee_added = participant_total * (percent_added)
    amount_owed = participant_total + fee_added
    return amount_owed

def get_data_from_csv(filename):
    print(filename)
    data = read_csv(filename)
    subtotal = None
    final_cost = None
    extra_fee_percentage = None
    splits = []
    if is_number(data[0][0]) and is_number(data[1][0]):
        subtotal = float(data[0][0])
        final_cost = float(data[1][0])
        extra_fee_percentage = get_extra_fee_percentage_ez(float(subtotal), float(final_cost))
        for i in range (2, len(data)):
            individual_total = get_total_with_fees_from_items(data[i], extra_fee_percentage)
            splits.append(individual_total)
        return (subtotal, final_cost, splits)
    else:
        print("Invalid CSV provided")

def get_filename_from_args():
    if len(sys.argv) > 1 and '.csv' in sys.argv[1]:
        return sys.argv[1]
    return 'splitter.csv'


def __main__():
    print(get_data_from_csv(get_filename_from_args()))

if __name__ == "__main__":
    __main__()