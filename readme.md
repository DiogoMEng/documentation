# <p id="sumario">SUMÁRIO</p>

Parte 1: <a href="#validacao-dados">Validação de Dados</a>
- <a href="#JOI">JOI: Biblioteca de Validação de Esquemas de Objetos</a>

---

# <p id="validacao-dados">Validação de Dados</p>

## <p id="JOI">JOI: Biblioteca de Validação de Esquemas de Objetos</p>

```javascript
// Validações:
// --> uma string necessária
// --> deve conter apenas caracteres alfanuméricos
// --> pelo menos 3 caracteres, mas não mais que 30
// --> deve ser acompanhado por birth_year

username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
.with("username", "birth_year")

// Validações:
// --> uma string opcional
// --> deve satisfazer o padrão regex personalizado
// --> não pode aparecer junto comaccess_token
// --> deve ser acompanhado repeat_passworde igual a ele
password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .xor("password", "access_token")
  .with("password", "repeat_password");
```