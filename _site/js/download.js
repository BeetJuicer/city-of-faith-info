
    const downloadBtn = document.querySelector('.download-btn');
    const statusEl = document.getElementById('status');

    downloadBtn.addEventListener('click', async (event) => {
        // Prevent the link from navigating to '#'
        event.preventDefault();

        // --- EDIT THESE TWO LINES ---
        const username = 'BeetJuicer'; //
        const repo = 'city-of-faith-info';     //
        // --------------------------

        // Visually disable the button and show loading state
        downloadBtn.style.pointerEvents = 'none';
        downloadBtn.style.opacity = '0.6';
        statusEl.textContent = 'Fetching latest release...';

        try {
            // Construct the API URL for the latest release
            const apiUrl = `https://api.github.com/repos/${username}/${repo}/releases/latest`;
            
            const response = await fetch(apiUrl);

            if (!response.ok) {
                if(response.status === 404) {
                     throw new Error('Repository not found or no releases available.');
                }
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            // Check if there are any assets to download
            if (data.assets && data.assets.length > 0) {
                // Get the download URL of the first asset
                const downloadUrl = data.assets[0].browser_download_url;
                
                statusEl.textContent = 'Starting download...';
                
                // Trigger the download by redirecting
                window.location.href = downloadUrl;

            } else {
                statusEl.textContent = 'No downloadable assets found in the latest release.';
            }

        } catch (error) {
            console.error('Error fetching release:', error);
            statusEl.textContent = error.message;
        } finally {
            // Re-enable the button after the process is complete or fails
            setTimeout(() => {
                downloadBtn.style.pointerEvents = 'auto';
                downloadBtn.style.opacity = '1';
                // Clear status only if it's not a success message
                if(!statusEl.textContent.includes('Starting download...')){
                     statusEl.textContent = '';
                }
            }, 3000); // Give some time for the download to start
        }
    });
