$(function(){
	if (!localStorage.getItem("tbClientes")) {
		localStorage.setItem("tbClientes","[]")
	}
	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;

	var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados


	tbClientes = JSON.parse(tbClientes); // Converte string para objeto

	if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbClientes = [];

	function Adicionar(){
		var clientes = JSON.parse(localStorage.getItem("tbClientes")).map(cliente => JSON.parse(cliente));
		var ultimoCliente = clientes[clientes.length - 1];

		var cliente = JSON.stringify({

			codigo   : ultimoCliente ? ((+ultimoCliente.codigo)+1).toString() : 1,
			nome     : $("#txtNome").val(),
			telefone : $("#txtTelefone").val(),
			email    : $("#txtEmail").val(),
			data_horario : $("#txtDataHorario").val(),
			observacao: $("#txtObservacao").val()
		});

		tbClientes.push(cliente);

		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

		alert("Agendamento confirmado com sucesso!");
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Código</th>"+
			"	<th>Nome</th>"+
			"	<th>Telefone</th>"+
			"	<th>Email</th>"+
			"	<th>Data e Horario</th>"+
			"	<th>Observaçao</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbClientes){
			var cli = JSON.parse(tbClientes[i]);
		  	$("#tblListar tbody").append("<tr>"+
										 "	<td>"+cli.codigo+"</td>" + 
										 "	<td>"+cli.nome+"</td>" + 
										 "	<td>"+cli.telefone+"</td>" + 
										 "	<td>"+cli.email+"</td>" +
										 "	<td>"+cli.data_horario+"</td>" +
										 "	<td>"+cli.observacao+"</td>" + 
		  								 "</tr>");
		 }
	}

	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}

	Listar();

	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});

});