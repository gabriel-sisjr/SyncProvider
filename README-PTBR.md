# Connection Provider

Este é um componente React que fornece informações sobre o estado da conexão de rede e funcionalidades relacionadas à sincronização de dados com um servidor remoto.
Os dados são salvos via MMKV e sincronizados assim que a conexão de rede é estabelecida.

## Funcionalidades

- **Monitoramento da Conexão de Rede**: Este provedor monitora o estado da conexão de rede do dispositivo.
- **Sincronização Automática**: Quando uma conexão de rede está disponível, o provedor inicia automaticamente a sincronização de dados com um servidor remoto.
- **Controle de Sincronização**: Fornece indicadores e contadores para acompanhar o progresso da sincronização de dados.

## Uso

Para utilizar este provedor de conexão, você pode envolver os componentes da sua aplicação com o `ConnectionProvider` e acessar as informações e funcionalidades fornecidas pelo contexto `ConnectionContext`.

Exemplo de uso:

```ts
import React from 'react';
import {ConnectionProvider} from 'caminho/para/ConnectionProvider';
import {ConnectionProviderConfiguration} from 'caminho/para/@types/ProviderTypes';
import SeuComponenteDeRotas from './SeuComponenteDeRotas';

const configuration: ConnectionProviderConfiguration = {
  baseUrl: 'meu-host.com',
  healthEndpoint: '/health',
};

const App = () => {
  return (
    <ConnectionProvider connectionProviderConfiguration={config}>
      <SeuComponenteDeRotas />
    </ConnectionProvider>
  );
};

export default App;
```

Para integrar o `ConnectionProvider` em sua aplicação React Native, siga os seguintes passos:

1. Instale a biblioteca `@react-native-community/netinfo` e `react-native-mmkv`.
2. Certifique-se de configurar corretamente o `connectionProviderConfiguration` para a sua aplicação.
3. Importe o `ConnectionProvider` e envolva os componentes da sua aplicação com ele.
4. Acesse as informações e funcionalidades fornecidas pelo contexto `ConnectionContext`.

## API

### `ConnectionProvider`

- **Props**:
  - `connectionProviderConfiguration`: Configuração para o provedor de conexão.

### `ConnectionContext`

- **Dados e Funcionalidades**:
  - `netInfoState`: Estado da conexão de rede.
  - `isSync`: Indicador de sincronização.
  - `itemsCount`: Contagem de itens a serem sincronizados.
  - `storage`: Funcionalidades relacionadas a manipulação dos dados.

## Funcionalidades Internas

Além das funcionalidades principais, o provedor também oferece funcionalidades internas adicionais:

- **Acessors**: Fornece acessos às operações de armazenamento de dados.
- **checkEndpoint**: Verifica se o endpoint de saúde está acessível.
- **uploadItems**: Envia itens para o servidor remoto.
- **syncItems**: Sincroniza itens quando a conexão está disponível.
- **listenerCallBack**: Callback para ouvir alterações no estado da conexão de rede.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests com melhorias. Certifique-se de seguir as diretrizes de contribuição.

## Redes Sociais

Você pode nos encontrar nas seguintes redes sociais:

- LinkedIn: [Gabriel Santana](https://www.linkedin.com/in/gabriel-sisjr/)

Siga-nos para receber atualizações sobre o projeto e participar de discussões!

<!--
## Doações

Se você gostaria de apoiar este projeto financeiramente, considere fazer uma doação através dos seguintes meios:

- [Patreon](https://www.patreon.com/exemplerepo)
- [PayPal](https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID)
- Bitcoin: `SUA_CARTEIRA_BITCOIN` -->
