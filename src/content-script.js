console.log('Hello ext!')

// got all images
const imgEs = document.querySelectorAll('img');


[...imgEs].forEach(el => {
    // for each images more than 150x150
    if (el.width > 150 || el.height > 150) {

        //connect css for chrome (see manifest)
        const cssUrl = chrome.runtime.getURL('content-script.css')
        // got parent element over img
        let elParent = el.parentElement;

        // so that the styles of the site do not affect
        const root = document.createElement('div');
        root.style.position = 'relative';
        const shadowRoot = root.attachShadow({mode: 'open'})
        shadowRoot.innerHTML = `<link rel='stylesheet' href='${cssUrl}'></link>`


        const linkButton = document.createElement('a');
        linkButton.innerText = 'Download';
        linkButton.setAttribute('download', '')
        linkButton.type = 'a';

        //prepend our linkButton to our new shadow div
        shadowRoot.prepend(linkButton);

        //prepend our root to parent element img
        elParent.prepend(root)
        linkButton.href = el.getAttribute('src')
    }

})