document.addEventListener('DOMContentLoaded', () => {
    const teamType = document.getElementById('team-type');
    const kloc = document.getElementById('kloc');
    const personMonth = document.getElementById('person-month');
    const months = document.getElementById('Months');
    const teamSize = document.getElementById('team-size');
    const effort = document.getElementById('effort');

    const calculate = () => {
        const teamTypeValue = teamType.value;
        const klocValue = parseFloat(kloc.value);

        if (isNaN(klocValue) || klocValue <= 0) {
            alert("Please enter a valid KLOC value.");
            return;
        }

        // Retrieve cost driver values
        const getSelectedValue = (name) => {
            const radios = document.getElementsByName(name);
            for (let radio of radios) {
                if (radio.checked) return parseFloat(radio.value);
            }
            return 1; // Default multiplier if none is selected
        };

        const costDrivers = [
            'Required software reliability',
            'Application Database size',
            'Product Complexity',
            'Performance requirements',
            'Memory limitations',
            'Environment Instability',
            'Recovery time',
            'Analytical skills',
            'software Development skills',
            'Development exp',
            'Virtualexp',
            'language exp',
            'development tools',
            'Development methods',
            'Development schedule'
        ];

        let costMultiplier = 1;
        costDrivers.forEach((driver) => {
            costMultiplier *= getSelectedValue(driver);
        });

        // Coefficients for each project type
        const coefficients = {
            small: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
            medium: { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
            large: { a: 3.6, b: 1.20, c: 2.5, d: 0.32 }
        };

        const { a, b, c, d } = coefficients[teamTypeValue];

        // Effort calculation
        const effortValue = a * Math.pow(klocValue, b) * costMultiplier;
        personMonth.textContent = effortValue.toFixed(2);

        // Time calculation
        const timeValue = c * Math.pow(effortValue, d);
        months.textContent = timeValue.toFixed(2);

        // Team size calculation
        const teamSizeValue = effortValue / timeValue;
        teamSize.textContent = teamSizeValue.toFixed(2);

        // Productivity calculation
        const productivityValue = klocValue / effortValue;
        effort.textContent = productivityValue.toFixed(2);
    };

    // Attach calculate function to the button
    document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        calculate();
    });
});
