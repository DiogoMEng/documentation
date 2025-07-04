# NestJS

# <p id="sumario">Sumário</p>

<a href="#p1-introducao" style="font-weight: bold">PARTE 1: Introdução</a>
- <a href="#instalcao">Instalação</a>

<a href="#iniciando-projeto" style="font-weight: bold">PARTE 2: Iniciando Projeto</a>
- <a href="#controladores-nestjs">Controladores</a>

---

# <p id="p1-introducao">PARTE 1: Introdução</p>

Nest (NestJS) é um framework para a construção de aplicações Node.js eficientes e escaláveis ​​do lado do servidor.
1. utiliza javascript progressivo.
2. desenvolvido com typescript.
3. combina elementos de: POO, FP e FRP.

_Nota: utiliza estrutura de servidor HTTP como Express, mas também permite ser configurado para user o fastify_

O Nest oferece uma arquitetura de aplicativos pronta para uso.
1. Altamente testáveis.
2. Escaláveis.
3. Fracamente acoplados.
4. Fácil manutenção.

## <p id="instalcao">Instalação</p>

```bash
npm i -g @nestjs/cli
nest new project-name
```

_Nota: utilize “--strict” para aplicar um conjunto de recursos mais restritos._

```bash
git clone https://github.com/nestjs/typescript-starter.git project
cd project
npm install
npm run start
```

# <p id="iniciando-projeto">PARTE 2: Iniciando Projeto</p>

|                          |                                                                                                                       |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `app.controller.ts`      | Um controlador básico com uma única rota.                                                                             |
| `app.controller.spec.ts` | Os testes unitários para o controlador.                                                                               |
| `app.module.ts`          | O módulo raiz do aplicativo.                                                                                          |
| `app.service.ts`         | Um serviço básico com um único método.                                                                                |
| `main.ts`                | O arquivo de entrada do aplicativo que usa a função principal NestFactorypara criar uma instância do aplicativo Nest. |

```typescript
/**
 * EXPÔE MÉTODOS ESTÁTICOS QUE PERMITEM A CRIAÇÃO DE UMA INSTÂNCIA DE APLICATIVO.
 */
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  /**
   * CREATE - RETORNA UM OBJETO DE APLICATIVO.
   * --> preenche INestApplication interface. 
   */
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

_Nota: independência de plataforma_
- permite a criação de partes lógicas reutilizáveis.
- Nest é capaz de funcionar com qualquer framework HTTP.

|                      |                                                                                                                          |
|----------------------|--------------------------------------------------------------------------------------------------------------------------|
| **platform-express** | `@nestjs/platform-expresspacote` é usado por padrão.                                                                     |
| **platform-fastify** | Fastify é um framework de alto desempenho e baixo overhead, altamente focado em fornecer máxima eficiência e velocidade. |

```typescript
/**
 * create<NestExpressApplication> - O OBJETO TERÁ MÉTODOS DISPONÍVEIS EXCLUSIVAMENTE PARA A PLATAFORMA.
 * 
 * Alternativa - NestFastifyApplication
 */
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

**Execução do Aplicativo**:
- `npm run start`: executa a aplicação.
- `npm run start:dev`: executa a aplicação, monitorando alterações em seus arquivos.

```bash
# COMANDOS DE FORMATAÇÃO

# Lint and autofix with eslint
$ npm run lint

# Format with prettier
$ npm run format
```

## <p id="controladores-nestjs">Controladores</p>

A criação de **controladores básicos**, é utilizado classes e decorators.
- Decorators vinculam classes com os metadados necessários.
- **Mapa de roteamento** - conecta as solicitações aos controladores correspondentes.

```bash
# CRIA CONTROLADOR CRUD COM VALIDAÇÃO INTEGRADA
nest g resource name_controller
```

```typescript
/**
 *  ROTEAMENTO
 * 
 *  @Controller("cats") - prefixo de caminho de rota
 *  --> ajuda no agrupamento de rotas relacionadas.
 *  --> reduz repetição de código.
 * 
 *  Caminho para rota - combinação do prefixo com a caminho especificado no decorador do método.
 *  --> Ex: GET /cats
 *  --> Ex: @Controller("cats") e @Get("breed") = GET /cats/breed
 */
@Controller("cats")
export class CatsController {

  /**
   *  CRIA UM MANIPULADOR PARA UM PONTO FINAL ESPECÍFICOP
   *  PARA SOLICITAÇÕES HTTP. 
   * 
   *  Nota: O método retorna o status 200 junto da resposta associada
   */
  @Get()
  findAll(): string {
    return "this action returns all cats";
  }

}
```

