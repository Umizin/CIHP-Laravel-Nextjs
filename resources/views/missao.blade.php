<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório da Missão</title>
</head>
<body>
    <h1>Lista de Missões Ativas</h1>
    <ul>
        @foreach ($missaos as $missao)
        <li>
            <strong>{{ $missao->nome }}</strong>
            <p>{{ $missao->descricao }}</p>
        </li>
        @endforeach
    </ul>
</body>
</html>