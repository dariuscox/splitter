import React from 'react';
import { PurpleButton, BlueButton } from 'components/Buttons';
import { HomeTheme } from 'components/Themes';

const Landing = () => {
    return (
        <HomeTheme>
            <div>
                <h1>Splitter</h1>
            </div>
            <div>
                <BlueButton>Itemized Split</BlueButton>
            </div>

            <div>
                <PurpleButton>Even Split</PurpleButton>
            </div>
        </HomeTheme>
    );
};

export default Landing;