| Formas de Manipulação de Respostas |                                                                                                                                               |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Padrão**                         | quando um manipulador de requisição retorna um objeto ou array JavaScript, ele é automaticamente serializado para JSON.                       |
|                                    | retorna um tipo primitivo JavaScript (por exemplo, string, number, boolean), no entanto, o Nest envia apenas o valor, sem tentar serializá-lo |
|                                    | `@HttpCode(...)` - alterar esse comportamento facilmente adicionando o decorador no nível do manipulador                                      |
| **Específico da biblioteca**       | `@Res()` - Decorador inserido na assinatura do manipulador de métodos (por exemplo, findAll(@Res() response)).                                |
|                                    | `Ex: response.status(200).send()`                                                                                                             |

`passthrough` - permite utilizar ambas as abordagens como `@Res()` e `@Next()` se definido como `true`.
- Ex: Injetar um objeto de resposta para definir apenas cookies/cabeçalhos, mas ainda deixar o restante para o framework

```typescript
@Controller("cats")
export class CatsController {

  /**
   *  @Req() - OBJETO DE REQUISIÇÃO
   *  --> representa a solicitação HTTP
   */
  @Get()
  findAll(@Req() request: Request): string {
    return "this action returns all cats";
  }

}
```

| DECORADORES DEDICADOS   |             |
|-------------------------|-------------|
| `@Req()`                | req         |
| `@Res()`                | res         |
| `@Next()`               | next        |
| `@Session()`            | req.session |
| `@Param(Key?: string)`  | req.params  |
| `@Body(Key?: string)`   | req.body    |
| `@Query(Key?: string)`  | req.query   |
| `@Headers(Key?: string)`| req.headers |
| `@Ip()`                 | req.ip      |
| `@HostParam()`          | req.hosts   |

**Métodos HTTP padrões do Nest** - `@Get()`, `@Post()`, `@Put` e `@Delete()`.
- Define um endpoint que lida com: `@Patch()`, `@Options()`, `@Head()` e `@All()`.

```typescript
/**
 *  CRIAÇÃO DE ROTA CURINGA 
 *  
 *  A rota irá corresponder a: abcd/123, abcd/abc, dentre outras.
 * 
 *  OBS: No express o curinga deve ser nomeado, por exemplo: abcd/*splat (splat é simplesmente o nome do parâmetro curinga e não tem nenhum significado especial)
 */
@Get('abcd/*')
findAll() {
  return 'This route uses a wildcard';
}
```

**Decorator `@HttpCode()`** - altera a padrão de resposta de código de status.

```typescript
@Post
@HttpCode(204)
create() {
  return "this action adds a new cat"
}
```

**Decorator `@Header()`** - Especifica um cabeçalho de resposta personalizado.

```typescript
@Post
@Header("Cache-control", "no-store")
create() {
  return "this action adds a new cat";
}
```

**Decorator `@Redirect`** - redireciona uma resposta para uma URL específica
- Argumentos opcionais: **url** e **StatusCode** (Padrão: 302).

```typescript
@Get()
@Redirect("https://nestjs.com", 301);
```

_Nota: valores retornados substituem argumentos passados a @Redirect_

```typescript
@Get("docs")
@Redirect("https://docs.nestjs.com", 302)
getDocs(@Query("version") version) {
  if (version && version == "5") {
    return { url: "https://docs.nestjs.com/v5/" }
  }
}
```

**Tokens de Parâmetro** - adicionados no caminho da rota para capturar os valores dinâmicos da URL.

> OBS: Rotas com parâmetros devem ser declaradas após quaisquer caminhos estáticos.

```typescript
@Get(":id")
findOne(@Param() params: any): string {
  console.log(params.id);
  return `this action returns a #${params.id} cat`
}

/**
 *  REFERENCIANDO DIRETAMENTE O TOKEN DE PARÂMETROS 
 */
@Get(":id")
findOne(@Param("id") id: string): string {
  console.log(params.id);
  return `this action returns a #${params.id} cat`
}
```

O decorator `@Controller` pode exigir um valor específico do host HTTP de solicitações recebidas.

```typescript
@Controller({ host: "admin.exemple.com" })
export class AdminController {

  @Get()
  index(): string {
    return "admin page"
  }

}
```

`@HostParam()` - acessa os parâmetros de host declarados.

```typescript
@Controller({ host: ":account.example.com" })
export class AccountController {
  @Get()
  getInfo(@HostParam("account") account: string) {
    return account;
  }
}
```