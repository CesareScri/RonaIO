const d = document;
const inputUrl = d.querySelector('.input')
const submit = d.querySelector('#btn')
const result = d.querySelector('.rslt')



submit.onclick = createLink


function createLink() {
if (inputUrl.value.length == 0) {
    inputUrl.style.border = '2px solid #dc3545'
} else {
    console.log(`Link: ${inputUrl.value}`)
    inputUrl.style.border = '2px solid #20c997';

    startServer(inputUrl.value)
}
}


async function startServer(linkText) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: linkText})
    }

    const url = await fetch('/create-link', options)
    const res = await url.json()

    console.log(res)
}