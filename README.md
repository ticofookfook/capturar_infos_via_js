# Análise Técnica - Script de Tracking e Captura de Dados

## Visão Geral

Este documento apresenta uma análise técnica abrangente de um script JavaScript de tracking e captura de dados, identificando suas funcionalidades, arquitetura, riscos de segurança e implicações para privacidade.

## Resumo Executivo

O script analisado é um sistema sofisticado de tracking que:
- Captura dados de formulários automaticamente
- Monitora comportamento de navegação
- Integra com Facebook Pixel e outras plataformas de analytics
- Utiliza técnicas avançadas de fingerprinting
- Transmite dados para servidores externos

**⚠️ Classificação de Risco: ALTO**

## Arquitetura e Componentes

### Estrutura Modular

O script utiliza uma arquitetura modular bem organizada com os seguintes componentes principais:

```
├── AppStorage (568) - Gerenciamento de localStorage
├── CountryService (717) - Detecção geográfica
├── FormsListener (865) - Captura de formulários
├── NavigationListener (774) - Monitoramento de navegação
├── PixelUtmify (428) - Integração com Facebook Pixel
├── Tracker (526) - Controlador principal
└── Utils (923) - Utilitários e helpers
```

### Tecnologias Utilizadas

- **JavaScript ES6+** com async/await
- **TypeScript** (transpilado para JavaScript)
- **Web APIs**: Fetch, localStorage, MutationObserver
- **Crypto API** para hashing SHA-256
- **Facebook Pixel SDK**

## Funcionalidades Principais

### 1. Captura Automática de Formulários (`FormsListener`)

**Funcionamento:**
- Monitora todos os campos `<input>` e `<textarea>` da página
- Classifica automaticamente campos como: email, telefone, nome
- Preenche campos automaticamente com dados previamente capturados
- Salva dados em tempo real conforme o usuário digita

**Métodos de Classificação:**
```javascript
// Identifica tipo do campo por atributos
- type="email" → Campo de email
- placeholder contendo "phone" → Campo de telefone
- name/id contendo "name" → Campo de nome
```

**Riscos Identificados:**
- ❌ Captura dados sem consentimento explícito
- ❌ Intercepta informações sensíveis (PII)
- ❌ Não respeita campos marcados como privados

### 2. Monitoramento de Navegação (`NavigationListener`)

**Capacidades:**
- Intercepta cliques em botões e links
- Identifica ações de checkout por palavras-chave
- Monitora submissões de formulários
- Substitui `window.open` para tracking

**Palavras-chave Monitoradas:**
```javascript
// Checkout: "comprar", "finalizar", "pagamento", "kiwify", "hotmart"
// Lead: Configurável por usuário
// Carrinho: "adicionar", "cart", "carrinho"
```

**Técnicas Utilizadas:**
- Event hijacking (interceptação de eventos)
- Method replacement (`window.open`)
- DOM mutation observation

### 3. Fingerprinting e Coleta de Dados

**Dados Coletados:**
```json
{
  "userAgent": "String do navegador",
  "ip": "IPv4 do usuário",
  "ipv6": "IPv6 do usuário", 
  "geolocation": "País, estado, cidade, CEP",
  "fbc": "Facebook Click ID",
  "fbp": "Facebook Browser ID",
  "gclid": "Google Click ID",
  "parameters": "Parâmetros da URL",
  "firstName": "Nome capturado",
  "lastName": "Sobrenome capturado",
  "email": "Email capturado",
  "phone": "Telefone formatado"
}
```

**APIs Externas Utilizadas:**
- `https://ipapi.co/json/` - Geolocalização por IP
- `https://api.ipify.org/` - Detecção de IPv4
- `https://api6.ipify.org/` - Detecção de IPv6

### 4. Integração com Plataformas de Analytics

**Facebook Pixel:**
- Inicialização automática
- Eventos: PageView, ViewContent, Lead, InitiateCheckout, AddToCart
- Hashing SHA-256 de dados pessoais
- Deduplicação por eventID

**Endpoints de Transmissão:**
- Produção: `https://tracking.utmify.com.br/tracking/v1`
- Desenvolvimento: `http://localhost:3001/tracking/v1`

## Análise de Segurança

### Vulnerabilidades Identificadas

#### 1. **Coleta Não Consensual de Dados (CRÍTICO)**
```javascript
// Captura automática sem verificação de consentimento
static handleInput(t) {
    // Salva dados diretamente no localStorage
    AppStorage.save(Tracker.leadKey, leadData);
}
```

#### 2. **Exposição de Dados Sensíveis (ALTO)**
- Armazenamento de PII em localStorage (não criptografado)
- Transmissão de dados pessoais para domínios externos
- Hash de dados sensíveis pode ser reversível

#### 3. **Interceptação de Eventos (MÉDIO)**
```javascript
// Substitui window.open globalmente
window.open = function(url, target, features) {
    // Executa tracking antes da ação original
}
```

#### 4. **Dependências Externas (MÉDIO)**
- Carregamento de scripts de CDNs externos
- Dependência de APIs de terceiros sem fallback
- Possível man-in-the-middle attacks

### Técnicas de Evasão

O script implementa várias técnicas para evitar detecção:

1. **Obfuscação de Código**: Minificação e nomes de variáveis não descritivos
2. **Timing Attacks**: Delays antes de executar ações sensíveis
3. **Event Flagging**: Previne loops infinitos de eventos
4. **DOM Mutation**: Detecta conteúdo carregado dinamicamente

## Conformidade e Privacidade

### Violações Potenciais

**LGPD (Brasil):**
- ❌ Ausência de base legal para tratamento
- ❌ Falta de transparência na coleta
- ❌ Não implementa consentimento prévio
- ❌ Ausência de mecanismos de opt-out

**GDPR (Europa):**
- ❌ Coleta sem base legal adequada
- ❌ Não implementa Privacy by Design
- ❌ Falta de controlos de acesso do titular

**CCPA (Califórnia):**
- ❌ Não divulga venda de dados pessoais
- ❌ Ausência de opt-out mechanisms

## Impacto no Performance

### Métricas de Performance

```javascript
// Observações identificadas:
- MutationObserver com throttle de 2000ms
- Múltiplas chamadas fetch simultâneas
- Polling de elementos DOM
- Event listeners em todos os inputs
```

**Impactos Potenciais:**
- Aumento no tempo de carregamento
- Consumo adicional de CPU/memória
- Latência em ações do usuário
- Possível degradação da UX

## Recomendações de Mitigação

### Para Desenvolvedores

1. **Implementar Consentimento:**
```javascript
// Verificar consentimento antes de inicializar
if (hasUserConsent()) {
    Tracker.init("Meta");
}
```

2. **Criptografia de Dados:**
```javascript
// Criptografar dados antes do armazenamento
const encryptedData = encrypt(sensitiveData);
localStorage.setItem(key, encryptedData);
```

3. **Transparência:**
- Documentar claramente dados coletados
- Implementar política de privacidade detalhada
- Fornecer controles de opt-out

### Para Usuários/Administradores

1. **Detecção e Bloqueio:**
```javascript
// Detectar o script por características únicas
if (window.pixelId || document.querySelector('[src*="utmify"]')) {
    console.warn("Script de tracking detectado");
}
```

2. **Content Security Policy:**
```http
Content-Security-Policy: 
  script-src 'self';
  connect-src 'self';
```

3. **Privacy Tools:**
- Utilizar ad blockers atualizados
- Configurar navegador para bloquear tracking
- Usar VPN para mascarar geolocalização

## Conclusões

---
