document.addEventListener('DOMContentLoaded', function() {
    const handVideo = document.getElementById('handVideo');
    const resultVideo = document.getElementById('resultVideo');
    const handContainer = document.getElementById('handContainer');
    const scanSound = document.getElementById('scanSound');
    const successSound = document.getElementById('successSound');
    const backgroundVideo = document.getElementById('backgroundVideo');
    const statusText = document.getElementById('statusText');
    const progressBar = document.getElementById('progressBar');
    const scanLine = document.getElementById('scanLine');
    const scanPoint = document.getElementById('scanPoint');
    
    let isScanning = false;
    let scanProgress = 0;
    let scanInterval;
    
    // Initialize
    setTimeout(() => {
        handVideo.classList.add('visible');
        handVideo.play().catch(e => console.log("Video play error:", e));
        statusText.textContent = "Press SPACE to begin scan";
    }, 1000);
    
    // Spacebar event listener
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && !isScanning) {
            e.preventDefault();
            startScan();
        }
    });

    //hand-print touch 
    window.addEventListener("touchstart", function(e) {
        if (!isScanning) {
            console.log("hahaha")
            e.preventDefault();
            startScan();
        }
    });

    //hand-print click 
    window.addEventListener("click", function(e) {
        if (!isScanning) {
            console.log("hahaha")
            e.preventDefault();
            startScan();
        }
    });
    
    
    function startScan() {
        isScanning = true;
        handContainer.classList.add('scanning');
        statusText.textContent = "Scanning in progress...";
        statusText.classList.add('pulse');
        
        // Play scan sound
        scanSound.currentTime = 0;
        scanSound.play().catch(e => console.log("Sound play error:", e));
        
        // Start progress bar
        scanProgress = 0;
        progressBar.style.width = '0';
        scanInterval = setInterval(updateScanProgress, 100);
        
        // Start scanning animations
        startScanLineAnimation();
        startRandomScanPoints();

        //remove ecent listerner 
    }
    
    function updateScanProgress() {
        scanProgress += 2;
        progressBar.style.width = scanProgress + '%';
        
        if (scanProgress >= 100) {
            completeScan();
        }
    }
    
    function startScanLineAnimation() {
        scanLine.style.top = '0';
        scanLine.style.opacity = '0';
        scanLine.style.transition = 'none';
        
        setTimeout(() => {
            scanLine.style.opacity = '1';
            scanLine.style.transition = 'top 3s linear';
            scanLine.style.top = '100%';
        }, 100);
        
        // Repeat the scan line animation
        setTimeout(() => {
            if (isScanning) {
                startScanLineAnimation();
            } else {
                scanLine.style.opacity = '0';
            }
        }, 3100);
    }
    
    function startRandomScanPoints() {
        if (!isScanning) return;
        
        // Create random scan points
        const x = Math.random() * 80 + 10; // 10-90%
        const y = Math.random() * 80 + 10; // 10-90%
        
        scanPoint.style.left = x + '%';
        scanPoint.style.top = y + '%';
        scanPoint.style.opacity = '1';
        
        setTimeout(() => {
            scanPoint.style.opacity = '0';
            
            if (isScanning) {
                setTimeout(startRandomScanPoints, Math.random() * 300 + 100);
            }
        }, 500);
    }
    
    function completeScan() {
        clearInterval(scanInterval);
        //isScanning = false;
        handContainer.classList.remove('scanning');
        statusText.classList.remove('pulse');
        statusText.textContent = "Scan complete!";
        
        // Play success sound
        successSound.play().catch(e => console.log("Sound play error:", e));
        
        // Change background video
        backgroundVideo.src = "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-circuit-board-12908-large.mp4";
        backgroundVideo.load();
        backgroundVideo.play().catch(e => console.log("Background video error:", e));
        
        // Show result video
        resultVideo.classList.add('show');
        resultVideo.play().catch(e => console.log("Result video play error:", e));
        
        // Reset after showing results
        setTimeout(resetApp, 5000);
    }
    
    function resetApp() {
        resultVideo.classList.remove('show');
        resultVideo.pause();
        resultVideo.currentTime = 0;
        
        backgroundVideo.src = "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-futuristic-circuit-12906-large.mp4";
        backgroundVideo.load();
        backgroundVideo.play().catch(e => console.log("Background video error:", e));
        
        statusText.textContent = "Press SPACE to begin new scan";
        progressBar.style.width = '0';
        
        // Reset scan line
        scanLine.style.transition = 'none';
        scanLine.style.opacity = '0';
    }
    
    // Disable all touch events
    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Fullscreen handling
    function requestFullscreen() {
        try {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } catch (e) {
            console.log("Fullscreen error:", e);
        }
    }
    
    document.addEventListener('click', requestFullscreen, { once: true });
    document.addEventListener('keydown', requestFullscreen, { once: true });
});