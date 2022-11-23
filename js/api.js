
    const getLanguages = () => {
        const options = {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '999e2f1175msh54fa562c77b16cap17ea1bjsn7db1976c0fd7',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            }
        };
        const srcSelect = document.getElementById("srcLang");
        const destSelect = document.getElementById("destLang");
        fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages?target=en', options)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                const languages = response['data']['languages'];
                // console.log(languages)
                for(let i = 0; i < languages.length; i++) {
                    var srcOpt = document.createElement("option");
                    srcOpt.text = languages[i]['name'];
                    srcOpt.value = languages[i]['language'];

                    srcSelect.appendChild(srcOpt);

                    var destOpt = document.createElement("option");
                    destOpt.text = languages[i]['name'];
                    destOpt.value = languages[i]['language'];

                    destSelect.appendChild(destOpt);

                }
            })
            .catch(err => console.error(err));
    }

    getLanguages();

    // Translate
    const translateLang = () => {
        const encodedParams = new URLSearchParams();
        
        encodedParams.append("q", document.getElementById("srcInput").value);
        var destLang = document.getElementById("destLang");
        encodedParams.append("target", destLang.options[destLang.selectedIndex].value);
        var srcLang = document.getElementById("srcLang");
        encodedParams.append("source", srcLang.options[srcLang.selectedIndex].value);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '999e2f1175msh54fa562c77b16cap17ea1bjsn7db1976c0fd7',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: encodedParams
        };
        fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.json())
        .then(response => {
            const translatedText = response['data']['translations'][0]['translatedText'];
            document.getElementById('output').value = translatedText;
        })
        .catch(err => console.error(err));
    }
    document.getElementById('translateBtn').addEventListener("click", translateLang);