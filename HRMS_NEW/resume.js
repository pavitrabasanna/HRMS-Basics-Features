document.getElementById('autoFillSection').style.display = 'none';

document.getElementById('autoFillButton').addEventListener('click', async () => {
    const resumeInput = document.getElementById('resumeInput');
    const autoFillSection = document.getElementById('autoFillSection');

    if (resumeInput.files.length === 0) {
        alert('Please select a PDF resume to auto-fill.');
        return;
    }

    const file = resumeInput.files[0];
    const formData = new FormData();
    formData.append('resume', file);

    try {
        // Send the PDF file to a server-side script for processing
        const response = await fetch('/process-resume', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // Parse the response JSON and auto-fill the form
            const data = await response.json();
            document.getElementById('name').value = data.name;
            // Add more fields and values as needed
            autoFillSection.style.display = 'block';
        } else {
            alert('Error processing the resume. Please try again.');
        }
    } catch (error) {
        console.error(error);
    }
});
