


async function handleLogin() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:5555/auth/login',{
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify( {
            username : username,
            password : password
        })
    })

    if (response.status == 401){
        const mensagem = await response.text();
        alert(mensagem);

    }
    else if (response.status == 200){

        
        document.location.href = 'http://127.0.0.1:5555/dev/dash'

    }

}