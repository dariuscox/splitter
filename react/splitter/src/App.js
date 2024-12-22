import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function App() {
    // State variables
    const [showTipCalc, setShowTipCalc] = React.useState(false);
    const [showBillSplitter, setShowBillSplitter] = React.useState(false);
    const [showHowTo, setShowHowTo] = React.useState(false);
    const [tipSubtotal, setTipSubtotal] = React.useState('');
    const [tipPercent, setTipPercent] = React.useState('');
    const [tipAmount, setTipAmount] = React.useState(null);
    const [finalTotalWithTip, setFinalTotalWithTip] = React.useState(null);
    const [billSubtotal, setBillSubtotal] = React.useState('');
    const [billFinalTotal, setBillFinalTotal] = React.useState('');
    const [individuals, setIndividuals] = React.useState([
        { subtotal: '', items: [], useItems: false },
    ]);

    // Event handlers
    const handleToggleTipCalc = () => setShowTipCalc(!showTipCalc);
    const handleToggleBillSplitter = () =>
        setShowBillSplitter(!showBillSplitter);
    const handleToggleHowTo = () => setShowHowTo(!showHowTo);

    const handleTipSubtotalChange = (event) =>
        setTipSubtotal(event.target.value);
    const handleTipPercentChange = (event) => setTipPercent(event.target.value);

    const handleBillSubtotalChange = (event) =>
        setBillSubtotal(event.target.value);
    const handleBillFinalTotalChange = (event) =>
        setBillFinalTotal(event.target.value);

    const handleIndividualSubtotalChange = (index, event) => {
        setIndividuals((prevIndividuals) =>
            prevIndividuals.map((individual, i) =>
                i === index
                    ? { ...individual, subtotal: event.target.value }
                    : individual,
            ),
        );
    };

    const handleAddItemInput = (index) => {
        setIndividuals((prevIndividuals) =>
            prevIndividuals.map((individual, i) =>
                i === index
                    ? {
                          ...individual,
                          items: [...(individual.items || []), { cost: '' }],
                      }
                    : individual,
            ),
        );
    };

    const handleItemCostChange = (individualIndex, itemIndex, event) => {
        setIndividuals((prevIndividuals) =>
            prevIndividuals.map((individual, i) =>
                i === individualIndex
                    ? {
                          ...individual,
                          items: individual.items.map((item, j) =>
                              j === itemIndex
                                  ? { ...item, cost: event.target.value }
                                  : item,
                          ),
                      }
                    : individual,
            ),
        );
    };

    const handleUseItemsChange = (index, checked) => {
        setIndividuals((prevIndividuals) =>
            prevIndividuals.map((individual, i) =>
                i === index ? { ...individual, useItems: checked } : individual,
            ),
        );
    };

    const addIndividual = () => {
        setIndividuals([
            ...individuals,
            { subtotal: '', items: [], useItems: false },
        ]);
    };

    // Calculation functions
    const calculateTip = () => {
        const subtotal = parseFloat(tipSubtotal);
        const tipPercentage = parseFloat(tipPercent);
        if (isNaN(subtotal) || isNaN(tipPercentage)) {
            alert(
                'Please enter valid numbers for subtotal and tip percentage.',
            );
            return;
        }
        const calculatedTipAmount = (subtotal * tipPercentage) / 100;
        setTipAmount(calculatedTipAmount);
        setFinalTotalWithTip(subtotal + calculatedTipAmount);
    };

    const calculateAmount = () => {
        const subtotal = parseFloat(billSubtotal);
        const finalTotal = parseFloat(billFinalTotal);
        if (isNaN(subtotal) || isNaN(finalTotal)) {
            alert(
                'Please enter valid numbers for bill subtotal and final total.',
            );
            return;
        }

        const totalFees = finalTotal - subtotal;

        const newIndividuals = individuals.map((individual) => {
            let individualSubtotal = 0;
            if (individual.useItems) {
                if (individual.items.length > 0) {
                    individualSubtotal = individual.items.reduce(
                        (sum, item) => sum + parseFloat(item.cost || 0),
                        0,
                    );
                } else {
                    alert(
                        `Please enter item costs for individual or uncheck "Use Item Costs".`,
                    );
                    return { ...individual, owes: null };
                }
            } else {
                individualSubtotal = parseFloat(individual.subtotal || 0);
            }

            if (isNaN(individualSubtotal)) {
                alert(
                    `Please enter a valid subtotal or item costs for each individual.`,
                );
                return { ...individual, owes: null };
            }

            const individualShareOfFees =
                (individualSubtotal / subtotal) * totalFees;
            const individualOwes = individualSubtotal + individualShareOfFees;
            return { ...individual, owes: individualOwes.toFixed(2) };
        });

        setIndividuals(newIndividuals);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
        >
            <Typography variant="h4" gutterBottom>
                Bill Splitter
            </Typography>

            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
                <Button variant="contained" onClick={handleToggleHowTo}>
                    {showHowTo ? 'Hide How to Use' : 'Show How to Use'}
                </Button>

                {showHowTo && (
                    <Box className="box">
                        <Typography variant="h5" gutterBottom>
                            How to Use
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            This app helps you calculate tips and split bills
                            easily.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Tip Calculator
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Enter the subtotal and tip percentage, then click
                            "Calculate Tip" to see the tip amount and final
                            total.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Bill Splitter
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Enter the bill subtotal and final total (including
                            fees). Then add individuals and their subtotals. You
                            can optionally add item costs for each individual.
                            Click "Calculate" to see how much each person owes.
                        </Typography>
                    </Box>
                )}

                <Button variant="contained" onClick={handleToggleTipCalc}>
                    {showTipCalc
                        ? 'Hide Tip Calculator'
                        : 'Show Tip Calculator'}
                </Button>

                {showTipCalc && (
                    <Box className="box">
                        <Typography variant="h5" gutterBottom>
                            Tip Calculator
                        </Typography>
                        <TextField
                            label="Subtotal"
                            type="number"
                            value={tipSubtotal}
                            onChange={handleTipSubtotalChange}
                            InputProps={{
                                startAdornment: (
                                    <Typography variant="body1">$</Typography>
                                ),
                            }}
                        />
                        <TextField
                            label="Tip Percentage"
                            type="number"
                            value={tipPercent}
                            onChange={handleTipPercentChange}
                            InputProps={{
                                endAdornment: (
                                    <Typography variant="body1">%</Typography>
                                ),
                            }}
                        />
                        <Button variant="contained" onClick={calculateTip}>
                            Calculate Tip
                        </Button>
                        {tipAmount !== null && finalTotalWithTip !== null && (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Tip amount: ${tipAmount.toFixed(2)}
                                <br />
                                Final total: ${finalTotalWithTip.toFixed(2)}
                            </Typography>
                        )}
                    </Box>
                )}

                <Button variant="contained" onClick={handleToggleBillSplitter}>
                    {showBillSplitter
                        ? 'Hide Bill Splitter'
                        : 'Show Bill Splitter'}
                </Button>

                {showBillSplitter && (
                    <Box className="box">
                        <Typography variant="h5" gutterBottom>
                            Bill Splitter
                        </Typography>
                        <TextField
                            label="Bill Subtotal"
                            type="number"
                            value={billSubtotal}
                            onChange={handleBillSubtotalChange}
                            InputProps={{
                                startAdornment: (
                                    <Typography variant="body1">$</Typography>
                                ),
                            }}
                        />
                        <TextField
                            label="Final Total (with fees)"
                            type="number"
                            value={billFinalTotal}
                            onChange={handleBillFinalTotalChange}
                            InputProps={{
                                startAdornment: (
                                    <Typography variant="body1">$</Typography>
                                ),
                            }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Individuals
                        </Typography>
                        {individuals.map((individual, index) => (
                            <Box key={index}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={individual.useItems}
                                                onChange={(event) =>
                                                    handleUseItemsChange(
                                                        index,
                                                        event.target.checked,
                                                    )
                                                }
                                            />
                                        }
                                        label="Use Item Costs"
                                    />
                                </FormGroup>
                                {!individual.useItems && (
                                    <TextField
                                        label={`Individual ${
                                            index + 1
                                        } Subtotal`}
                                        type="number"
                                        value={individual.subtotal}
                                        onChange={(event) =>
                                            handleIndividualSubtotalChange(
                                                index,
                                                event,
                                            )
                                        }
                                        InputProps={{
                                            startAdornment: (
                                                <Typography variant="body1">
                                                    $
                                                </Typography>
                                            ),
                                        }}
                                    />
                                )}
                                {individual.useItems && (
                                    <div>
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                handleAddItemInput(index)
                                            }
                                        >
                                            Add Item Costs
                                        </Button>
                                        {individual.items.length > 0 && (
                                            <Box>
                                                {individual.items.map(
                                                    (item, itemIndex) => (
                                                        <TextField
                                                            key={itemIndex}
                                                            label={`Item ${
                                                                itemIndex + 1
                                                            } Cost`}
                                                            type="number"
                                                            value={item.cost}
                                                            onChange={(event) =>
                                                                handleItemCostChange(
                                                                    index,
                                                                    itemIndex,
                                                                    event,
                                                                )
                                                            }
                                                            InputProps={{
                                                                startAdornment:
                                                                    (
                                                                        <Typography variant="body1">
                                                                            $
                                                                        </Typography>
                                                                    ),
                                                            }}
                                                        />
                                                    ),
                                                )}
                                            </Box>
                                        )}
                                    </div>
                                )}
                            </Box>
                        ))}

                        <Box // Box for button styling
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                mt: 2,
                            }}
                        >
                            <Button variant="contained" onClick={addIndividual}>
                                Add Individual
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={calculateAmount}
                                sx={{ mt: 2 }}
                            >
                                Calculate
                            </Button>
                        </Box>

                        {individuals.map(
                            (individual, index) =>
                                individual.owes !== null && (
                                    <Box key={index} sx={{ mt: 2 }}>
                                        <Typography variant="body1">
                                            Individual {index + 1} owes: $
                                            <span
                                                className="result-value"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        individual.owes,
                                                    )
                                                }
                                            >
                                                {individual.owes}
                                            </span>
                                        </Typography>
                                    </Box>
                                ),
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default App;
