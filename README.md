## 📌 Visão Geral - RouteKeeper
RouteKeeper é um aplicativo de rastreamento de rotas desenvolvido em **React Native** utilizando **Expo**. O app permite que os usuários registrem e acompanhem suas rotas, armazenando os dados de localização em um backend seguro.

## 🚀 Tecnologias Utilizadas
- **React Native** com Expo
- **React Navigation** para gerenciamento de rotas
- **Context API** para gerenciamento de estado
- **Expo Location** para captura de localização
- **React Native Maps** para exibição de mapas
- **JWT Authentication** para login seguro

## 💂️ Estrutura do Projeto
```
track-front/
│-- src/
│   │-- components/    # Componentes reutilizáveis
│   │-- context/       # Context API para gerenciamento de estado
│   │-- hooks/         # Hooks personalizados
│   │-- screens/       # Telas do aplicativo
│   │-- navigatorRef.js # Configuração da navegação
│-- App.js             # Arquivo principal do aplicativo
│-- package.json       # Dependências do projeto
```

## 🔧 Configuração do Ambiente
1. **Instale o Node.js** (se ainda não tiver instalado):
   - [Download Node.js](https://nodejs.org/)

2. **Instale o Expo CLI**:
   ```sh
   npm install -g expo-cli
   ```

3. **Clone o repositório**:
   ```sh
   git clone https://github.com/MatheusRodrigues10/routeKeeperFront.git
   cd routeKeeperFront
   ```

4. **Instale as dependências**:
   ```sh
   npm install
   ```

5. **Inicie o projeto no Expo**:
   ```sh
   npx expo start
   ```

## 📱 Como Testar no Celular
1. **Baixe o Expo Go** na Play Store ou App Store.
2. **Escaneie o QR Code** gerado pelo comando `npx expo start`.
3. O app será carregado no seu celular sem precisar de build!

## 📌 Funcionalidades Principais
### 🔑 Autenticação
- Login e Cadastro de usuários com JWT.
- Suporte a modo demonstração.

### 🛪️ Rastreamento de Rotas
- Registro de rotas em tempo real.
- Armazenamento de históricos de rotas.
- Visualização de mapas interativos.

## 📌 Hooks Personalizados
O projeto contém uma pasta `hooks/` para armazenar hooks reutilizáveis, facilitando a separação de lógica e organização do código.

## 🔗 Teste o App no Expo (sem necessidade de instalação)
Você pode testar o RouteKeeper diretamente no **Expo Go**, sem precisar clonar ou instalar o projeto.

🔗 **Acesse o app aqui:**  
[Expo RouteKeeper](https://expo.dev/preview/update?message=Initial%20commit&updateRuntimeVersion=1.0.0&createdAt=2025-01-30T00%3A59%3A15.573Z&slug=exp&projectId=8bc0c241-8008-474f-ad40-dfe8a8d4f17e&group=36b2dab2-7931-42c8-929b-bd36d0c35db4)

📲 **Como testar?**  
1. Baixe o **Expo Go** na Play Store ou App Store.  
2. Acesse o link acima ou escaneie o QR Code gerado pelo Expo.  
3. O app abrirá automaticamente no seu dispositivo!  

## 📞 Contato
Caso tenha dúvidas ou sugestões, entre em contato pelo GitHub:
[MatheusRodrigues10](https://github.com/MatheusRodrigues10)

