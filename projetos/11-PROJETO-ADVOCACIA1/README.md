# Site institucional — Advocacia (PROJETO DEMONSTRATIVO)

Site de apresentação para advogada / escritório de advocacia, construído em
**HTML5 + CSS3 + JavaScript puro**, sem frameworks e sem dependências externas
além da tipografia web (Google Fonts).

> **Este é um projeto demonstrativo.** Nenhum dado real da profissional foi
> inventado: nome, OAB, endereço, telefone, formação, prêmios, avaliações e
> resultados aparecem como marcadores de posição entre `[COLCHETES]`.

## Arquivos

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Estrutura semântica, SEO, Open Graph e comentários `SUBSTITUIR:` |
| `style.css` | Identidade visual (variáveis na seção 01), componentes e responsividade |
| `main.js` | Menu mobile, rolagem suave, animações, botão do WhatsApp e formulário |
| `assets/img/favicon.svg` | Símbolo institucional (§) provisório |
| `assets/img/foto-advogada.svg` | Marcador de posição da fotografia profissional |
| `assets/img/og-cover.svg` | Arte provisória para compartilhamento (1200×630) |

## O que precisa ser preenchido com os dados reais

1. `[NOME DA ADVOGADA]`, `[OAB/UF 000000]`, `[CIDADE/UF]`, `[SEU-DOMINIO]`
2. `[WHATSAPP]`, `[E-MAIL]`, `[INSTAGRAM]`, `[ENDEREÇO]`, `[DIAS E HORÁRIOS DE ATENDIMENTO]`
3. `[FORMAÇÃO ACADÊMICA …]`, `[ESPECIALIZAÇÕES …]`, `[APRESENTAÇÃO PESSOAL …]`
4. Fotografia profissional (substituir `assets/img/foto-advogada.svg`, proporção 4:5)
5. Áreas de atuação reais (seção “Áreas de atuação” e lista do formulário)
6. Mapa de localização (modelo de `<iframe>` comentado na seção “Localização”)
7. Dados estruturados schema.org (bloco comentado no `<head>`)

## Ativações posteriores

- **WhatsApp:** preencha `SITE_CONFIG.whatsappNumber` (somente dígitos, formato
  internacional) e mude `whatsappEnabled` para `true` em `main.js`.
- **Formulário:** conecte um serviço de envio em `main.js` (função
  `initContactForm`) e remova a mensagem de demonstração.
- **Depoimentos:** a seção existe desativada (`hidden` em `index.html`) e só deve
  ser publicada com depoimentos reais e autorizados.
- **Analytics / pixel:** nenhum script de rastreamento foi incluído.

## Publicação

Basta enviar a pasta para qualquer hospedagem estática. Para conferir localmente,
abra `index.html` no navegador ou rode um servidor simples na pasta
(`npx serve .` ou `python -m http.server`).
