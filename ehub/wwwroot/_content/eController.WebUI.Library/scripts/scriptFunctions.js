//@ts-check

const ContentType =
{
    scriptUrl: 0,
    scriptCode: 1,
    scriptCodeEsm: 2,
    cssUrl: 3,
    cssCode: 4,
};

async function loadContent(sourceUrl, type) {
    if (sourceUrl.Length == 0) {
        console.error("Invalid source URL");
        return;
    }

    switch (type) {
        case ContentType.scriptUrl:
        case ContentType.scriptCode:
        case ContentType.scriptCodeEsm:
            return await loadJs(sourceUrl, type);

        case ContentType.cssUrl:
        case ContentType.cssCode:
            return loadCss(sourceUrl, type);
    }
}

async function loadJs(sourceUrl, type) {
    const rootNode = document.head;
    const jsInjectClass = "js-load-injected";

    for (let x of rootNode.querySelectorAll(`.${jsInjectClass}`)) {
        if (x.dataset.originalSource == sourceUrl) {
            return true;
        }
    }

    const tag = document.createElement('script');
    tag.dataset.originalSource = sourceUrl;
    tag.classList.add(jsInjectClass);

    let promise;

    switch (type) {
        case ContentType.scriptUrl: {
            promise = new Promise((resolve, reject) => {
                tag.onload = function () {
                    console.log(`Script loaded successfully ${sourceUrl}`);
                    resolve(true);
                }
                tag.onerror = function () {
                    console.error(`Failed to load script ${sourceUrl}`);
                    resolve(false);
                }
            });
            tag.src = sourceUrl;
        } break;

        case ContentType.scriptCode: {
            promise = (async () => await eval(sourceUrl))().then(() => true).catch(() => false);
        } break;

        case ContentType.scriptCodeEsm: {
            tag.type = "module";
            tag.innerText = sourceUrl;
            promise = true;
        } break;
    }

    rootNode.appendChild(tag);

    return await promise;
}

function loadCss(sourceUrl, type) {
    const rootNode = document.head;
    const cssInjectClass = "css-load-injected";

    for (let x of rootNode.querySelectorAll(`.${cssInjectClass}`)) {
        if (x.dataset.originalSource == sourceUrl) {
            return true;
        }
    }

    let tag;

    switch (type) {
        case ContentType.cssUrl: {
            tag = document.createElement('link');
            tag.setAttribute("rel", "stylesheet");
            tag.href = sourceUrl;
        } break;

        case ContentType.cssCode: {
            tag = document.createElement('style');
            tag.innerHTML = sourceUrl;
        } break;
    }

    tag.dataset.originalSource = sourceUrl;
    rootNode.appendChild(tag);
    return true;
}

function runJsCode(code) {
    return eval(code);
}

function triggerFileDownload(url, fileName) {
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
}
