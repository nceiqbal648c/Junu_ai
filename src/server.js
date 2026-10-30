const http = require('http');
const { createPrompt } = require('./index.js');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    const urlParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const requestedAge = urlParams.get('age');
    
    let responseData;
    if (requestedAge) {
        // যদি নির্দিষ্ট কোনো বয়স দেখতে চান
        responseData = {
            status: 'success',
            targetAge: requestedAge,
            data: createPrompt({ age: requestedAge })
        };
    } else {
        // ডিফল্টভাবে একসাথে ১৯ এবং ৪০—উভয় ক্যারেক্টারের প্রম্পট চলে আসবে!
        responseData = {
            status: 'success',
            serverStatus: 'JunuAI Local Server is Running Smoothly',
            prompts: {
                character19: createPrompt({ age: '19' }),
                character40: createPrompt({ age: '40' })
            }
        };
    }
    
    res.end(JSON.stringify(responseData, null, 2));
});

const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 JunuAI Local Server running at http://127.0.0.1:${PORT}`);
    console.log(`👉 Get both 19 & 40 prompts: http://127.0.0.1:${PORT}`);
    console.log(`👉 Get specific age: http://127.0.0.1:${PORT}/?age=19 or ?age=40`);
});
