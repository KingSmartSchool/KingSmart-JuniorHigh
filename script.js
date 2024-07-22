document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'register',
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('註冊成功');
        } else {
            alert('註冊失敗');
        }
    });
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'login',
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('登入成功');
        } else {
            alert('登入失敗');
        }
    });
});

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);

    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'googleSignIn',
            idToken: response.credential
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('Google登入成功');
        } else {
            alert('Google登入失敗');
        }
    });
}

function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
