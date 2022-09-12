
const uniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}
const nodes = [
    {
        text: 'Setup',
        value: 'setup',
        status: false,
        id: uniqueId(),
        nodes: [
            {
                text: 'View',
                value: 'view',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Add/Edit',
                value: 'edit',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Delete',
                value: 'delete',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Practice',
                value: 'practice',
                status: false,
                id: uniqueId(),
                nodes: [
                    {
                        text: 'View',
                        value: 'view',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Add/Edit',
                        value: 'edit',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Delete',
                        value: 'delete',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                ]
            },
            {
                text: 'Location',
                value: 'location',
                status: false,
                id: uniqueId(),
                nodes: [
                    {
                        text: 'View',
                        value: 'view',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Add/Edit',
                        value: 'edit',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                    {
                        text: 'Delete',
                        value: 'delete',
                        status: false,
                        nodes: [],
                        id: uniqueId(),
                    },
                ]
            },
        ]
    },
    {

        text: 'Fax',
        value: 'fax',
        status: false,
        id: uniqueId(),
        nodes: [
            {
                text: 'View',
                value: 'view',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Add/Edit',
                value: 'edit',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
            {
                text: 'Delete',
                value: 'delete',
                status: false,
                nodes: [],
                id: uniqueId(),
            },
        ],
    }

];

export default nodes;
