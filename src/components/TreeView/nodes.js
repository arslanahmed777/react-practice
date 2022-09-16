const uniqueId = (length = 16) => {
    return parseInt(
        Math.ceil(Math.random() * Date.now())
            .toPrecision(length)
            .toString()
            .replace('.', '')
    );
};

const nodes = [
    {
        value: 'Animals',
        text: 'animals',
        status: false,
        id: uniqueId(8),
        nodes: [
            {
                value: 'vertibrates',
                text: 'vertibrates',
                status: false,
                id: uniqueId(8),
                nodes: [
                    {
                        value: 'warmblooded',
                        text: 'warmblooded',
                        status: false,
                        id: uniqueId(8),
                        nodes: [
                            {
                                value: 'mammals',
                                text: 'mammals',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'bear',
                                        text: 'bear',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'tiger',
                                        text: 'tiger',
                                        status: false,
                                        nodes: [],
                                        id: uniqueId(8),
                                    },
                                ],
                            },
                            {
                                value: 'birds',
                                text: 'birds',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'sparrow',
                                        text: 'sparrow',
                                        status: false,
                                        nodes: [],
                                        id: uniqueId(8),
                                    },
                                    {
                                        value: 'parrot',
                                        text: 'parrot',
                                        status: false,
                                        nodes: [],
                                        id: uniqueId(8),
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: 'coldblooded',
                        text: 'coldblooded',
                        status: false,
                        id: uniqueId(8),
                        nodes: [
                            {
                                value: 'fish',
                                text: 'fish',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'salmon',
                                        text: 'salmon',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'guppy',
                                        text: 'guppy',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                ],
                            },
                            {
                                value: 'reptiles',
                                text: 'reptiles',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'turtle',
                                        text: 'turtle',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'lizard',
                                        text: 'lizard',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                ],
                            },
                            {
                                value: 'amphibions',
                                text: 'amphibions',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'frog',
                                        text: 'frog',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'toad',
                                        text: 'toad',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                value: 'invertibrates',
                text: 'invertibrates',
                status: false,
                id: uniqueId(8),
                nodes: [
                    {
                        value: 'withlegs',
                        text: 'withlegs',
                        status: false,
                        id: uniqueId(8),
                        nodes: [
                            {
                                value: 'withthreepair',
                                text: 'withthreepair',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'ant',
                                        text: 'ant',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'ladybird',
                                        text: 'ladybird',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                ],
                            },
                            {
                                value: 'morethreepair',
                                text: 'morethreepair',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'spider',
                                        text: 'spider',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'scorpion',
                                        text: 'scorpion',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: 'withoutlegs',
                        text: 'withoutlegs',
                        status: false,
                        id: uniqueId(8),
                        nodes: [
                            {
                                value: 'wormlike',
                                text: 'wormlike',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'earthworm',
                                        text: 'earthworm',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'leech',
                                        text: 'leech',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                ],
                            },
                            {
                                value: 'notwormlike',
                                text: 'notwormlike',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'fluke',
                                        text: 'fluke',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                    {
                                        value: 'tapeworm',
                                        text: 'tapeworm',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        value: 'plants',
        text: 'plants',
        status: false,
        id: uniqueId(8),
        nodes: [
            {
                value: 'seedmakers',
                text: 'Seed Makers',
                status: false,
                id: uniqueId(8),
                nodes: [
                    {
                        value: 'flowering',
                        text: 'Flowering',
                        status: false,
                        id: uniqueId(8),
                        nodes: [
                            {
                                value: 'sunflowers',
                                text: 'Sunflowers',
                                status: false,
                                id: uniqueId(8),
                                nodes: [],
                            },
                        ],
                    },
                    {
                        value: 'nonflowering',
                        text: 'Non Flowering',
                        status: false,
                        id: uniqueId(8),
                        nodes: [
                            {
                                value: 'conifers',
                                text: 'Conifers',
                                status: false,
                                id: uniqueId(8),
                                nodes: [],
                            },
                        ],
                    },
                ],
            },
            {
                value: 'nonseedmakers',
                text: 'Non Seed Makers',
                status: false,
                id: uniqueId(8),
                nodes: [],
            },
        ],
    },
    {
        value: 'comapny hierarchy',
        text: 'Comapny hierarchy',
        status: false,
        id: uniqueId(8),
        nodes: [
            {
                value: 'Chief Executive Officer (CEO)',
                text: 'Chief Executive Officer (CEO)',
                status: false,
                id: uniqueId(8),
                nodes: [
                    {
                        value: 'Chief Operating Officer (COO)',
                        text: 'Chief Operating Officer (COO)',
                        status: false,
                        id: uniqueId(8),
                        nodes: [
                            {
                                value: 'President',
                                text: 'President',
                                status: false,
                                id: uniqueId(8),
                                nodes: [
                                    {
                                        value: 'Executive Vice President',
                                        text: 'Executive Vice President',
                                        status: false,
                                        id: uniqueId(8),
                                        nodes: [
                                            {
                                                value: 'Senior Vice President',
                                                text: 'Senior Vice President',
                                                status: false,
                                                id: uniqueId(8),
                                                nodes: [
                                                    {
                                                        value: 'Vice President',
                                                        text: 'Vice President',
                                                        status: false,
                                                        id: uniqueId(8),
                                                        nodes: [
                                                            {
                                                                value: 'Assistant Vice President',
                                                                text: 'Assistant Vice President',
                                                                status: false,
                                                                id: uniqueId(8),
                                                                nodes: [
                                                                    {
                                                                        value: 'Associate Vice President',
                                                                        text: 'Associate Vice President',
                                                                        status: false,
                                                                        id: uniqueId(8),
                                                                        nodes: [
                                                                            {
                                                                                value: 'Senior Director',
                                                                                text: 'Senior Director',
                                                                                status: false,
                                                                                id: uniqueId(8),
                                                                                nodes: [
                                                                                    {
                                                                                        value: 'Assistant Director',
                                                                                        text: 'Assistant Director',
                                                                                        status: false,
                                                                                        id: uniqueId(8),
                                                                                        nodes: [
                                                                                            {
                                                                                                value: 'Manager',
                                                                                                text: 'Manager',
                                                                                                status: false,
                                                                                                id: uniqueId(8),
                                                                                                nodes: [
                                                                                                    {
                                                                                                        value: 'Middle Manager',
                                                                                                        text: 'Middle Manager',
                                                                                                        status: false,
                                                                                                        id: uniqueId(8),
                                                                                                        nodes: [
                                                                                                            {
                                                                                                                value:
                                                                                                                    'Permanent employees',
                                                                                                                text: 'Permanent employees',
                                                                                                                status: false,
                                                                                                                id: uniqueId(8),
                                                                                                                nodes: [],
                                                                                                            },
                                                                                                            {
                                                                                                                value:
                                                                                                                    'Contract employees',
                                                                                                                text: 'Contract employees',
                                                                                                                status: false,
                                                                                                                id: uniqueId(8),
                                                                                                                nodes: [],
                                                                                                            },
                                                                                                            {
                                                                                                                value:
                                                                                                                    'Part-time employees',
                                                                                                                text: 'Part-time employees',
                                                                                                                status: false,
                                                                                                                id: uniqueId(8),
                                                                                                                nodes: [],
                                                                                                            },
                                                                                                            {
                                                                                                                value: 'Freelancers',
                                                                                                                text: 'Freelancers',
                                                                                                                status: false,
                                                                                                                id: uniqueId(8),
                                                                                                                nodes: [],
                                                                                                            },
                                                                                                            {
                                                                                                                value:
                                                                                                                    'Contingent  employees',
                                                                                                                text: 'Contingent  employees',
                                                                                                                status: false,
                                                                                                                id: uniqueId(8),
                                                                                                                nodes: [],
                                                                                                            },
                                                                                                        ],
                                                                                                    },
                                                                                                ],
                                                                                            },
                                                                                        ],
                                                                                    },
                                                                                ],
                                                                            },
                                                                        ],
                                                                    },
                                                                ],
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        value: 'functions',
        text: 'functions',
        status: false,
        id: uniqueId(8),
        nodes: [],
    },
];

export default nodes;
