(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    //definindo este objeto de solicitacao para outra funcao é diferente
//fases da comunicação de rede entre o navegador eo servidor
//função handleResponse é passado
//um pedido, este objeto de solicitação, e passou o manipulador de resposta também
//esta é a função que vai ser pago cada vez que há
//uma mudança no estado de comunicação
//o valor desta função. Não é o valor de retorno, mas
//apenas o valor do objeto função, e estamos definindo-o como este
//propriedade onreadystatechange. E dentro disso,
//estamos chamando handleResponse, e isso é o que vai ser executado, uma vez que
//você pode ver o parêntese em torno dele
//realmente não pode passar parâmetros
//para um valor funcional. Só quando você está executando uma função,
//você pode passar parâmetros para ele. E nós não estamos completamente prontos para executar
//esta função, nós só queremos o seu valor

    request.onreadystatechange = 
      function() { 
        handleResponse(request, 
                       responseHandler,
                       isJsonResponse); 
      };
      //Então esse é o tipo de solicitação que queremos,
//esse é o método de nosso pedido. Nós vamos passá-lo a URL, e
//vamos ter a certeza de dizer verdade aqui. E se você passar falsa aqui, ele vai
//fazer este pedido um pedido síncrono, o que significa que o navegador irá congelar,
//e irá aguardar a resposta antes de fazer qualquer outra coisa. E nós não queremos isso, queremos que este
//pedido para ser assíncrono, em outras palavras, o segundo este pedido é feito,
//queremos que o navegador para continuar operando
    request.open("GET", requestUrl, true);
    //Então, todas estas linhas aqui foram
//realmente apenas para configurar os parâmetros do pedido, o que vai ser como,
//e esta linha aqui, a última linha é realmente o executa
//o pedido e envia para o servidor. A razão pela qual estamos passando um valor nulo aqui
//é porque se isso fosse um pedido de pós nossos parâmetros de solicitação não seria parte
//do URL de solicitação, que se lembrar de uma palestra anterior, mas que seria, na verdade,
//ser parte do corpo do pedido. E é aí que você coloca
//o corpo do pedido. Então, se você queria ter valor nomeado
//pares para os parâmetros do pedido, você iria colocar essa seqüência aqui,
//ou, provavelmente, salve-o em um objeto e, em seguida, tipo de colar que
//coisa toda aqui
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
//MyHandler = responseHandler. Ok, então agora está tudo completo. Então, neste momento esta função manipulador,
//handleResponse, nós vamos ser capazes de obter o pedido e vontade
//também será capaz de obter o manipulador de resposta. Então, nós realmente não tem que ter
//estes argumentos essa função. O problema é que esta é toda
//coisa que está sendo chamado de forma assíncrona. Lembre-se que meios assíncrona? Isto significa que mais do que uma coisa
//poderia ser a execução de cada vez. O que significa que, uma vez que enviar esta solicitação off,

function handleResponse(request,
                        responseHandler,
                        isJsonResponse) {
  // solicitar que estado de pronto
  if ((request.readyState == 4) &&
     (request.status == 200)) {
    //200 significa que tudo está bem 
    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
  }
}


// Expose utility to the global object
// sinal de dólar, porque queremos ser tudo fantasitudo legal, obviamente, ajaxUtils sinal de dólar,
//assim como jQuery utiliza sinal de dólar, também usaremos sinal de dólar
//como o poder da nossa variável. Então ajaxUtils sinal de dólar, que é o que é
//vai ser exposto ao objeto global, vai ser igual a nossos ajaxUtils
//ou seja, os objetos locais bem aqui nesta invocada imediatamente
//expressão de função

global.$ajaxUtils = ajaxUtils;


})(window);

