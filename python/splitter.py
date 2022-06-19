def percentage_helper(slice, subtotal):
    actual_percentage = slice / float(subtotal)
    rounded_percentage = round(actual_percentage, 2)
    return float(rounded_percentage)

def get_tip_amount(tip, subtotal):
    if "p" in tip:
        tip = float(tip.split("p")[0])
    elif is_number(tip):
        tip = percentage_helper(tip, subtotal)
    else:
        print("invalid tip amount")
        return float(0)
    return tip

def is_number(string):
    try:
        float(string)
        return True
    except ValueError:
        return False

def get_extra_fee_percentage_ez(subtotal, final_cost):
    fees_paid = final_cost - subtotal
    percent_paid = fees_paid / float(subtotal)
    return percent_paid

def itemize_participant(percent_added):
    participant_total = 0
    items = []
    completed = False
    print("Input item cost one at a time for participant. Enter blank line to end")
    while not completed:
        item = input("Add item cost to participant --> ")
        if is_number(item):
            items.append(item)
            print(items)
        else:
             completed = True
    print("Participant has items:", items)
    for item in items:
        participant_total += float(item)
    print("participant subtotal is: ", participant_total)
    fee_added = participant_total * (percent_added)
    amount_owed = participant_total + fee_added
    print("This participant owes: ", amount_owed)
    return amount_owed

def __main__():
    "TODO: add a mode selector (ez vs complex for extra percentages)"
    # tax = input("How much did you pay in tax? --> ")
    # tip = input("How much did you tip? (If percentage add p ex '20%' is 20p) --> ")

    # tip = get_tip_amount(tip, subtotal)
    # tax = percentage_helper(tax, subtotal)

    participants = input("How many participants are there? --> ")
    subtotal = input("SUBTOTAL: What is the pre-tax and pre-tip subtotal? --> ")
    final_cost = input("FINAL COST: What is the amount paid after all fees, taxes, and tip? --> ")

    extra_fee_percentage = get_extra_fee_percentage_ez(float(subtotal), float(final_cost))

    print(participants)
    print(subtotal)
    print(final_cost)
    print("{}%".format(extra_fee_percentage*100) )

    splits = []

    for i in range(int(participants)):
        print("participant #", i)
        splits.append(itemize_participant(extra_fee_percentage))
    
    print(splits)
	
if __name__ == "__main__":
    __main__()

