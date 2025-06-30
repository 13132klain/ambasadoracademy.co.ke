import https from 'https';

// Replace with your custom domain
const DOMAIN = 'ambasadoracademy.co.ke'; // Update this with your actual domain

function checkHealth() {
    const options = {
        hostname: DOMAIN,
        port: 443,
        path: '/health',
        method: 'GET',
        timeout: 10000
    };

    const req = https.request(options, (res) => {
        console.log(`Health check status: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log('✅ Site is healthy');
        } else {
            console.log('❌ Site returned non-200 status');
        }
    });

    req.on('error', (err) => {
        console.error('❌ Health check failed:', err.message);
    });

    req.on('timeout', () => {
        console.error('❌ Health check timed out');
        req.destroy();
    });

    req.end();
}

// Run health check
checkHealth();

// Optional: Run every 5 minutes
// setInterval(checkHealth, 5 * 60 * 1000); 