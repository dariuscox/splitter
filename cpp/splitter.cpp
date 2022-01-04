// temp.cpp: Darius Cox
// Description: Spli/tter c++ cli program to split bills
#include <iostream>

using namespace std;

// auto get_metadata()
// {
//     struct userMetadata{
//         int participants;
//         float subtotal, totalCost;
//     };
//     int participants;
//     float subtotal, totalCost;

//     // need to guard against invalid input
//     cout << "How many participants are there? --> ";
//     cin >> participants;

//     cout << "SUBTOTAL: What is the pre-tax and pre-tip subtotal? --> ";
//     cin >> subtotal;

//     cout << "FINAL COST: What is the amount paid after all fees, taxes, and tip? --> ";
//     cin >> totalCost;

// 	cout << "There are " << participants << " participants spliting this bill" << endl;
//     cout << "The subtotal is: " << subtotal << endl;
//     cout << "The total cost is is: " << totalCost << endl;
//     return userMetadata{participants, subtotal, totalCost};
// }

float getFeePercentage(float subtotal, float totalCost){
    float costDifference = totalCost - subtotal;
    float percentPaid = costDifference / subtotal;
    return percentPaid;
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
    //return userMetadata{participants, subtotal, totalCost};
	return 0;
}