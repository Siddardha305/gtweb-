// Using built-in fetch in Node 18+

const BASE_URL = 'http://localhost:3000';
const EMAIL = `testuser_${Date.now()}@example.com`;
const PASSWORD = 'password123';

async function testAuth() {
    console.log('🧪 Starting Auth Tests...');

    // 1. Signup
    console.log('\n1. Testing Signup...');
    try {
        const signupRes = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: EMAIL,
                password: PASSWORD,
            }),
        });

        const text = await signupRes.text();
        try {
            const signupData = JSON.parse(text);
            console.log(`Status: ${signupRes.status}`);
            console.log('Response:', signupData);

            if (signupRes.status === 201) {
                console.log('✅ Signup Successful');
            } else {
                console.error('❌ Signup Failed');
            }
        } catch (e) {
            console.error('❌ Failed to parse JSON. Response preview:', text.substring(0, 500));
        }
    } catch (e) {
        console.error('❌ Signup Error:', e.message);
    }

    // 2. Login (Success)
    console.log('\n2. Testing Login (Valid Credentials)...');
    try {
        const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: EMAIL,
                password: PASSWORD,
            }),
        });

        const text = await loginRes.text();
        try {
            const loginData = JSON.parse(text);
            console.log(`Status: ${loginRes.status}`);
            console.log('Response:', loginData);

            if (loginRes.status === 200) {
                console.log('✅ Login Successful');
            } else {
                console.error('❌ Login Failed');
            }
        } catch (e) {
            console.error('❌ Failed to parse JSON. Response preview:', text.substring(0, 500));
        }
    } catch (e) {
        console.error('❌ Login Error:', e.message);
    }

    // 3. Login (Failure)
    console.log('\n3. Testing Login (Invalid Credentials)...');
    try {
        const failRes = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: EMAIL,
                password: 'wrongpassword',
            }),
        });

        const text = await failRes.text();
        try {
            const failData = JSON.parse(text);
            console.log(`Status: ${failRes.status}`);
            console.log('Response:', failData);

            if (failRes.status === 401) {
                console.log('✅ Login Failed as expected');
            } else {
                console.error('❌ Login should have failed but didn\'t');
            }
        } catch (e) {
            console.error('❌ Failed to parse JSON:', text);
        }
    } catch (e) {
        console.error('❌ Login Error:', e.message);
    }
}

testAuth();
