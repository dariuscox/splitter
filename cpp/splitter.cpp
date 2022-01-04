// temp.cpp: dariuscox
// Description: Spli/tter c++ cli program to split bills
#include <iostream>

using namespace std;

// TODO: Move user input into a sep function and guard inputs

float getFeePercentage(float subtotal, float totalCost){
    float costDifference = totalCost - subtotal;
    float percentPaid = costDifference / subtotal;
    return percentPaid;
}

float getParticipantCost(float feePercentage){
    float itemValue = 0;
    float subtotal = 0;
    
    do {
        cout << "Enter item cost(-1 = quit): ";

        if (!(cin >> itemValue)) {
        cout << "You entered a non-numeric. Exiting..." << endl;
        break;

        }
        if (itemValue != -1) {
        cout << "Adding item of cost: " << itemValue << endl;
        subtotal += itemValue;
        cout << "New participant subtotal is: " << subtotal << endl;
        }
    } while (itemValue != -1);
    float feeAdded = subtotal * feePercentage;
    float amount_owed = subtotal + feeAdded;
    cout << "This participant owes: "<< amount_owed << endl; 
    return amount_owed;
}

int main()
{
    int participants;
    float subtotal, totalCost;

    // need to guard against invalid input
    cout << "How many participants are there? --> ";
    cin >> participants;

    cout << "SUBTOTAL: What is the pre-tax and pre-tip subtotal? --> ";
    cin >> subtotal;

    cout << "FINAL COST: What is the amount paid after all fees, taxes, and tip? --> ";
    cin >> totalCost;

	cout << "There are " << participants << " participants spliting this bill" << endl;
    cout << "The subtotal is: " << subtotal << endl;
    cout << "The total cost is is: " << totalCost << endl;

    float feePercent = getFeePercentage(subtotal, totalCost);

    cout << "You paid " << feePercent*100 << "\% in extra fees!" << endl;

    float participantTotals[participants];
    for (int i = 0; i<participants; i++){
        cout << "Please enter items for participant #" << i+1 << endl;
        participantTotals[i] = getParticipantCost(feePercent);
    }
    for (int i = 0; i<participants; i++) {
        cout << "Participant " << i+1 << " owes: " << participantTotals[i] << endl;
    }
    cout << "All done." << endl;

    
	return 0;
}
