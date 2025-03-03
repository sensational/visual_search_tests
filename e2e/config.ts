const config = {
    constants: {
        numAnalyticsTerms: 20,
        combOutputFolder: 'combined_screenshots',
    },
    portals: {
        gastroport: {
            BASE: {
                url: 'https://gastroport.ch/',
                login: true,
                searchparams: "target=catalog&prodfilters[vendorname][6020]=6020&prodfilters[vendorname][4700]=4700&prodfilters[vendorname][5580]=5580&prodfilters[vendorname][3855]=3855&prodfilters[vendorname][5720]=5720&prodfilters[vendorname][1700]=1700&prodfilters[vendorname][3600]=3600",
                custom_terms: {
                    de: ["m&m", "tomaten-mozzarella", "tomaten mozzarella", "mayo", "rot", "demi glace", "AAA/HR03", "ei", "sel", "öl", "bier"],
                    fr: ["m&m", "AAA/HR03", "sous-vide", "vin", "sel", "lait", "bière"],
                },
            },
            NEW: {
                url: 'https://gastroport.test.popscan.ch/',
                login: true,
                searchparams: "target=catalog&prodfilters[vendorname][6020]=6020&prodfilters[vendorname][4700]=4700&prodfilters[vendorname][5580]=5580&prodfilters[vendorname][3855]=3855&prodfilters[vendorname][5720]=5720&prodfilters[vendorname][1700]=1700&prodfilters[vendorname][3600]=3600",
                custom_terms: {
                    de: ["m&m", "tomaten-mozzarella", "tomaten mozzarella", "mayo", "rot", "demi glace", "AAA/HR03", "ei", "sel", "öl", "bier"],
                    fr: ["m&m", "AAA/HR03", "sous-vide", "vin", "sel", "lait", "bière"],
                },
            },
        },
        transgourmet: {
            BASE: {
                url: 'https://shop.transgourmet.at/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: ["m&m", "schnittlauch", "Erdnüsse", "Petersilie", "Hefe", "h milch", "burrata", "krapfen", "berliner", "bun"],
                },
            },
            NEW: {
                url: 'https://transgourmet.test.popscan.ch/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: ["m&m", "schnittlauch", "Erdnüsse", "Petersilie", "Hefe", "h milch", "burrata", "krapfen", "berliner", "bun"],
                },
            },
        },
        mundo: {
            BASE: {
                url: 'https://mundoag.ch/',
                login: true,
                searchparams: "target=catalog",
                custom_terms: {
                    de: [],
                },
            },
            NEW: {
                url: 'https://mundo.test.popscan.ch/',
                login: true,
                searchparams: "target=catalog",
                custom_terms: {
                    de: [],
                },
            },
        },
        bianchi: {
            BASE: {
                url: 'https://shop.bianchi.ch/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: [],
                    fr: [],
                    it: [],
                },
            },
            NEW: {
                url: 'https://bianchi.test.popscan.ch/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: [],
                    fr: [],
                    it: [],
                },
            },
        },
        wedl: {
            BASE: {
                url: 'https://wedl.test.popscan.ch/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: [],
                },
            },
            NEW: {
                url: 'https://wedl.test.popscan.ch/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: [],
                },
            },
        },
        hr_gastro: {
            BASE: {
                url: 'https://shop.hr-gastro.ch/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: ["m&m", "schnittlauch", "Erdnüsse", "Petersilie", "Hefe"],
                },
            },
            NEW: {
                url: 'https://hrgastro.test.popscan.ch/',
                login: false,
                searchparams: "target=catalog",
                custom_terms: {
                    de: ["m&m", "schnittlauch", "Erdnüsse", "Petersilie", "Hefe"],
                },
            },
        },
    },

};

module.exports = config; // CommonJS
