document.querySelector('.busca').addEventListener('submit', async (event) => {  
    //quando enviar um formulário irá executar uma função (que recebe um evento); "assync" = execução de códigos assíncronos
    event.preventDefault(); //previne o comportamento padrão que o formulário deveria ter, ou seja, não deixa enviar o formulário
                            // não perco o que digitei
    let input = document.querySelector('#searchInput').value;  //pegar o valor que foi digitado (obs: a id foi localziada no html)

        console.log(input);

    if (input !== '') {   //se o que o usuário digitou é diferente de vazio, ou seja, não digitou nada, somente confirmou em buscar
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`; 
        //url acima montada com o api do site + unidade de metragem + linguagem
    
        let results = await fetch(url);  //guardar os resultados; "fetch": promessa
        let json = await results.json();  //transformando os resultados em objetos para executar a leitura
    
        if (json.cod === 200) {  //no console, o code 200 significa que a cidade que está sendo procurada realmente exite; Code 400 é quando não existe.
            showInfo({
                name: json.name,
                country: json.sys.country,               //verificar n console (redes) onde encontra-se o que vc quer buscar
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,         //dentro de weather, possui um array. Nesse caso, queremos pegar o primeiro icone do array, então [0].
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        } else {
            clearInfo();    //função de limpa tela
            showWarning('Não encontramos essa localização');  //se o code não for 200, emitir essa mensagem em ''.
        }
        }


}); 

function showInfo(json) {     //responsável por mostrar as informações da div "resultado" do HTML
    showWarning('');          //substituir o "caregando" por " "


    document.querySelector('.resultado').style.display = 'block';   //style: acessar o CSS e altera o display de "none" para "block", ou seja, visualizando os que escolhemos no json.

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}

function clearInfo() {
    showWarning('');          //deixar o aviso vazio
    document.querySelector('.resultado').style.display = 'none';    //ocultar o resultado
}



function showWarning (msg) {            //função sobre o aviso (localizado no HTML)
    document.querySelector('.aviso').innerHTML = msg;  
}