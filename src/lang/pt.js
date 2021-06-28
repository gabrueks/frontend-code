export default {
    pt: {
        translation: {
            errors: {
                default: "Por favor, ajuste o seguinte:",
                internal: "Ocorreu um erro inesperado",
            },
            footer: {
                textDolado: "Fale com a dolado",
                doladoNumber: "(11) 98908-8033",
                doladoEmail: "contato@compredolado.com.br",
                doladoAddress:
                    "Av. Adolfo Coelho 953 - Lauzane Paulista - São Paulo",
                doladoCnpj: "CNPJ 37.151.892/0001-31",
                links: "Links rápidos",
                search: "Pesquisar",
                privacyPolicy: "Políticas de privacidade",
                termsOfService: "Termos de serviço",
                copyrightDolado: "© 2021, dolado",
                shopify: "Com tecnologia da Shopify",
                refundPolicy: "Política de Troca",
            },
            labels: {
                promotion: "em promoção",
            },
            search: {
                message: {
                    title: "RESULTADOS PARA",
                    title2: "PESQUISE NO NOSSO SITE",
                    subtitle:
                        "Tente verificar a ortografia ou usar palavras diferentes.",
                    placeHolder: "Pesquisar",
                },
            },
            header: {
                options: {
                    init: "Inicio",
                    categories: "Categorias",
                    products: "Produtos",
                },
            },
            table: {
                orderHistory: {
                    id: "Pedido",
                    createdAt: "Data",
                    financialStatus: "Status do Pagamento",
                    fulfillmentStatus: "Status de processamento do pedido",
                    totalPrice: "Total",
                },
                orderProducts: {
                    productTitle: "Produto",
                    sku: "Sku",
                    price: "Preço",
                    quantity: "Quantidade",
                    total: "Total",
                },
            },
            account: {
                title: "Minha conta",
                logout: "Sair",
                history: "HISTÓRICO DE PEDIDOS",
                empty: "Você ainda não fez nenhum pedido.",
                infoAccount: "INFORMAÇÕES DA CONTA",
                seeAddresses: "VER ENDEREÇOS ",
                addresses: {
                    title: "Seus endereços",
                    goBack: "Retornar às informações da conta",
                    addNewAddress: "ADICIONAR UM NOVO ENDEREÇO",
                    form: {
                        title: "ADICIONAR UM NOVO ENDEREÇO",
                        titleUpdate: "EDITAR ENDEREÇO",
                        firstName: "Nome",
                        lastName: "Sobrenome",
                        company: "Empresa",
                        addressStore: "Endereço da Loja",
                        type: "Casa, apto. etc.",
                        city: "Cidade",
                        country: "País/região",
                        state: "Província/Estado",
                        zipCode: "CEP",
                        phone: "Telefone",
                        addAddress: "ADICIONAR ENDEREÇO",
                        updateAddress: "ATUALIZAR ENDEREÇO",
                        cancel: "Cancelar",
                        checkboxText: "Definir como endereço padrão",
                    },
                    error: {
                        address: "Endereço é obrigatório",
                        firstName: "Nome é obrigatório",
                        lastName: "Sobrenome é obrigatório",
                        city: "Cidade é obrigatório",
                        country: "País/região é obrigatório",
                        province: "Província/Estado é obrigatório",
                        zip: "CEP é obrigatório",
                        phone: "Telefone é obrigatório",
                    },
                    component: {
                        alert:
                            "Tem certeza de que deseja excluir este endereço?",
                        default: "PADRÃO",
                        edit: "EDITAR",
                        delete: "EXCLUIR",
                    },
                },
                orderDetail: {
                    title: "Minha conta",
                    return: "Retornar às informações da conta",
                    orderTitle: "Pedido",
                    createdAt: "Efetuado em",
                    closedAt: "Pedido cancelado em",
                    cancelReason: {
                        customer: "cliente",
                        store: "lojista",
                        text: "Motivo: O {{reason}} alterou/cancelou o pedido",
                    },
                    shippingAddress: {
                        title: "Endereço de faturamento",
                        status: "Status do pagamento: ",
                    },
                    deliveryAddress: {
                        title: "Endereço de entrega",
                        status: "Status de processamento do pedido: ",
                    },
                },
            },
            cart: {
                title: "Seu carrinho",
                goToStore: "Voltar à loja",
                emptyCart: "Seu carrinho está vazio no momento.",
                headers: {
                    products: "PRODUTOS",
                    price: "PREÇO",
                    quantity: "QUANTIDADE",
                    total: "TOTAL",
                },
                quantityLabel: "Qtde",
                productVariant: "Modelos",
                removeProduct: "Remover",
                removedProduct: "removido(s) do seu carrinho",
                addComment: "Adicione uma observação ao seu pedido",
                subtotal: "Subtotal",
                feesAndTaxes: "Tributos e frete calculados no checkout",
                goToCheckout: "FINALIZAR COMPRA",
                updateCart: "ATUALIZAR CARRINHO",
                priceModal: {
                    title: "Pedido Mínimo de R$ 150,00.",
                    content:
                        "Para continuar, selecione outros produtos ou peça em maior quantidade.",
                    continue: "OK",
                },
                cartModal: {
                    title: "ACABA DE SER ADICIONADO AO SEU CARRINHO",
                    buySimilar:
                        "Comprar um similar, caso não achem o produto da foto:",
                    goToStore: "Voltar à loja",
                    goToCart: "VER CARRINHO",
                    quantityLabel: "Qtde",
                },
            },
            checkout: {
                logo: "dolado",
                cartBreadcrumb: "Carrinho",
                cartSubtotal: "Subtotal",
                cartTotal: "Total",
                cartTaxes: "Tributos",
                shipping: "Frete",
                discount: "Desconto",
                free: "Grátis",
                contactLabel: "Contato",
                shippingAddressLabel: "Enviar para",
                shippingMethodLabel: "Método",
                change: "Alterar",
                resumeToggle: {
                    toggled: "Ocultar resumo da compra",
                    untoggled: "Exibir resumo da compra",
                },
                steps: {
                    contact_information: {
                        breadcrumb: "Informações",
                        goBackLabel: "Voltar ao carrinho",
                        goNextLabel: "Continuar com o frete",
                        contactLabel: "Informações de contato",
                        logout: "Sair",
                        shippingAddressLabel: "Endereço de entrega",
                    },
                    shipping_method: {
                        breadcrumb: "Frete",
                        goBackLabel: "Voltar para as informações",
                        goNextLabel: "Continuar com o pagamento",
                        label: "Forma de frete",
                        phoneInfo:
                            "Esse número pode ser usado para informar você sobre a entrega por chamada ou mensagem de texto.",
                        instructionsInfo:
                            "Insira as informações necessárias, como códigos da porta ou instruções para entrega de pacotes.",
                        noSupportError: "Alguns itens do carrinho não são remetidos para seu local. Entre em contato com a loja para saber mais.",
                        noSupportMessage: "Nós não oferecemos frete para a sua região."
                    },
                    payment_method: {
                        breadcrumb: "Pagamento",
                        goBackLabel: "Voltar para o frete",
                        goNextLabel: "Finalizar a compra",
                        aditionalInfoLabel: "Informações adicionais",
                        paymentLabel: "Pagamento",
                        paymentInfo:
                            "Todas as transações são seguras e criptografadas.",
                        paymentMethods: {
                            creditCard: "Cartão de crédito",
                            paperSlip15Days: "Boleto para 15 dias",
                            paperSlip7Days: "Boleto para 7 dias",
                            errorSlip15Days:
                                "Você tem um boleto em aberto conosco. A opção será liberada assim que o pagamento for confirmado!",
                        },
                        paymentAddressLabel: "Endereço de faturamento",
                        paymentAddressInfo:
                            "Selecione o endereço que corresponde ao seu cartão ou forma de pagamento.",
                        paymentAddressMethods: {
                            useSame: "Usar o endereço de entrega",
                            useDifferent:
                                "Usar um endereço de faturamento diferente",
                        },
                        processingLabel: "Seu pedido está sendo processado",
                    },
                    success: {
                        breadcrumb: "",
                        goNextLabel: "Voltar à loja",
                        order: "Compra: ",
                        thanks: "Obrigado, ",
                        shippingAddress: "Endereço de entrega",
                        billingAddress: "Endereço de faturamento",
                        orderConfirmed: "Pedido Confirmado",
                        emailSent:
                            "Você receberá um e-mail de confirmação com o seu número de pedido em breve.",
                        orderInfo: {
                            title: "Informações de entrega: ",
                            details:
                                "Seu pedido foi realizado com sucesso e em breve estará aí dolado :)",
                        },
                        customerInfo: "Informações do cliente",
                        contactInfo: "Informações de contato",
                        shippingMethod: "Forma de frete",
                        paymentMethod: "Forma de pagamento",
                    },
                },
                fields: {
                    discountCode: "Código de desconto",
                    id: {
                        label: "Endereços salvos",
                        useNewAddress: {
                            label: "Usar um novo endereço",
                            value: "useNew",
                        },
                    },
                    firstName: "Nome",
                    lastName: "Sobrenome",
                    company: "Empresa",
                    address1: "Endereço da Loja",
                    address2: "Apartamento, bloco etc. (opcional)",
                    addressNumber: "Número",
                    city: "Cidade",
                    country: "País/região",
                    province: "Estado",
                    zip: "CEP",
                    phone: "Telefone",
                    shippingMethodPhone: "Telefone Celular",
                    shippingMethodInstructions:
                        "Instruções de entrega (opcional)",
                    document: "CPF/CNPJ",
                    cardNumber: "Número do cartão",
                    cardName: "Nome no cartão",
                    cardExpireDate: "Data de vencimento (MM/AAAA)",
                    cardSecurityCode: "Código de segurança",
                },
                errors: {
                    discountCode: "Insira um código de desconto válido",
                    firstName: "Insira o nome",
                    lastName: "Insira o sobrenome",
                    company: "Insira o nome da empresa",
                    address1: "Insira o endereço",
                    addressNumber: "Insira um número válido",
                    city: "Insira uma cidade",
                    phone: "Insira um número de telefone válido",
                    shippingMethodPhone: "Insira um número de telefone válido",
                    document: "Insira um CPF/CNPJ válido",
                    cardNumber: "Insira um número de cartão válido",
                    cardName:
                        "Insira seu nome exatamente como aparece no seu cartão",
                    cardExpireDate:
                        "Insira uma data de validade do cartão válida",
                    cardSecurityCode:
                        "Insira o CVV ou código de segurança de seu cartão",
                },
                applyDiscount: "Aplicar",
            },
            collections: {
                title: "Categorias",
            },
            collection: {
                filters: {
                    collection: {
                        all: {
                            queryCollection: null,
                            value: "all",
                            label: "Todos os Produtos",
                        },
                        acessories: {
                            queryCollection: "product_type:Acessórios",
                            value: "acessorios",
                            label: "Acessórios",
                        },
                        adapters: {
                            queryCollection: "product_type:Adaptadores",
                            value: "adaptadores",
                            label: "Adaptadores",
                        },
                        cables: {
                            queryCollection: "product_type:Cabos",
                            value: "cabos",
                            label: "Cabos",
                        },
                        speakers: {
                            queryCollection: "product_type:Caixa de Som",
                            value: "caixa-de-som",
                            label: "Caixa de Som",
                        },
                        capes: {
                            queryCollection: "product_type:Capas",
                            value: "capas",
                            label: "Capas",
                        },
                        chargers: {
                            queryCollection: "product_type:Carregadores",
                            value: "carregadores",
                            label: "Carregadores",
                        },
                        headsets: {
                            queryCollection: "product_type:Fones de Ouvido",
                            value: "fones-de-ouvido",
                            label: "Fones de Ouvido",
                        },
                        screenProtector: {
                            queryCollection: "product_type:Películas",
                            value: "peliculas",
                            label: "Películas",
                        },
                        supports: {
                            queryCollection: "product_type:Suportes",
                            value: "suportes",
                            label: "Suportes",
                        },
                    },
                    orderBy: {
                        relevance: {
                            key: "RELEVANCE",
                            value: "manual",
                            label: "Em destaque",
                        },
                        titleAsc: {
                            key: "TITLE",
                            value: "title-ascending",
                            label: "Ordem alfabética, A–Z",
                        },
                        titleDesc: {
                            key: "TITLE",
                            value: "title-descending",
                            label: "Ordem alfabética, Z–A",
                        },
                        createdAtAsc: {
                            key: "CREATED_AT",
                            value: "created-ascending",
                            label: "Data, mais antiga primeiro",
                        },
                        createdAtDesc: {
                            key: "CREATED_AT",
                            value: "created-descending",
                            label: "Data, mais recente primeiro",
                        },
                    },
                },
            },
            home: {
                heroCollections: {
                    title:
                        "Pare de perder tempo e dinheiro com reposição de estoque",
                    subtitle:
                        "Compre em grupo, garanta o melhor preço e receba produtos sem sair da sua loja",
                    buttonText: "QUERO COMPRAR EM GRUPO",
                },
                heroGroup: {
                    title: "Comprando em grupo, sai mais barato. Quer ver?",
                    buttonText: "QUERO COMPRAR EM GRUPO",
                },
                heroDolado: {
                    title: "Pare de ir na 25 de Março para repor seu estoque!",
                    subtitle:
                        "Com a dolado, você compra em grupo, consegue o melhor preço em produtos para revenda, e recebe na sua porta!",
                },
                heroWithPicture: {
                    signIn: {
                        title: "Cadastre-se",
                        subTitle:
                            "Comprando junto, você garante o melhor preço do mercado sem precisar sair da sua loja",
                    },
                    shop: {
                        title: "Vamos às Compras",
                        subTitle:
                            "Elas serão feitas semanalmente para maior comodidade e agilidade",
                    },
                    delivery: {
                        title: "Melhor Preço e Entrega",
                        subTitle:
                            "Entregamos suas compras no seu endereço com o melhor preço garantido.",
                    },
                },
                heroWithoutPicture: {
                    price: {
                        title: "Nossos preços são melhores e temos o porquê",
                        subTitle:
                            "Garantimos os melhores preços de mercadorias, pois compramos em grande quantidade e, por isso, temos maior poder de negociação e pulamos intermediários.",
                    },
                    time: {
                        title: "Tão bom quanto dinheiro, economize tempo",
                        subTitle:
                            "Você não precisa mais sair da sua loja e negociar com o fornecedor para repor seu estoque. Nós fazemos a gestão da compra e entregamos direto para você, na sua loja!",
                    },
                    news: {
                        title: "Todas as novidades em um só lugar",
                        subTitle:
                            "O mercado sempre tem algo de novo e agora você pode ser um dos primeiros a participar disso com muito mais facilidade!",
                    },
                },
            },
            login: {
                title: "Entrar",
                email: "E-mail",
                password: "Senha",
                forgotPassword: "Esqueceu sua senha?",
                doLogin: "FAZER LOGIN",
                createAccount: "Criar conta",
                errors: {
                    email: "E-mail não pode estar em branco.",
                    email_2: "Digite um e-mail válido.",
                    password: "Senha não pode estar em branco.",
                    password_2: "Senha é curto demais (mínimo de 5 caracteres)",
                    userNotFound: "E-mail ou senha incorretos.",
                },
                recoverPassword: {
                    key: "Confirmation",
                    value:
                        "Nós lhe enviamos um e-mail com um link para atualizar sua senha.",
                },
            },
            forgotPassword: {
                title: "REDEFINIR SUA SENHA",
                subtitle:
                    "Nós lhe enviaremos um e-mail para redefinir sua senha.",
                email: "E-mail",
                send: "ENVIAR",
                cancel: "Cancelar",
            },
            signUp: {
                title: "Criar conta",
                name: "Nome",
                lastName: "Sobrenome",
                email: "E-mail",
                password: "Senha",
                button: "CRIAR",
                errors: {
                    email: "E-mail não pode estar em branco.",
                    password: "Senha não pode estar em branco.",
                    password_2: "Senha é curto demais (mínimo de 5 caracteres)",
                },
            },
            productDetail: {
                promotion: "EM PROMOÇÃO",
                quantity: "Quantidade",
                models: "Modelos",
                checkboxText:
                    "Comprar um similar, caso não achem o produto da foto",
                addCart: "ADICIONAR AO CARRINHO",
                share: "COMPARTILHAR",
                twitter: "TUITAR",
                pinterest: "PINTEREST",
                anotherProducts: "Talvez você também goste de",
                buySimilar: {
                    label:
                        "Comprar um similar, caso não achem o produto da foto",
                    yes: "Sim",
                    no: "Não",
                },
            },
            whatsAppWidget: {
                messageBot:
                    "Olá, se você quiser conversar com a gente, só precisa preencher os campos abaixo ;)",
                required: "Campo é obrigatório",
                buttonSend: "Iniciar conversa",
                messageWhats:
                    "Olá! Vi o site de compras da Dolado e me interessei pelos seus produtos. Quais regiões de São Paulo vocês atendem?",
                name: "Nome *",
                email: "Email *",
                phone: "+55",
                doladoNumber: "5511989088033",
            },
        },
    },
};
