

async function testAuth(){

    const response = await fetch('http://127.0.0.1:5555/api/test');
    const message = await response.text();
    alert(message);


}