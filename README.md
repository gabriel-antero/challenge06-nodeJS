![Wallpaper GoStack](https://user-images.githubusercontent.com/58411170/79023960-f326d100-7b57-11ea-9a3b-d3fd0d6bf6bd.png)

<h2 align="center">
  Desafio 06: Banco de dados e upload de arquivos no Node.js
</h2> 

<p align="center">
  Criado durante o bootcamp GoStack 11.
</p>

<p align="center">
 
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gabriel-antero/challenge-reactJS">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gabriel-antero/challenge-reactJS"> 
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/gabriel-antero/challenge-reactJS">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/gabriel-antero/challenge-reactJS">
  
</p>

<p align="center">
  <a href="https://github.com/gabriel-antero/challenge06-nodeJS#information_source-sobre-o-desafio">Sobre o desafio<a/> |
  <a href="https://github.com/gabriel-antero/challenge06-nodeJS#dart-objetivos-realizados">Objetivos a realizar<a/> |
  <a href="https://github.com/gabriel-antero/challenge06-nodeJS#espec%C3%ADfica%C3%A7%C3%A3o-dos-testes">Especificação dos testes<a/> |
  <a href="https://github.com/gabriel-antero/challenge06-nodeJS#memo-licen%C3%A7a">LICENÇA<a/>
</p>

## :information_source: Sobre o desafio
Essa será uma aplicação que deve armazenar transações financeiras de entrada e saída e permitir o cadastro e a listagem dessas transações, além de permitir a geração de relatórios a partir do envio de um arquivo csv.
 Junto ao TypeScript, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

Feito utilizando testes automatizados.

## :dart: Objetivos realizados

<h3 align="center">Funcionalidades da aplicação</h3>

- [X] **`POST /transactions`**: A rota deve receber `title`, `value`, `type`, e `category` dentro do corpo da requisição, sendo o `type` o tipo da transação, que deve ser `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

**Dica**: Para a categoria, você deve criar uma nova tabela, que terá os campos `id`, `title`, `created_at`, `updated_at`.

**Dica 2**: Antes de criar uma nova categoria, sempre verifique se já existe uma categoria com o mesmo título. Caso ela exista, use o `id` já existente no banco de dados.

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income",
  "category": "Alimentação"
}
```

**Dica**: Para criar uma categoria, sempre verifique antes se a categoria já existe no banco de dados. Por exemplo, se a categoria "Alimentação" não existir no banco de dados, crie essa categoria no mesmo momento, e utilize o id criado. Caso ela já exista, utilize o `id` que já está presente no banco de dados.

- [X] **`GET /transactions`**: Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora, junto com o valor da soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto com o formato a seguir:

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Salário",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary"
      }
    },
    {
      "id": "uuid",
      "title": "Freela",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others"
      }
    },
    {
      "id": "uuid",
      "title": "Pagamento da fatura",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others"
      }
    },
    {
      "id": "uuid",
      "title": "Cadeira Gamer",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Recreation"
      }
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

**Dica**: Dentro de balance, o income é a soma de todos os valores das transações com `type` income. O outcome é a soma de todos os valores das transações com `type` outcome, e o total é o valor de `income - outcome`.

**Dica 2**: Para fazer a soma dos valores, você pode usar a função [reduce](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) para agrupar as transações pela propriedade `type`, assim você irá conseguir somar todos os valores com facilidade e obter o retorno do `balance`.

- [X] **`DELETE /transactions/:id`**: A rota deve deletar uma transação com o `id` presente nos parâmetros da rota;

* [X] **`POST /transactions/import`**: A rota deve permitir a importação de um arquivo com formato `.csv` contendo as mesmas informações necessárias para criação de uma transação `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`, onde cada linha do arquivo CSV deve ser um novo registro para o banco de dados, e por fim retorne todas as `transactions` que foram importadas para seu banco de dados. O arquivo csv, deve seguir o seguinte [modelo](./assets/file.csv)

<h3 align="center">Específicação dos testes</h3>
<p align="center">Necessário realizar os seguintes testes:

- [X] **`should be able to create a new transaction`**: Para que esse teste passe, sua aplicação deve permitir que uma transação seja criada, e retorne um json com a transação criado.

* [X] **`should create tags when inserting new transactions`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que não existe, essa seja criada e inserida no campo category_id da transação com o `id` que acabou de ser criado.

- [X] **`should not create tags when they already exists`**: Para que esse teste passe, sua aplicação deve permitir que ao criar uma nova transação com uma categoria que já existe, seja atribuído ao campo category_id da transação com o `id` dessa categoria existente, não permitindo a criação de categorias com o mesmo `title`.

* [X] **`should be able to list the transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja retornado um array de objetos contendo todas as transações junto ao balanço de income, outcome e total das transações que foram criadas até o momento.

- [X] **`should not be able to create outcome transaction without a valid balance`**: Para que esse teste passe, sua aplicação não deve permitir que uma transação do tipo `outcome` extrapole o valor total que o usuário tem em caixa (total de income), retornando uma resposta com código HTTP 400 e uma mensagem de erro no seguinte formato: `{ error: string }`.

* [X] **`should be able to delete a transaction`**: Para que esse teste passe, você deve permitir que a sua rota de delete exclua uma transação, e ao fazer a exclusão, ele retorne uma resposta vazia, com status 204.

- [X] **`should be able to import transactions`**: Para que esse teste passe, sua aplicação deve permitir que seja importado um arquivo csv, contendo o seguinte [modelo](./assets/file.csv). Com o arquivo importado, você deve permitir que seja criado no banco de dados todos os registros e categorias que estavam presentes nesse arquivo, e retornar todas as transactions que foram importadas.

## :memo: LICENÇA

Projeto sobre licença MIT. Mais informações em [LICENÇA](https://github.com/gabriel-antero/challenge06-nodeJS/blob/master/LICENSE).

---

Trechos desse conteúdo copiado do arquivo do desafio.
