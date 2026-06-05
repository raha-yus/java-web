function validateAndLogin() {
    let valid = true;

    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    clearError('usernameInput');
    clearError('passwordInput');

    // 아이디 검사
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;

    if (!usernameRegex.test(username)) {
        showError(
            'usernameInput',
            'usernameMsg',
            '아이디는 4~20자의 영문/숫자 조합이어야 합니다.'
        );
        valid = false;
    }

    // guest 계정은 예외 처리
    if (!(username === 'guest' && password === '123123')) {

        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(password)) {
            showError(
                'passwordInput',
                'passwordMsg',
                '비밀번호는 8자 이상이며 영문, 숫자, 특수문자를 포함해야 합니다.'
            );
            valid = false;
        }
    }

    if (valid) {
        submitLogin();
    }
}

// 비밀번호 해시 후 전송
async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    const hashed = await hashPassword(password);

    document.getElementById('password').value = hashed;
    document.getElementById('loginForm').submit();
}

// 에러 표시 함수
function showError(inputId, msgId, message) {
    const input = document.getElementById(inputId);
    const msg = document.getElementById(msgId);

    if (input) input.classList.add('is-invalid');
    if (msg) msg.innerText = message;
}


// 에러 초기화 함수
function clearError(inputId) {
    const input = document.getElementById(inputId);

    if (input) input.classList.remove('is-invalid');

    // 메시지도 같이 초기화 (msg id 규칙 기반)
    const msgId = inputId.replace('Input', 'Msg');
    const msg = document.getElementById(msgId);

    if (msg) msg.innerText = '';
}