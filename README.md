# RecipesApp 🚀

### Esse projeto foi refatorado diversas vezes. Inicialmente era um projeto da Trybe, mas pelas constantes mudanças considero hoje como um projeto meu. Mais abaixo terá um guia da progressão das refatorações, com suas devidas Branchs.

[Link para o Site](https://recipes-app-lemon.vercel.app/)

![plot](./public/recipesPreview.png)

## Tech em uso

[React] Aplication </br>
Gerenciamento de estado com [ContexAPI] </br>
Uso de API externas como...
  - A  [API CocktailDB](https://thecocktaildb.com/api.php)
  - A  [API MealDB](https://www.themealdb.com/api.php)
  
Uso do Jest e RTL, SASS, ContextAPI, Axios

Refatorar a aplicação diversas vezes, adicionando diferentes features

# Habilidades desenvolvidas.

-Criar um contexto para gerenciar a aplicação num todo </br>

-Fazer uso do ReactRouter para lhidar com as diferentes páginas do app em SPA </br>

-Fazer uso dos componentes funcionais e seus diferentes Hooks </br>

-Cobrir 90% da aplicação com testes unitário usando Jest e RTL </br>

-Fazer uso do SASS para compilar e facilitar a estilização com CSS </br>

-Refatorar a aplicaçã diversas vezes fazendo uso de diferentes branchs </br>

# Como a aplicação foi refatorada
Essa aplicação, por ser a maior que já desenvolvi, resolvi refatora-la com todos os conhecimentos que adquiri fora da Trybe, para além de consolidar esses mesmos conhecimentos, tornar a aplicação mais interessante e atualizada.
###### infelizmente os testes só funcionam na aplicação original, futuramente irei consertar isso.

### Ordenação das branchs:
- 1º Branch `aplicação original`: a aplicação no estado de como entreguei para Trybe
- 2º Branch `adicionando-axios-e-otimizando-a-aplicacao`: refatorei conforme o próprio nome da branch
- 3º Branch `transicicao-de-javascript-para-typescript`: refatorei conforme o próprio nome da branch
- 4º Branch `estilizando-o-app-com-SASS`: refatorei conforme o próprio nome da branch



# O que foi desenvolvido.

Um Aplicativo de receitas, onde é possível procurar tanto por receitas de comidas quanto de bebida. Depois de efetuar o login será carregado a tela inicial, onde é
possível pesquisar por um nome específico, fazendo uso da SearchBar ou selecionar uma categoria específica, fazendo assim uma filtragem
Na sessão `exporar` o usuário pode escolher por diferentes ingredientes, regiões ou até mesmo escolher vir uma receita randomica.
Todas as receitas podem ser favoritadas, sendo assim possível serem vistas na tab de favoritas, que se localiza no perfil do usuário.
Caso seja decido fazer uma receita, pode-se inicia-la, primeiro clicando em qualquer card e indo pra página de detalhes da mesma. Durante a realização da receita pode-se
ir riscando os passos que já foram feitos, e uma vez terminado a receita é possível finaliza-la, o que automagicamente a adiciona para lista de receitas feitas.

  - Logar no site e carregar uma lista de comidas, onde pode-se pesquisar um nome específico ou escolher uma categoria
  - Clicar em um card de comida e bebida, onde será mostrado os detalhes da receita e o passo a passo de como faze-la
  - Se uma receita for iniciado pode-se ir riscando os passos que já foram feitos, e uma vez a receita finalizada, é possível reencontra-la na lista de receitas feitas, que pode ser encontrada no perfil do usuário
  - Toda receita tem um ícone para favoritar e para copiar o link da mesma.
  - A pagina de exploração carrega diferentes ingredientes e pode-se selecionar uma comida pela sua região, ou fazer o site escolher uma receita aleatória.
  - No perfil deve aparecer o email cadastrado além da sua lista de favoritos e de receitas feitas.
